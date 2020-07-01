# TRUSTID SDK


This SDK exposes all the functionalities required to interact with
TRUSTID-based DLT networks. 

### Install
* To install this library you need access to the private repo:
```
npm install core-id-sdk
```

### Example of use
```js
// Use library
var id = require('coren-id-sdk')
import { Keystore } from './keystore/keystore';


// Initialize wallet
wal = id.Wallet.Instance;

// Create Keystore
ks = new FileKeystore();
// Set keystore in wallet
wal.setKeystore(ks)
// LoadKeystore from file
 wal.loadKeystore('file', './keystore')
// Set endpoint of driver and store in variable to use it.
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
let config = {
    stateStore: '/tmp/statestore',
    caURL: 'https://ca.org1.telefonica.com:7054',
    caName: 'ca.org1.telefonica.com',
    caAdmin: 'adminCA',
    caPassword: 'adminpw',
    tlsOptions: {
        trustedRoots:"-----BEGIN CERTIFICATE-----MIICTjCCAfSgAwIBAgIRAPz6Z66RGDs2BDghYGuShw4wCgYIKoZIzj0EAwIwcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMB4XDTIwMDUxMjEzMDIwMFoXDTMwMDUxMDEzMDIwMFowcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEaJraPeAMD+qMba9gNfzwhhfSQNDStqhkvGdPKfxjl+5YoZ+AZkf5qXUPCbSVFh2rlIagZQzcxLnxRmwguEDJjaNtMGswDgYDVR0PAQH/BAQDAgGmMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDATAPBgNVHRMBAf8EBTADAQH/MCkGA1UdDgQiBCDxTrECkDkA2zbsZ7US807jJKKmZ6E90QYkjC7szbQrQDAKBggqhkjOPQQDAgNIADBFAiEAmFFB79r8Jqu4QEgNRQEWEWrY9g70pEUIL4cwq7Zj//UCIDoOuRhihvbFsLTSNbK31VzmL5lXvZGwzvS60n9xk33B-----END CERTIFICATE-----",
        verify: false
    },
    mspId: 'org1MSP',
    walletID: 'admin',
    asLocalhost: true,
    ccp: ccp,
    chaincodeName: "identitycc",
    fcn: "proxy",
    channel: "telefonicachannel"
}

const trustID = new TrustIdHf(config);
wal.addNetwork("hf", trustID);
await wal.networks["hf"].configureDriver();

// Use the wallet and the driver
wal.generateDID("RSA")
await wal.networks["hf"].createIdentity(wal.getDID("default"))
await trustID.getIdentity(wal.getDID("default"), wal.getDID("default").id);
await trustID.createService(wal.getDID("default"), `vtn:trustos:service:1`, "chaincode", true);

```

### Structure
The library has the following modules:

* `wallet.ts`: Core module of the library. It wraps all the state and
logic for identity management and interaction with TRUSTID networks.
To start using the SDK a new wallet needs to be initialized. A wallet
exposes the following methods:
    * `public setKeystore(keystore: Keystore): void`:
    * `public generateDID(type: string, controller: string = "default", passphrase: string = ""): DID`

    And stores the following information:

* `class DID`: Has the following structure. 
    * `public id: string`: Id string that identifies the DID.
    * `public pubkey: string`: PublicKey of the DID.
    * `public type: string`: Key type (RSA / EC / OKP).
    * `public controller: string`: Verifier of the identity
    * `public access: number`: Access level
    * `private privkey: string`: Private Key of the DID.

    And exposes the following functions:
    * `public unlockAccount(passphrase: string = ""): void`: Unlocks private key in order to use the DID.
    * `public lockAccount(): any`: Locks the private key for a DID.
    * `public sign(payload: object, passphrase: string = ""): string`: Sign a payload with a specific DID.
    * `public verify(signature: string, id: string = "default"): any`: Verifies a signature from a DID.

* `driver.ts`: Interface that enables the implementation of connection drivers with different TRUSTID networks. The only driver implemented currently is
the `hfdriver.ts` enabling the interaction with Hyperledger Fabric TrustID
networks.

    * `setEndpoint(endpoint: string): void`: Sets the network endpoint to interact with the TRUSTID network.
    * `createIdentity(did: DID): Promise<object>`: Create an identity in TrustID. It generates a new DID in the wallet and register it in the network.
    * `verifyIdentity(adminDID: DID, id:string): Promise<object>`: Verifies an identity as an admin.
    * `getIdentity(did: DID, id: string): * Promise<object>`: Gets a registered identity from TrustID.
    * `revokeIdentity(adminDID: DID, id: string): Promise<object>`: Revokes a registered identity. Only supported by the owner or controller of the DID.
    * `createService(did: DID, serviceDID: string, name: string, isPublic: boolean): Promise<object>`: Creates a new service in the TrustID network.
    * `updateService(did: DID, serviceDID: string, access: Access, isPublic: boolean): Promise<object>`: Updates the information from a service.
    * `getService(did: DID, serviceDID: string): Promise<object>`: Gets information from a registered service.
    * `invoke (did: DID, serviceDID: string, args: string[], channel: string): Promise<object>`: Invokes a function of a registered service in the TrustID network.
    * `query(did: DID, serviceDID: string, args: string[], channel: string): Promise<object>`: Queries a function of a registered service in the TrustID network

* `keystore.ts`: Interface that enables the implementation of keystore storages.
    There are currently two implementations of keystore supported: `FileKeystore.ts` (to store DIDs in file keystore)and `MongoKeystore.ts` (to store DIDs in MongoDB). 

    * `abstract getDID(id: string): DID`: Get specific DID from keystore.
    * `abstract storeDID(did: DID): boolean`: Store DID in keystore.
    * `public storeInMemory(did: DID): boolean`: Store DID inMemory for easy and performant use.
    * `public listDID(): string[]`: List DIDs in memory.
    * `public setDefault(did: DID): boolean`: Set DID as default identity for the keystore wallet.

