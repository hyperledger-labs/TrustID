/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { HfDriver } from "../../src/drivers/hfdriver";


/* global describe, it, before, after */
const {expect} = require("chai");
const sinon = require("sinon");
const fs = require("fs")
const FabricCAServices = require("fabric-ca-client");
const {Wallets, Gateway} = require("fabric-network");

let config = {
    stateStore: "/tmp/statestore",
    caName: "ca.org1.telefonica.com",

    tlsOptions: {
        trustedRoots:
            "-----BEGIN CERTIFICATE-----MIICTjCCAfSgAwIBAgIRAPz6Z66RGDs2BDghYGuShw4wCgYIKoZIzj0EAwIwcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMB4XDTIwMDUxMjEzMDIwMFoXDTMwMDUxMDEzMDIwMFowcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEaJraPeAMD+qMba9gNfzwhhfSQNDStqhkvGdPKfxjl+5YoZ+AZkf5qXUPCbSVFh2rlIagZQzcxLnxRmwguEDJjaNtMGswDgYDVR0PAQH/BAQDAgGmMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDATAPBgNVHRMBAf8EBTADAQH/MCkGA1UdDgQiBCDxTrECkDkA2zbsZ7US807jJKKmZ6E90QYkjC7szbQrQDAKBggqhkjOPQQDAgNIADBFAiEAmFFB79r8Jqu4QEgNRQEWEWrY9g70pEUIL4cwq7Zj//UCIDoOuRhihvbFsLTSNbK31VzmL5lXvZGwzvS60n9xk33B-----END CERTIFICATE-----",
        verify: false,
    },
    mspId: "org1MSP",
    walletID: "admin",
    asLocalhost: true,
    ccp: {
        certificateAuthorities: {
            "ca.org1.telefonica.com": {
                url: "https://ca.org1.telefonica.com:7054",
                tlsCACerts: {
                    path: "/tmp",

                }, 
                registrar: {
                    enrollId: "admin",
                    enrollSecret: "pas"
                },  
                "caName": "telefonicaca",
            }
        }, 
    },
    chaincodeName: "identitycc",
    fcn: "proxy",
    channel: "telefonicachannel",
};
describe("HF Driver - Test", () => {
	before(() => {});
	describe("Connect ", () => {
		let gatewayStub: any;
        let walletStub: any;
        let readFileStub: any;
        let fabricCAServicesStub: any;
        
		const errolment = {
			certificate: "skdjsd00",
			key: {
				toBytes() {},
			},
		};
		before((done) => {
            let wallet = {
                 put(){

                }
            }
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            gatewayStub.onSecondCall().throws(new Error("Error connecting"));
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            walletStub.onSecondCall().throws(new Error("Error connecting"))
            readFileStub  = sinon.stub(fs, "readFileSync").returns({})
			fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
			done();
		});

		after((done) => {
            gatewayStub.restore();
            walletStub.restore();
            readFileStub.restore();
            fabricCAServicesStub.restore();
			done();
		});

        it("Connect Success", async() => {
            try{
                const hfdriver = new HfDriver()
                
    
                await hfdriver.connect(config)
                sinon.assert.calledOnce(gatewayStub)
                sinon.assert.calledOnce(walletStub)
                sinon.assert.calledOnce(readFileStub)
                sinon.assert.calledOnce(fabricCAServicesStub)



            } catch(err){
            }

        });
        it("Connect Fail", async() => {
            try{
                const hfdriver = new HfDriver()
           //     config.ccp.certificateAuthorities["ca.org1.telefonica.com"].url = "https://host:8282"
    
                await hfdriver.connect(config)
      

            } catch(err){
                expect(err.message).to.equal('Error connecting');
            }

        });
	
    });
    describe("Disconnect ", () => {
		let gatewayStub2: any;
    
        let readFileStub: any;
		
        let gatewayStub: any;
        let walletStub: any;

        let fabricCAServicesStub: any;
    
		const errolment = {
			certificate: "skdjsd00",
			key: {
				toBytes() {},
			},
		};
		before((done) => {
            let wallet = {
                 put(){

                }
            }
            readFileStub  = sinon.stub(fs, "readFileSync").returns("")

            gatewayStub2 = sinon.stub(Gateway.prototype, "disconnect").resolves();
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            walletStub.onSecondCall().throws(new Error("Error disconnecting"))
			fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
			done();
		});

		after((done) => {
            gatewayStub.restore();
            walletStub.restore();
            gatewayStub2.restore();
            readFileStub.restore();
            fabricCAServicesStub.restore();
			done();
		});


        it("Disconnect Success", async() => {
            try{
                const hfdriver = new HfDriver()
                await hfdriver.connect(config)
                await hfdriver.disconnect()
                

            } catch(err){
            }

        });
        it("Disconnect Fail", async() => {
            try{
                const hfdriver = new HfDriver()
                await hfdriver.connect(config)
                await hfdriver.disconnect()

            } catch(err){
                expect(err.message).to.equal('Error disconnecting');
            }

        });
	
    });
    describe("Call contract transaction ", () => {
	
        let gatewayStub: any;
        let walletStub: any;
        let gatewayStub2: any;
let readFileStub: any;
        let fabricCAServicesStub: any;
     
		const errolment = {
			certificate: "skdjsd00",
			key: {
				toBytes() {},
			},
		};
		before((done) => {
            let wallet = {
                 put(){

                }
            }
            let contract = {
                submitTransaction(){
                    return new Promise((resolve) => {
                        resolve("OK");
                    })
                }
            }
            let network= {
                getContract(){
                    return new Promise((resolve) => {
                        resolve(contract)
                    })
                }

            }
  
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            gatewayStub2 = sinon.stub(Gateway.prototype, "getNetwork").resolves(network);
            gatewayStub2.onSecondCall().rejects(new Error("Network not exists"))
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            walletStub.onSecondCall().rejects(new Error("Network not exists"))

            readFileStub  = sinon.stub(fs, "readFileSync").returns({})

			fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
			done();
		});

		after((done) => {
            gatewayStub.restore();
            walletStub.restore();
            gatewayStub2.restore();
            readFileStub.restore();
            fabricCAServicesStub.restore();
			done();
		});


        it("Call Contract Success", async() => {
            try{
                const hfdriver = new HfDriver()
                await hfdriver.connect(config)
                const res = await hfdriver.callContractTransaction("name", "invoke", ["a"]);
                expect(res).to.equal("OK")
            } catch(err){
            }

        });
        it("Disconnect Fail", async() => {
            try{
                const hfdriver = new HfDriver()
                await hfdriver.connect(config)
                await hfdriver.callContractTransaction("name", "invoke", ["a"]);

            } catch(err){
                expect(err.message).to.equal('Network not exists');
            }

        });
	
    });
    describe("Get contract transaction ", () => {
	
        let gatewayStub: any;
        let walletStub: any;
        let gatewayStub2: any;
        let readFileStub: any;

        let fabricCAServicesStub: any;
        
		const errolment = {
			certificate: "skdjsd00",
			key: {
				toBytes() {},
			},
		};
		before((done) => {
            let wallet = {
                 put(){

                }
            }
            let contract = {
                evaluateTransaction(){
                    return new Promise((resolve) => {
                        resolve("OK");
                    })
                }
            }
            let network= {
                getContract(){
                    return new Promise((resolve) => {
                        resolve(contract)
                    })
                }

            }
            readFileStub = sinon.stub(fs, "readFileSync").returns()
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            gatewayStub2 = sinon.stub(Gateway.prototype, "getNetwork").resolves(network);
            gatewayStub2.onSecondCall().rejects(new Error("Network not exists"))
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            walletStub.onSecondCall().rejects(new Error("Network not exists"))

			fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
			done();
		});

		after((done) => {
            gatewayStub.restore();
            walletStub.restore();
            readFileStub.restore();

            gatewayStub2.restore();
            fabricCAServicesStub.restore();
			done();
		});


        it("get Contract Success", async() => {
            try{
                const hfdriver = new HfDriver()
                await hfdriver.connect(config)
                const res = await hfdriver.callContractTransaction("name", "invoke", ["a"]);
                expect(res).to.equal("OK")
            } catch(err){
            }

        });
        it("Get contract Fail", async() => {
            try{
                const hfdriver = new HfDriver()
                await hfdriver.connect(config)
                await hfdriver.getContractTransaction("name", "invoke", ["a"]);

            } catch(err){
                expect(err.message).to.equal('Network not exists');
            }

        });
	
	});
});
