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
/* global describe, it, before, after */
var expect = require("chai").expect;
var sinon = require("sinon");
var FabricCAServices = require("fabric-ca-client");
var _a = require("fabric-network"), Wallets = _a.Wallets, Gateway = _a.Gateway;
describe("HF Driver - Test", function () {
    before(function () { });
    describe("Connect ", function () {
        var gatewayStub;
        var walletStub;
        var fabricCAServicesStub;
        var errolment = {
            certificate: "skdjsd00",
            key: {
                toBytes: function () { },
            },
        };
        before(function (done) {
            var wallet = {
                put: function () {
                }
            };
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            gatewayStub.onSecondCall().rejects(new Error("Error connecting"));
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
            done();
        });
        after(function (done) {
            gatewayStub.restore();
            walletStub.restore();
            fabricCAServicesStub.restore();
            done();
        });
        it("Connect Success", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, config, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hfdriver = new hfdriver_1.HfDriver();
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
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        sinon.assert.calledOnce(gatewayStub);
                        sinon.assert.calledOnce(walletStub);
                        sinon.assert.calledOnce(fabricCAServicesStub);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it("Connect Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, config, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hfdriver = new hfdriver_1.HfDriver();
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
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        expect(err_2.message).to.equal('Error connecting');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Disconnect ", function () {
        var gatewayStub2;
        var gatewayStub;
        var walletStub;
        var fabricCAServicesStub;
        var config = {
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
        var errolment = {
            certificate: "skdjsd00",
            key: {
                toBytes: function () { },
            },
        };
        before(function (done) {
            var wallet = {
                put: function () {
                }
            };
            gatewayStub2 = sinon.stub(Gateway.prototype, "disconnect").resolves();
            gatewayStub2.onSecondCall().throws(new Error("Error disconnecting"));
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
            done();
        });
        after(function (done) {
            gatewayStub.restore();
            walletStub.restore();
            gatewayStub2.restore();
            fabricCAServicesStub.restore();
            done();
        });
        it("Disconnect Success", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        hfdriver = new hfdriver_1.HfDriver();
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, hfdriver.disconnect()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Disconnect Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        hfdriver = new hfdriver_1.HfDriver();
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, hfdriver.disconnect()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        expect(err_4.message).to.equal('Error disconnecting');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Call contract transaction ", function () {
        var gatewayStub;
        var walletStub;
        var gatewayStub2;
        var fabricCAServicesStub;
        var config = {
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
        var errolment = {
            certificate: "skdjsd00",
            key: {
                toBytes: function () { },
            },
        };
        before(function (done) {
            var wallet = {
                put: function () {
                }
            };
            var contract = {
                submitTransaction: function () {
                    return new Promise(function (resolve) {
                        resolve("OK");
                    });
                }
            };
            var network = {
                getContract: function () {
                    return new Promise(function (resolve) {
                        resolve(contract);
                    });
                }
            };
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            gatewayStub2 = sinon.stub(Gateway.prototype, "getNetwork").resolves(network);
            gatewayStub2.onSecondCall().rejects(new Error("Network not exists"));
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
            done();
        });
        after(function (done) {
            gatewayStub.restore();
            walletStub.restore();
            gatewayStub2.restore();
            fabricCAServicesStub.restore();
            done();
        });
        it("Call Contract Success", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        hfdriver = new hfdriver_1.HfDriver();
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, hfdriver.callContractTransaction("name", "invoke", ["a"])];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal("OK");
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Disconnect Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        hfdriver = new hfdriver_1.HfDriver();
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, hfdriver.callContractTransaction("name", "invoke", ["a"])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        expect(err_6.message).to.equal('Network not exists');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Get contract transaction ", function () {
        var gatewayStub;
        var walletStub;
        var gatewayStub2;
        var fabricCAServicesStub;
        var config = {
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
        var errolment = {
            certificate: "skdjsd00",
            key: {
                toBytes: function () { },
            },
        };
        before(function (done) {
            var wallet = {
                put: function () {
                }
            };
            var contract = {
                evaluateTransaction: function () {
                    return new Promise(function (resolve) {
                        resolve("OK");
                    });
                }
            };
            var network = {
                getContract: function () {
                    return new Promise(function (resolve) {
                        resolve(contract);
                    });
                }
            };
            gatewayStub = sinon.stub(Gateway.prototype, "connect").resolves();
            gatewayStub2 = sinon.stub(Gateway.prototype, "getNetwork").resolves(network);
            gatewayStub2.onSecondCall().rejects(new Error("Network not exists"));
            walletStub = sinon.stub(Wallets, "newFileSystemWallet").resolves(wallet);
            fabricCAServicesStub = sinon.stub(FabricCAServices.prototype, "enroll").resolves(errolment);
            done();
        });
        after(function (done) {
            gatewayStub.restore();
            walletStub.restore();
            gatewayStub2.restore();
            fabricCAServicesStub.restore();
            done();
        });
        it("get Contract Success", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, res, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        hfdriver = new hfdriver_1.HfDriver();
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, hfdriver.callContractTransaction("name", "invoke", ["a"])];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal("OK");
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Get contract Fail", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hfdriver, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        hfdriver = new hfdriver_1.HfDriver();
                        return [4 /*yield*/, hfdriver.connect(config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, hfdriver.getContractTransaction("name", "invoke", ["a"])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _a.sent();
                        expect(err_8.message).to.equal('Network not exists');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
});
