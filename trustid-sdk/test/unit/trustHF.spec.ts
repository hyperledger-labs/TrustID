/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {HfDriver} from "../../src/drivers/hfdriver";
import {TrustIdHf} from "../../src/core/trustidHF";
import {DID} from "../../src/core/did";
import {Wallet} from "../../src/wallet";
import { AccessPolicy, PolicyType} from "../../src/core/trustid";

/* global describe, it, before, after */
const {expect} = require("chai");
const sinon = require("sinon");

describe("TrustHF - Test", async() => {
	let config = {
		stateStore: "/tmp/statestore",
		caURL: "https://ca.org1.telefonica.com:7054",
		caName: "ca.org1.telefonica.com",
		caAdmin: "adminCA",
		caPassword: "adminpw",
		tlsOptions: {
			trustedRoots:
				"-----BEGIN CERTIFICATE-----MIICTjCCAfSgAwIBAgIRAPz6Z66RGDs2BDghYGuShw4wCgYIKoZIzj0EAwIwcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMB4XDTIwMDUxMjEzMDIwMFoXDTMwMDUxMDEzMDIwMFowcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEaJraPeAMD+qMba9gNfzwhhfSQNDStqhkvGdPKfxjl+5YoZ+AZkf5qXUPCbSVFh2rlIagZQzcxLnxRmwguEDJjaNtMGswDgYDVR0PAQH/BAQDAgGmMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDATAPBgNVHRMBAf8EBTADAQH/MCkGA1UdDgQiBCDxTrECkDkA2zbsZ7US807jJKKmZ6E90QYkjC7szbQrQDAKBggqhkjOPQQDAgNIADBFAiEAmFFB79r8Jqu4QEgNRQEWEWrY9g70pEUIL4cwq7Zj//UCIDoOuRhihvbFsLTSNbK31VzmL5lXvZGwzvS60n9xk33B-----END CERTIFICATE-----",
			verify: false,
		},
		mspId: "org1MSP",
		walletID: "admin",
		asLocalhost: true,
		ccp: "",
		chaincodeName: "identitycc",
		fcn: "proxy",
		channel: "telefonicachannel",
	};
    const wal = Wallet.Instance;
    let identity = await wal.generateDID("RSA", "default", "secret");

	await identity.unlockAccount("secret");
	before(() => {});
	describe("Configure Driver ", () => {
		let driverStub: any;

		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "connect").resolves();
			driverStub.onSecondCall().rejects(new Error("Error connecting"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});

		it("Configure Success", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.configureDriver();
				sinon.assert.calledOnce(driverStub);
			} catch (err) {
				console.log(err);
			}
		});
		it("Configure Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.configureDriver();
			} catch (err) {
				expect(err.message).to.equal("Error connecting");
				sinon.assert.calledTwice(driverStub);
			}
		});
	});
	describe("Disconnect Driver ", () => {
		let driverStub: any;

		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "disconnect").resolves();
			driverStub.onSecondCall().rejects(new Error("Error disconnect"));

			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});

		it("Configure Success", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.disconnectDriver();
				sinon.assert.calledOnce(driverStub);
			} catch (err) {
				console.log(err);
			}
		});
		it("Configure Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.disconnectDriver();
			} catch (err) {
				expect(err.message).to.equal("Error disconnect");
				sinon.assert.calledTwice(driverStub);
			}
		});
	});

	describe("Create self identity ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("OK");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});

		it("Create self Identity", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.createSelfIdentity(identity);
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Crete self Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.createSelfIdentity(identity);

			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Create identity ", async () => {
		const didController = await wal.generateDID('RSA', 'default', 'pass')

		let driverStubw: any;

		before((done) => {
			driverStubw = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("OK");
			driverStubw.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			//driverStubw.restore();
			done();
		});

		it("Create Identity", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.createIdentity(identity, didController);
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Create Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.createIdentity(identity, didController);
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Verify identity ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("OK");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});

		it("Verify IdentitY", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.verifyIdentity(identity, "id");
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Verify Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.verifyIdentity(identity, "id");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Revoke identity ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("OK");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});

		it("Revoke IdentitY Success", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.revokeIdentity(identity, "id");
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Revoke Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.revokeIdentity(identity, "id");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Get identity ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("This is identity");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});

		it("Get IdentitY Success", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.getIdentity(identity, "id");
				expect(result).to.equal("This is identity");
			} catch (err) {
				console.log(err);
			}
		});

		
		
		it("Get identity Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.getIdentity(identity, "id");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Import Signed Identity ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("result");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});
   
		it("Import Signed Success", async () => {
			try {
			  
				const trustID = new TrustIdHf(config);
				const result = await trustID.importSignedIdentity("did", "payload");
				expect(result).to.equal("result");
			} catch (err) {
				console.log(err);
			}
		});
		it("Import signed Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.importSignedIdentity("id", "payload");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});

	describe("Import  Identity ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("result");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});
   
		it("Import  Success", async () => {
			try {
			  
				const trustID = new TrustIdHf(config);
				const result = await trustID.importIdentity(identity);
				expect(result).to.equal("result");
			} catch (err) {
				console.log(err);
			}
		});
		it("Import Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.importIdentity(identity);
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Create Service ", () => {
		let driverStub: any;
		let access: AccessPolicy = {policy: PolicyType.PublicPolicy, threshold: 0, registry: {}};

		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("OK");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
		});

		it("Create Service Success", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.createService(identity, "id", "name", access, "channel");
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Create Service Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.createService(identity, "id", "name", access,  "channel");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
    });
    describe("Update Service ", () => {
		let driverStub2: any;
		before((done) => {
			driverStub2 = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("OK");
			driverStub2.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub2.restore();
			done();
        });
		
		let access: AccessPolicy = {policy: PolicyType.PublicPolicy, threshold: 0, registry: {}};


		it("Update Service Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.updateServiceAccess(identity, "id", access);
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Update Service Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
				await trustID.updateServiceAccess(identity, "id", access);
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
    });
    describe("Get Service ", () => {
		let driverStub: any;
		before((done) => {
			const service = {service: "service"}
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves(JSON.stringify(service));
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
        });
		let access: AccessPolicy = {policy: PolicyType.PublicPolicy, threshold: 0, registry: {}};


		it("Get Service Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.getService(identity, "id");
				expect(result.service).to.equal("service");
			} catch (err) {
				console.log(err);
			}
		});
		it("Get Service Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
				 await trustID.getService(identity, "id");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
    });
    describe("Invoke Service ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("result");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
        });
   
		it("Invoke Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.invoke(identity, "id", ["a"], "channel1");
				expect(result).to.equal("result");
			} catch (err) {
				console.log(err);
			}
		});
		it("Invoke Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
                await trustID.invoke(identity, "id", ["a"], "channel1");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
    });
    describe("Query Service ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "getContractTransaction").resolves("result");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
        });
   
		it("Query Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.query(identity, "id", ["a"], "channel1");
				expect(result).to.equal("result");
			} catch (err) {
				console.log(err);
			}
		});
		it("Query Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
                await trustID.query(identity, "id", ["a"], "channel1");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Invoke Signed Service ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("result");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
        });
   
		it("Invoke Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.invokeSigned("did", "payload");
				expect(result).to.equal("result");
			} catch (err) {
				console.log(err);
			}
		});
		it("Invoke Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
                await trustID.invokeSigned("id", "payload");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	
	describe("Query Signed Service ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "getContractTransaction").resolves("result");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
        });
   
		it("Query Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.querySigned("did", "payload");
				expect(result).to.equal("result");
			} catch (err) {
				console.log(err);
			}
		});
		it("Query Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
                await trustID.querySigned("id", "payload");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
    });
 });
