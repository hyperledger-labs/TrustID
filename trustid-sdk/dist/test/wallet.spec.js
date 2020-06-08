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
var chai_1 = require("chai");
var wallet_1 = require("../src/wallet");
var fileKeystore_1 = require("../src/keystore/fileKeystore");
require("mocha");
var wal = wallet_1.Wallet.Instance;
//const hfdriver = wal.drivers.hf
var ks = new fileKeystore_1.FileKeystore('file');
wal.setKeystore(ks);
describe('Wallet tests', function () {
    it('creates new wallet', function () {
        chai_1.expect(wal).to.not.equal({});
    });
    it('Creates FileKeystore for integration in wallet', function () {
        chai_1.expect(ks).to.not.equal({});
    });
    it('wallet not initialized twice', function () {
        var wal2 = wallet_1.Wallet.Instance;
        chai_1.expect(wal).to.equal(wal2);
    });
    it('generate RSA DID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var did, did2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, wal.generateDID('RSA', 'default', 'secret')];
                case 1:
                    did = _c.sent();
                    return [4 /*yield*/, wal.generateDID('RSA', 'default', 'secret')];
                case 2:
                    did2 = _c.sent();
                    chai_1.expect([did.type, did.controller]).to.eql(['RSA', 'default']);
                    _a = chai_1.expect;
                    return [4 /*yield*/, wal.getDID(did.id)];
                case 3:
                    _a.apply(void 0, [_c.sent()]).to.eql(did);
                    _b = chai_1.expect;
                    return [4 /*yield*/, wal.getDID(did.id)];
                case 4:
                    _b.apply(void 0, [_c.sent()]).to.not.eql(did2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('DID operations', function () { return __awaiter(void 0, void 0, void 0, function () {
        var did, did2, payload, err_1, err_2, err_3, signed, verified, err_4, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wal.generateDID('EC', 'default', 'secret')];
                case 1:
                    did = _a.sent();
                    return [4 /*yield*/, wal.generateDID('EC', 'default', 'secret')];
                case 2:
                    did2 = _a.sent();
                    payload = { my: "payload" };
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, wal.generateDID('ed213', 'default', 'secret')];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    chai_1.expect(err_1).to.be.an('error');
                    return [3 /*break*/, 6];
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, did.unlockAccount('wrong')];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    chai_1.expect(err_2).to.be.an('error');
                    return [3 /*break*/, 9];
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, did.sign(payload)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    err_3 = _a.sent();
                    chai_1.expect(err_3).to.be.an('error');
                    return [3 /*break*/, 12];
                case 12: return [4 /*yield*/, did2.unlockAccount('secret')];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, did.unlockAccount('secret')];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, did2.sign(payload)];
                case 15:
                    signed = _a.sent();
                    return [4 /*yield*/, did.verify(signed, did2)];
                case 16:
                    verified = _a.sent();
                    chai_1.expect(verified).to.eql(payload);
                    _a.label = 17;
                case 17:
                    _a.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, did.verify(signed, did)];
                case 18:
                    _a.sent();
                    return [3 /*break*/, 20];
                case 19:
                    err_4 = _a.sent();
                    chai_1.expect(err_4).to.be.an('error');
                    return [3 /*break*/, 20];
                case 20:
                    did.lockAccount();
                    _a.label = 21;
                case 21:
                    _a.trys.push([21, 23, , 24]);
                    return [4 /*yield*/, did.sign(payload)];
                case 22:
                    _a.sent();
                    return [3 /*break*/, 24];
                case 23:
                    err_5 = _a.sent();
                    chai_1.expect(err_5).to.be.an('error');
                    return [3 /*break*/, 24];
                case 24: return [2 /*return*/];
            }
        });
    }); });
});
