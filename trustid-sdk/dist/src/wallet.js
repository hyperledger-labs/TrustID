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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.DID = void 0;
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
var node_jose_1 = require("node-jose");
var crypto_js_1 = __importDefault(require("crypto-js"));
var fileKeystore_1 = require("./keystore/fileKeystore");
var DID = /** @class */ (function () {
    function DID(type, controller) {
        if (type === void 0) { type = "RSA"; }
        if (controller === void 0) { controller = "default"; }
        // TODO: Default parameters for now:
        // Default: 2048 for RSA, 'P-256' for EC, 'Ed25519' for OKP and 256 for oct.
        this.ALGO_TYPES = ["RSA", "EC", "oct"];
        // If type not supported throw error.
        if (!Object.values(this.ALGO_TYPES).includes(type)) {
            throw new Error("Key algorithm not supported");
        }
        this.id = "";
        this.type = type;
        this.controller = controller;
        this.access = 0;
        this.privkey = "";
        this.pubkey = "";
        this.unlockedKey = null;
    }
    // TODO: Can we do this more efficiently?
    DID.prototype.keyGeneration = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (this.type) {
                    case "RSA":
                        return [2 /*return*/, node_jose_1.JWK.createKey("RSA", 2048, { alg: "" })];
                    case "EC":
                        return [2 /*return*/, node_jose_1.JWK.createKey("EC", "P-521", { alg: "" })];
                    case "oct":
                        return [2 /*return*/, node_jose_1.JWK.createKey("oct", 256, { alg: "" })];
                    default:
                        throw new Error("Key algorithm not supported");
                }
                return [2 /*return*/];
            });
        });
    };
    DID.prototype.createKey = function (passphrase) {
        if (passphrase === void 0) { passphrase = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var key, addr, pk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.privkey + this.id + this.pubkey === "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.keyGeneration()];
                    case 1:
                        key = _a.sent();
                        addr = crypto_js_1.default.SHA256(key.toPEM(false)).toString(crypto_js_1.default.enc.Hex);
                        this.id = "did:vtn:trustid:" + addr;
                        this.pubkey = key.toPEM();
                        pk = key.toPEM(true);
                        this.privkey = crypto_js_1.default.AES.encrypt(pk, passphrase).toString();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DID.prototype.unlockAccount = function (passphrase) {
        if (passphrase === void 0) { passphrase = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var pem, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        pem = crypto_js_1.default.AES.decrypt(this.privkey, passphrase).toString(crypto_js_1.default.enc.Utf8);
                        _a = this;
                        return [4 /*yield*/, node_jose_1.JWK.asKey(pem, "pem")];
                    case 1:
                        _a.unlockedKey = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _c.sent();
                        throw new Error("Private key couldn't be deciphered");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DID.prototype.lockAccount = function () {
        this.unlockedKey = undefined;
    };
    DID.prototype.loadFromObject = function (obj) {
        var id = obj.id, type = obj.type, controller = obj.controller, access = obj.access, pubkey = obj.pubkey, privkey = obj.privkey;
        this.id = id;
        this.type = type;
        this.controller = controller;
        this.access = access;
        this.pubkey = pubkey;
        this.privkey = privkey;
    };
    DID.prototype.exportDID = function (withPrivate) {
        var privkey = withPrivate ? this.privkey : "";
        return {
            id: this.id,
            type: this.type,
            pubkey: this.pubkey,
            privkey: privkey,
            controller: this.controller
        };
    };
    /** sign Generates a JWS from a payload using an id from the wallet */
    DID.prototype.sign = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var buf, sign;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.unlockedKey) {
                            throw Error("You must unlock the account before signing the message.");
                        }
                        buf = Buffer.from(JSON.stringify(payload));
                        return [4 /*yield*/, node_jose_1.JWS.createSign({
                                fields: { cty: 'jwk+json' },
                                format: 'compact'
                            }, this.unlockedKey)
                                .update(buf)
                                .final()];
                    case 1:
                        sign = _a.sent();
                        return [2 /*return*/, sign.toString()];
                }
            });
        });
    };
    /** verify Verifies a JWS from a payload using a did */
    DID.prototype.verify = function (signature, did) {
        return __awaiter(this, void 0, void 0, function () {
            var pk, verify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_jose_1.JWK.asKey(did.pubkey, 'pem')];
                    case 1:
                        pk = _a.sent();
                        return [4 /*yield*/, node_jose_1.JWS.createVerify(pk).verify(signature)];
                    case 2:
                        verify = _a.sent();
                        return [2 /*return*/, JSON.parse(verify.payload.toString())];
                }
            });
        });
    };
    return DID;
}());
exports.DID = DID;
/** Class representing Wallets
 *  It follows a Singleton pattern.
 */
var Wallet = /** @class */ (function () {
    /** Constructor for the wallet */
    function Wallet() {
        this.keystore = new fileKeystore_1.FileKeystore();
        this.networks = {};
    }
    Object.defineProperty(Wallet, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    // Functions from specific keystore that will be overloaded
    // in wallet
    Wallet.prototype.getDID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.keystore.getDID(id)];
            });
        });
    };
    Wallet.prototype.storeDID = function (did) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.keystore.storeDID(did)];
            });
        });
    };
    Wallet.prototype.listDID = function () {
        return this.keystore.listDID();
    };
    Wallet.prototype.setDefault = function (did) {
        return this.keystore.setDefault(did);
    };
    Wallet.prototype.storeInMemory = function (did) {
        return this.keystore.storeInMemory(did);
    };
    /** Set the Keystore to use in the wallet. */
    Wallet.prototype.setKeystore = function (keystore) {
        this.keystore = keystore;
    };
    /** Set the Keystore to use in the wallet. */
    Wallet.prototype.addNetwork = function (id, network) {
        this.networks[id] = network;
    };
    /** generateDID generates a new DID in the wallet */
    Wallet.prototype.generateDID = function (type, controller, passphrase) {
        if (controller === void 0) { controller = "default"; }
        if (passphrase === void 0) { passphrase = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var value, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        value = new DID(type, controller);
                        return [4 /*yield*/, value.createKey(passphrase)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, this.keystore.storeDID(value)];
                    case 2:
                        _c.sent();
                        _b = (_a = Object).keys;
                        return [4 /*yield*/, this.keystore.getDID(value.id)];
                    case 3:
                        // If it is the first key assign key as default.
                        // if (Object.keys(await this.keystore.getDID("default")).length === 0) {
                        // 	this.keystore.setDefault(value);
                        // }
                        if (_b.apply(_a, [_c.sent()]).length === 0) {
                            this.keystore.storeInMemory(value);
                        }
                        return [2 /*return*/, value];
                }
            });
        });
    };
    return Wallet;
}());
exports.Wallet = Wallet;
