import { exit } from "process";

// Load SDK library.
const sdk = require("../dist/index.js");
const fs = require("fs");

// Create new wallet. It follows a singleton approach.
const wal = sdk.Wallet.Instance;
console.log(wal)

// Initialize new FileKeystore with storage at ./keystore
const ks = new sdk.FileKeystore("file", "./keystore");
wal.setKeystore(ks)

const ccp = JSON.parse(fs.readFileSync("../connection-profile.json", 'utf8'));
const config = {
    stateStore: '/tmp/statestore',
    caURL: 'https://ca.org1.telefonica.com:7054',
    caName: 'telefonicaca',
    caAdmin: 'adminCA',
    caPassword: 'adminpw',
    tlsOptions: {
        trustedRoots: "-----BEGIN CERTIFICATE-----MIICODCCAd2gAwIBAgIQe96XlcvMediXzNPJmbi3KzAKBggqhkjOPQQDAjBmMQswCQYDVQQGEwJFUzEPMA0GA1UECBMGTWFkcmlkMQ8wDQYDVQQHEwZNYWRyaWQxGzAZBgNVBAoTEnRlbGVmb25pY2EudGVmLmNvbTEYMBYGA1UEAxMPdGxzdGVsZWZvbmljYWNhMB4XDTIwMDUyNzEwNTIwMFoXDTMwMDUyNTEwNTIwMFowZjELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRswGQYDVQQKExJ0ZWxlZm9uaWNhLnRlZi5jb20xGDAWBgNVBAMTD3Rsc3RlbGVmb25pY2FjYTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABDvxxdoWt6oJh6D1QBJ/ANKi9Dd0bMIJLb70X5hdAyeyX2tTLfFRVT+/Sn+agSW0pOl+Li4J2gLtrW/jOSC7sWejbTBrMA4GA1UdDwEB/wQEAwIBpjAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwEwDwYDVR0TAQH/BAUwAwEB/zApBgNVHQ4EIgQgpzV1sl/p4Tkgcz6P6WBonEFQpAMTCFmKV/o30VpBdGIwCgYIKoZIzj0EAwIDSQAwRgIhAIY2hPL2ETYhWJUuYGtqipfQiKfyi8L75yG4b7TeG2soAiEAx5u6JmQBjUbeYhB8pL2b2NICGokKZ/Z0ybXBb3b86rA=-----END CERTIFICATE-----",
        verify: false
    },
    mspId: 'telefonicaMSP',
    walletID: 'admin',
    asLocalhost: false,
    ccp: ccp,
    chaincodeName: "identitycc",
    fcn: "proxy",
    channel: "channel1"
}

async function configureNetwork() {
    console.log("[*] Configuring network driver...")
    // Create HF driver
    var trustID = new sdk.TrustIdHf(config);
    // Add and configure the network driver in our wallet.
    wal.addNetwork("hf", trustID);
    await wal.networks["hf"].configureDriver()
}

// Create you own DID key pair and register it in the TrustID platform.
async function createDID(){
    // Generate key pair locally.
    const did = await wal.generateDID("RSA", "test", "test")
    console.log("[*] Generated DID: \n", did)
    await did.unlockAccount("test")
    // Register in the platform.
    await wal.networks.hf.createSelfIdentity(did)
    console.log("[*] Self identity registered")
    wal.setDefault(did)
    // Get the registered identity.
    let res = await wal.networks.hf.getIdentity(did, did.id)
    console.log("[*] Get registered identity\n", res)
}

// Interact with a service in the platform (you need to create a service before
// being able to call it).
async function serviceInteraction(){
    const did = await wal.getDID("default")
    // Get service
    let res = await wal.networks.hf.getService(did, "coren-trackscc")
    console.log("[*] Service info:\n", res)
    // Create an asset in the service
    const asset = {assetId: "test"+Date.now(), data:{"a":1, "b":2}, metadata: {"c": 4}}
    const assetStr = JSON.stringify(asset)
    res = await wal.networks.hf.invoke(did, "coren-trackscc",["createAsset", assetStr], "channel1")
    console.log("[*] Asset creation:\n", res)
    // Get the created asset.
    res = await wal.networks.hf.invoke(did, "coren-trackscc",["getAsset", JSON.stringify({assetId: asset.assetId})], "channel1")
    console.log("[*] Asset registered\n", res)
}

// Use the wallet to make offchain interactions with your DID
async function walletInteraction(){
    const did = await wal.getDID("default")
    const payload = {hello: "AWESOME PROJECT!!!"}
    console.log("[*] Signing payload: \n", payload)
    const sign = await did.sign(payload)
    console.log("[*] DID signature\n", sign)
    let verify = await did.verify(sign, did)
    console.log("[*] Signature verification\n", verify)
    // const did2 = await wal.generateDID("RSA", "test", "test")
    // verify = await did.verify(sign, did2)
    // console.log("[*] Signature wrong verification\n", verify)
}

// Main async function.
async function main() {
    await configureNetwork()
    await createDID()
    await serviceInteraction()
    // await walletInteraction()
    exit(1);
}

main().then(() =>{} ).catch(console.log)
// tsc getting-started.ts && node getting-started.js
