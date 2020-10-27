var id = require("./dist/index.js")
var fs = require("fs")
var wal = id.Wallet.Instance;
var ks = new id.FileKeystore("file", "./keystore");
wal.setKeystore(ks)
wal.generateDID("RSA").then(result => {})
var ccp = JSON.parse(fs.readFileSync("./ccp-dev-dsn.json", 'utf8'));

var config = {
    stateStore: '/tmp/cloud',
    caName: 'telefonicaca',
    mspId: 'telefonicaMSP',
    caURL: "hola",
    walletID: 'adminUser',
    asLocalhost: false,
    ccp: ccp,
    chaincodeName: "identitycc",
    fcn: "proxy",
    channel: "channel1"
}



var trustID = new id.TrustIdHf(config);

wal.addNetwork("hf", trustID);
wal.networks["hf"].configureDriver().then(() => {

    // Use the wallet and the driver
    wal.generateDID("RSA", "test", "test").then(did => {
        let access = { policy: id.PolicyType.PublicPolicy };
        did.unlockAccount("test").then(() => {
            wal.networks.hf.createSelfIdentity(did).then(res => {
                //   wal.networks.hf.createService(did, "did:vtn:corentrack2", config.chaincodeName, access, config.channel).then(() => {
                wal.networks.hf.subscribeEventService(did, "coren-trackscc", "track-event").then(listener => {
                    console.log("Listening to events...")
                    listener.on("track-event",
                        (returnedEvent) => {
                            console.log(returnedEvent)
                        })
                })

            });
            //})

        })
    })
})