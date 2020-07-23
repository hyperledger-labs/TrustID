# TrustID
This repo include two components:
- [Trustid-sdk](trustid-sdk/): SDK  based in javascript to interact with the trustId solution.
- [Fabric-chaincode](fabric-chaincode/): Chaincode based in Hyperledger Fabric that implements trustId. The chaincode has to be deployed in a Hyperledger Fabric network


## Getting started

First of all it's necessary to create one or many controllers identities. These identities are going to be self signed certificates and must represent the trust anchor identities that are going serve as roots to validate others. It is possible to have more than one to be decentralized. 
To create these identites, you need to create an initial identity to have at least one controller:
```
var id = require('trustid-sdk')
var wal = id.Wallet.Instance;
wal.generateDID("RSA", "password").then(result => {
    console.log(result)
})
```

Now you have a DID with a public and private keys.

Before you start using TrustID, you need to run a Hyperledger Fabric network. You can use for example a testnet from the [Fabric Samples Repository](https://github.com/hyperledger/fabric-samples). It's a requeriment that the version of the network to be 2.X

Once we have a hyperledger fabric network we can deploy the TrustID chaincode. To install and approve the chaincode with the [new chaincode lifecycle](https://hyperledger-fabric.readthedocs.io/en/release-2.0/commands/peerlifecycle.html)

In the last step, for the initialization fo the chaincode, it's necessary to deploy it with the controller information in the following way: 
```
'{"Args":["Init", "{\"did\":\"did:vtn:trustid:29222201b6662e5b2a07815f7f98b8653b306e3af3830dbaf2387da49ec744db\",\"controller\":\"did:vtn:trustid:29222201b6662e5b2a07815f7f98b8653b306e3af3830dbaf2387da49ec744db\",\"publicKey\":\"-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzP4bEUzWUJQh+gm9apHT6H1myWMqje4I3+F0d4NSPV8Y3HG0mOYr034fx34je9F82+YpToOO5utbQFlDTmCcI3S2hO4oNwV4xuvt+DCMm2QsYOPCy8BjMHFHiOxTVzlDNaq9YVrGeiEY6+e5e5c61y+Yi5YeaRld0RLBWkIfaQIAQyx/FgYFpzDDhxB/TznO9hiw5O5/MFqVOKFEhjT3ndXPRuHUi1F5BfidzlKzfU8G9LO4M+VLzRwnsWGsrgdyQwK8SG9RhcYwPBKMqxwdyUwwccX3DEovshPMxEdPGaj1zuJuAuJlcd504FZDSqszcTjbdSGUgivVWMv8HvRIoQIDAQAB-----END PUBLIC KEY-----\"}"]}'
```

This data is a JSON with the fields: 
```js
{
    did: "did:vtn:trustid:29222201b6662e5b2a07815f7f98b8653b306e3af3830dbaf2387da49ec744db",
    controller: "did:vtn:trustid:29222201b6662e5b2a07815f7f98b8653b306e3af3830dbaf2387da49ec744db",
    publicKey: "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzP4bEUzWUJQh+gm9apHT6H1myWMqje4I3+F0d4NSPV8Y3HG0mOYr034fx34je9F82+YpToOO5utbQFlDTmCcI3S2hO4oNwV4xuvt+DCMm2QsYOPCy8BjMHFHiOxTVzlDNaq9YVrGeiEY6+e5e5c61y+Yi5YeaRld0RLBWkIfaQIAQyx/FgYFpzDDhxB/TznO9hiw5O5/MFqVOKFEhjT3ndXPRuHUi1F5BfidzlKzfU8G9LO4M+VLzRwnsWGsrgdyQwK8SG9RhcYwPBKMqxwdyUwwccX3DEovshPMxEdPGaj1zuJuAuJlcd504FZDSqszcTjbdSGUgivVWMv8HvRIoQIDAQAB-----END PUBLIC KEY-----"
}
```
 

Once the chaincode is deployed you can start using trustid-sdk against the TrustID-enabled Fabric network. More information about it use [here](./trustid-sdk/README.md)

We provide a [examples](./trustid-sdk/examples) to get you started with the SDK. 

## License <a name="license"></a>

Hyperledger Project source code files are made available under the Apache
License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.
The files are made available under the Creative
Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.
