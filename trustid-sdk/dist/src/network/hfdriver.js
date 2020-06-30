"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HfDriver = void 0;
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
var driver_1 = require("./driver");
var FabricCAServices = require("fabric-ca-client");
var _a = require("fabric-network"), Gateway = _a.Gateway, Wallets = _a.Wallets, DefaultEventHandlerStrategies = _a.DefaultEventHandlerStrategies;
var HfDriver = /** @class */ (function (_super) {
    __extends(HfDriver, _super);
    function HfDriver() {
        var _this = _super.call(this) || this;
        _this.connection = {};
        return _this;
    }
    HfDriver.prototype.callContractTransaction = function (id, fcn, args, channel) {
        return __awaiter(this, void 0, void 0, function () {
            var network, contract, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.connection.getNetwork(channel)];
                    case 1:
                        network = _a.sent();
                        return [4 /*yield*/, network.getContract(id)];
                    case 2:
                        contract = _a.sent();
                        return [4 /*yield*/, contract.submitTransaction.apply(contract, __spreadArrays([fcn], args))];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.toString()];
                    case 4:
                        err_1 = _a.sent();
                        if (err_1.responses) {
                            throw new Error(err_1.responses[0].response.message);
                        }
                        else {
                            throw err_1;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HfDriver.prototype.getContractTransaction = function (id, fcn, args, channel) {
        return __awaiter(this, void 0, void 0, function () {
            var network, contract, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.connection.getNetwork(channel)];
                    case 1:
                        network = _a.sent();
                        return [4 /*yield*/, network.getContract(id)];
                    case 2:
                        contract = _a.sent();
                        return [4 /*yield*/, contract.evaluateTransaction.apply(contract, __spreadArrays([fcn], args))];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.toString()];
                    case 4:
                        err_2 = _a.sent();
                        throw err_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HfDriver.prototype.connect = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, caService, req, enrollment, identity, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.connection = new Gateway();
                        return [4 /*yield*/, Wallets.newFileSystemWallet(config.stateStore)];
                    case 1:
                        wallet = _a.sent();
                        caService = new FabricCAServices(config.caURL, config.tlsOptions, config.caName);
                        req = {
                            enrollmentID: config.caAdmin,
                            enrollmentSecret: config.caPassword,
                        };
                        return [4 /*yield*/, caService.enroll(req)];
                    case 2:
                        enrollment = _a.sent();
                        identity = {
                            credentials: {
                                certificate: enrollment.certificate,
                                privateKey: enrollment.key.toBytes(),
                            },
                            mspId: config.mspId,
                            type: "X.509",
                        };
                        return [4 /*yield*/, wallet.put(config.walletID, identity)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.connection.connect(config.ccp, {
                                wallet: wallet,
                                identity: config.walletID,
                                discovery: {
                                    enabled: true,
                                    asLocalhost: config.asLocalhost,
                                },
                                eventHandlerOptions: {
                                    strategy: DefaultEventHandlerStrategies.NETWORK_SCOPE_ANYFORTX,
                                },
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.connection];
                    case 5:
                        err_3 = _a.sent();
                        throw err_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HfDriver.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.connection.disconnect();
                return [2 /*return*/];
            });
        });
    };
    return HfDriver;
}(driver_1.Driver));
exports.HfDriver = HfDriver;
