/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {HfDriver} from "../src/network/hfdriver";
import {TrustIdHf} from "../src/network/trustHF";
import {DID} from "../src/wallet";
import {Wallet} from "../src/wallet";

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

	describe("Create identity ", () => {
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

		it("Create Identity", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.createIdentity(identity);
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Connect Fail", async () => {
			try {
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
	});
	describe("Create identity ", () => {
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

		it("Create Identity", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.createIdentity(identity);
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Create Fail", async () => {
			try {
				const trustID = new TrustIdHf(config);
				await trustID.createIdentity(identity);
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
	describe("Create Service ", () => {
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

		it("Create Service Success", async () => {
			try {
				const trustID = new TrustIdHf(config);
				const result = await trustID.createService(identity, "id", "name", true, "channel");
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Create Service Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
				const result = await trustID.createService(identity, "id", "name", true, "channel");
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
    });
    describe("Update Service ", () => {
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
        let access = {
            type: 1,
            did: "ksjdskjd"
        }

		it("Update Service Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.updateService(identity, "id", access);
				expect(result).to.equal("OK");
			} catch (err) {
				console.log(err);
			}
		});
		it("Update Service Fail", async () => {
			try {
                const trustID = new TrustIdHf(config);
				await trustID.updateService(identity, "id", access);
			} catch (err) {
				expect(err.message).to.equal("Error calling contract");
			}
		});
    });
    describe("Get Service ", () => {
		let driverStub: any;
		before((done) => {
			driverStub = sinon.stub(HfDriver.prototype, "callContractTransaction").resolves("Service1");
			driverStub.onSecondCall().rejects(new Error("Error calling contract"));
			done();
		});

		after((done) => {
			driverStub.restore();
			done();
        });
        let access = {
            type: 1,
            did: "ksjdskjd"
        }

		it("Get Service Success", async () => {
			try {
              
				const trustID = new TrustIdHf(config);
				const result = await trustID.getService(identity, "id");
				expect(result).to.equal("Service1");
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
 });
