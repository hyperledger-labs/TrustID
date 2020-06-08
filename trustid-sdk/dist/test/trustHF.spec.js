"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
var hfdriver_1 = require("../src/network/hfdriver");
var trustHF_1 = require("../src/network/trustHF");
var wallet_1 = require("../src/wallet");
/* global describe, it, before, after */
var expect = require("chai").expect;
var sinon = require("sinon");
describe("TrustHF - Test", function () { return __awaiter(void 0, void 0, void 0, function () {
    var config, wal, identity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    stateStore: "/tmp/statestore",
                    caURL: "https://ca.org1.telefonica.com:7054",
                    caName: "ca.org1.telefonica.com",
                    caAdmin: "adminCA",
                    caPassword: "adminpw",
                    tlsOptions: {
                        trustedRoots: "-----BEGIN CERTIFICATE-----MIICTjCCAfSgAwIBAgIRAPz6Z66RGDs2BDghYGuShw4wCgYIKoZIzj0EAwIwcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMB4XDTIwMDUxMjEzMDIwMFoXDTMwMDUxMDEzMDIwMFowcTELMAkGA1UEBhMCRVMxDzANBgNVBAgTBk1hZHJpZDEPMA0GA1UEBxMGTWFkcmlkMRwwGgYDVQQKExNvcmcxLnRlbGVmb25pY2EuY29tMSIwIAYDVQQDExl0bHNjYS5vcmcxLnRlbGVmb25pY2EuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEaJraPeAMD+qMba9gNfzwhhfSQNDStqhkvGdPKfxjl+5YoZ+AZkf5qXUPCbSVFh2rlIagZQzcxLnxRmwguEDJjaNtMGswDgYDVR0PAQH/BAQDAgGmMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDATAPBgNVHRMBAf8EBTADAQH/MCkGA1UdDgQiBCDxTrECkDkA2zbsZ7US807jJKKmZ6E90QYkjC7szbQrQDAKBggqhkjOPQQDAgNIADBFAiEAmFFB79r8Jqu4QEgNRQEWEWrY9g70pEUIL4cwq7Zj//UCIDoOuRhihvbFsLTSNbK31VzmL5lXvZGwzvS60n9xk33B-----END CERTIFICATE-----",
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
                wal = wallet_1.Wallet.Instance;
                return [4 /*yield*/, wal.generateDID("RSA", "default", "secret")];
            case 1:
                identity = _a.sent();
                return [4 /*yield*/, identity.unlockAccount("secret")];
            case 2:
                _a.sent();
                before(function () { });
                describe("Configure Driver ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "connect").resolves();
                        driverStub.onSecondCall().rejects(new Error("Error connecting"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Configure Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.configureDriver()];
                                case 1:
                                    _a.sent();
                                    sinon.assert.calledOnce(driverStub);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    console.log(err_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Configure Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.configureDriver()];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _a.sent();
                                    expect(err_2.message).to.equal("Error connecting");
                                    sinon.assert.calledTwice(driverStub);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Disconnect Driver ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "disconnect").resolves();
                        driverStub.onSecondCall().rejects(new Error("Error disconnect"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Configure Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.disconnectDriver()];
                                case 1:
                                    _a.sent();
                                    sinon.assert.calledOnce(driverStub);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_3 = _a.sent();
                                    console.log(err_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Configure Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.disconnectDriver()];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_4 = _a.sent();
                                    expect(err_4.message).to.equal("Error disconnect");
                                    sinon.assert.calledTwice(driverStub);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Create identity ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("OK");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Create Identity", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.createIdentity(identity)];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("OK");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_5 = _a.sent();
                                    console.log(err_5);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Connect Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            try {
                            }
                            catch (err) {
                                expect(err.message).to.equal("Error calling contract");
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
                describe("Create identity ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("OK");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Create Identity", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.createIdentity(identity)];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("OK");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_6 = _a.sent();
                                    console.log(err_6);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Create Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.createIdentity(identity)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_7 = _a.sent();
                                    expect(err_7.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Verify identity ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("OK");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Verify IdentitY", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.verifyIdentity(identity, "id")];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("OK");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_8 = _a.sent();
                                    console.log(err_8);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Verify Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.verifyIdentity(identity, "id")];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_9 = _a.sent();
                                    expect(err_9.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Revoke identity ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("OK");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Revoke IdentitY Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.revokeIdentity(identity, "id")];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("OK");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_10 = _a.sent();
                                    console.log(err_10);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Revoke Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_11;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.revokeIdentity(identity, "id")];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_11 = _a.sent();
                                    expect(err_11.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Get identity ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("This is identity");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Get IdentitY Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_12;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.getIdentity(identity, "id")];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("This is identity");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_12 = _a.sent();
                                    console.log(err_12);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Get identity Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_13;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.getIdentity(identity, "id")];
                                case 1:
                                    result = _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_13 = _a.sent();
                                    expect(err_13.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Create Service ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("OK");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Create Service Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_14;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.createService(identity, "id", "name")];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("OK");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_14 = _a.sent();
                                    console.log(err_14);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Create Service Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_15;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.createService(identity, "id", "name")];
                                case 1:
                                    result = _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_15 = _a.sent();
                                    expect(err_15.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Update Service ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("OK");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    var access = {
                        type: 1,
                        did: "ksjdskjd"
                    };
                    it("Update Service Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_16;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.updateService(identity, "id", access)];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("OK");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_16 = _a.sent();
                                    console.log(err_16);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Update Service Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_17;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.updateService(identity, "id", access)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_17 = _a.sent();
                                    expect(err_17.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Get Service ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("Service1");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    var access = {
                        type: 1,
                        did: "ksjdskjd"
                    };
                    it("Get Service Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_18;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.getService(identity, "id")];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("Service1");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_18 = _a.sent();
                                    console.log(err_18);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Get Service Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_19;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.getService(identity, "id")];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_19 = _a.sent();
                                    expect(err_19.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Invoke Service ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "callContractTransaction").resolves("result");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Invoke Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_20;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.invoke(identity, "id", ["a"], "channel1")];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("result");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_20 = _a.sent();
                                    console.log(err_20);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Invoke Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_21;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.invoke(identity, "id", ["a"], "channel1")];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_21 = _a.sent();
                                    expect(err_21.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe("Query Service ", function () {
                    var driverStub;
                    before(function (done) {
                        driverStub = sinon.stub(hfdriver_1.HfDriver.prototype, "getContractTransaction").resolves("result");
                        driverStub.onSecondCall().rejects(new Error("Error calling contract"));
                        done();
                    });
                    after(function (done) {
                        driverStub.restore();
                        done();
                    });
                    it("Query Success", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, result, err_22;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.query(identity, "id", ["a"], "channel1")];
                                case 1:
                                    result = _a.sent();
                                    expect(result).to.equal("result");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_22 = _a.sent();
                                    console.log(err_22);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    it("Query Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var trustID, err_23;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    trustID = new trustHF_1.TrustIdHf(config);
                                    return [4 /*yield*/, trustID.query(identity, "id", ["a"], "channel1")];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_23 = _a.sent();
                                    expect(err_23.message).to.equal("Error calling contract");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [2 /*return*/];
        }
    });
}); });
