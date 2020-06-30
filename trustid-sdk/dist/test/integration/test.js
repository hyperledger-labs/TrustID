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
var wallet_1 = require("../../src/wallet");
var chai_1 = require("chai");
var trustHF_1 = require("../../src/network/trustHF");
var path = require("path");
var fs = require("fs");
var ccpPath = path.resolve(__dirname, "..", "..", "..", "connection-profile.json");
var adminPriv = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7Th71Us2fUkeB\ng0gxGtRDgkeEefTBnE8IP2Rw/PrdIwGJicK1EzbikrzqABpO4zgPxXYuOsDp28Fb\nAE5/a4X/iKshFcw5ojny61cQKwDSvoLDZKkJhJXwErXLyGmezDTb9PTFhENsWp+G\n+pywEnbgsjoXi0Khs+h6ASlsJNagsy4wRPdZkUvKZhKIbjY2ZtxnQpMaTBPOIvKU\nvbafnABlOV+6+4FANFsr9L181bNeOiaEmaqzJCajZgBHQUDVpefs96qj/S0J+0mT\nwmNajN0+DedN4Z6Xl/E25XuuaU3brEFTqnTE2DXa3P7iCCsR6r313OCR8/4pCliX\nNlUEs12ZAgMBAAECggEAZ/0SQP9Mu5RxsJzTWrfbevN8gzc2RLtkQV74g6ZgHJ/P\nva1nFSLqyNXQ3lVaRcvulwr49ueVrQBdlAlSi3mFtn4JDGBOtvyzEYPJHWfSmC4+\n6P4cvvUGTXgFyHKm+QvEmQ2hS3uH90NE6CqBDVvi9hLdH68oOiBpBDta5Ph61FJS\nOcaVQ20jEldMkz6bYv9pOYl6hunJnYB+ZYKcq25SkTEERwKQueDtzwB8ulsazbuw\nn8CraL2ncN7cAOlfcVYUica1LnP74roEK+zIUFFsjTxC9xMS47GwWkFls1VLEDb1\ntKUxJLnYJJy/18b+gpFDztr3BZFgiUpO1QUaY9aPgQKBgQDwBNm9usvfB/w76z0A\nU5JNfC1Pk3MpxRBKOM84s3HCUiu7KbCnLmOKTmORAcsbO0H+uU5xMYcsUdIgQF2C\n9SAGcKize12xqcsutoQPiEisEi387rsk1iQ8jJ03fQY6SNBe+fZta3JXuVogeiRd\nzz0YfZ7OBh2MkwEDpNjUAeXiaQKBgQDHxsIPvFGq0cbzmuIYQsQJV71y3H4iPGRI\nDVkTs6Vc9VDMAN5GtRB1HkfpQtVBFwpDZIhvfySmLhnGi2vs6fKFwo9SpRmxSypZ\nrkzs1/0Gc7ZRbHRwt1n326s2Sry+6+0AxOxsM6+OJNqfugN9RAfg8zeJeEEJTYTU\n3ty+pULbsQKBgQDPl7JoGib4mSR9AqH5JU8Vu4BJIkPp7aqAN5Bq/zE2G/H86DsE\n7edkGRaetYlg3SjgUo/Y8ThzibUO9fyrJq3zQ/91dQ79edjlZzDjakFIqlSiPi0Y\n2CnxQME92+HGCXJHozSTQOpdm0+rZVkM1hCGnSf8E2f9TKwE5dAv1hBpeQKBgQC/\npL7DQ5+AY68cP+dG6L2QTNgTWMuzYgW9TPi3uq0WiMqSeP7CC64W/A52CUP0JfsV\nfVqYwvpQZIcbfOHyqtaZVHQTDwifmICu+VMYHXa/+r7aS1VET8+BwvvyoC2CZWa9\nRyuZ/NcbX+VONq5kO5/nPsp3GKIjH3cekhBm3rhNcQKBgBlCEJfRyslFjv90wI5N\niWEOYoTkY3R8RhAooq9AbFIbPPXHUiJOyqnau4FeiUTtc0ZyRv5A55qhKbsj7p4o\nbmyvEGp6cvVmnn3UGH49k5blWzm0MoksxSiYphtBxHqMyuY+Gfj6BN+JAwyrEKwl\ng/fADk89eHUjNgoedy6wWqL3\n-----END PRIVATE KEY-----";
var adminPub = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu04e9VLNn1JHgYNIMRrU\nQ4JHhHn0wZxPCD9kcPz63SMBiYnCtRM24pK86gAaTuM4D8V2LjrA6dvBWwBOf2uF\n/4irIRXMOaI58utXECsA0r6Cw2SpCYSV8BK1y8hpnsw02/T0xYRDbFqfhvqcsBJ2\n4LI6F4tCobPoegEpbCTWoLMuMET3WZFLymYSiG42NmbcZ0KTGkwTziLylL22n5wA\nZTlfuvuBQDRbK/S9fNWzXjomhJmqsyQmo2YAR0FA1aXn7Peqo/0tCftJk8JjWozd\nPg3nTeGel5fxNuV7rmlN26xBU6p0xNg12tz+4ggrEeq99dzgkfP+KQpYlzZVBLNd\nmQIDAQAB\n-----END PUBLIC KEY-----\n";
describe("Integration test", function () {
    it("Invoke service", function () { return __awaiter(void 0, void 0, void 0, function () {
        var wal, ccp, config, identity, trustID, access, didUnlock, _a, _b, _c, _d, _e, id, _f, _g, _h, _j, result, _k, _l, err_1;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    wal = wallet_1.Wallet.Instance;
                    _m.label = 1;
                case 1:
                    _m.trys.push([1, 19, , 21]);
                    ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
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
                        ccp: ccp,
                        chaincodeName: "identitycc",
                        fcn: "proxy",
                        channel: "telefonicachannel",
                    };
                    return [4 /*yield*/, wal.generateDID("RSA", "default", "secret")];
                case 2:
                    identity = _m.sent();
                    return [4 /*yield*/, wal.setDefault(identity)];
                case 3:
                    _m.sent();
                    trustID = new trustHF_1.TrustIdHf(config);
                    wal.addNetwork("hf", trustID);
                    return [4 /*yield*/, wal.networks["hf"].configureDriver()];
                case 4:
                    _m.sent();
                    access = { did: "did:vtn:trustos:telefonica:0", type: 2 };
                    return [4 /*yield*/, wal.getDID("default")];
                case 5:
                    didUnlock = _m.sent();
                    return [4 /*yield*/, didUnlock.unlockAccount("secret")];
                case 6:
                    _m.sent();
                    _b = (_a = wal.networks["hf"]).createIdentity;
                    return [4 /*yield*/, wal.getDID("default")];
                case 7: return [4 /*yield*/, _b.apply(_a, [_m.sent()])];
                case 8:
                    _m.sent();
                    console.log("Getting created key...");
                    _d = (_c = trustID).getIdentity;
                    return [4 /*yield*/, wal.getDID("default")];
                case 9:
                    _e = [_m.sent()];
                    return [4 /*yield*/, didUnlock.id];
                case 10: return [4 /*yield*/, _d.apply(_c, _e.concat([_m.sent()]))];
                case 11:
                    _m.sent();
                    id = Date.now();
                    _g = (_f = trustID).createService;
                    return [4 /*yield*/, wal.getDID("default")];
                case 12: return [4 /*yield*/, _g.apply(_f, [_m.sent(), "vtn:trustos:service:" + id, "chaincode", true])];
                case 13:
                    _m.sent();
                    _j = (_h = trustID).updateService;
                    return [4 /*yield*/, wal.getDID("default")];
                case 14: return [4 /*yield*/, _j.apply(_h, [_m.sent(), "vtn:trustos:service:" + id, access, true])];
                case 15:
                    _m.sent();
                    _l = (_k = trustID).invoke;
                    return [4 /*yield*/, wal.getDID("default")];
                case 16: return [4 /*yield*/, _l.apply(_k, [_m.sent(),
                        "vtn:trustos:service:1" + id, ["set", "5", "100"],
                        "telefonicachannel"])];
                case 17:
                    result = _m.sent();
                    return [4 /*yield*/, wal.networks["hf"].disconnectDriver()];
                case 18:
                    _m.sent();
                    chai_1.expect(result).to.equal("100");
                    return [3 /*break*/, 21];
                case 19:
                    err_1 = _m.sent();
                    return [4 /*yield*/, wal.networks["hf"].disconnectDriver()];
                case 20:
                    _m.sent();
                    console.log(err_1);
                    return [3 /*break*/, 21];
                case 21: return [2 /*return*/];
            }
        });
    }); });
});
