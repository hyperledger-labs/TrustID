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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoKeystore = void 0;
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
var keystore_1 = require("./keystore");
var wallet_1 = require("../wallet");
var Mongoose = require("mongoose");
var DIDSchema = new Mongoose.Schema({
    id: String,
    pubkey: String,
    type: String,
    controller: String,
    access: Number,
    privkey: String,
});
var DIDModel = Mongoose.model("did", DIDSchema);
var MongoKeystore = /** @class */ (function (_super) {
    __extends(MongoKeystore, _super);
    // Create connection to the keystore database.
    function MongoKeystore(mongoURI) {
        var _this = _super.call(this) || this;
        _this.uri = mongoURI;
        _this.database = null;
        return _this;
    }
    MongoKeystore.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Mongoose.connect(this.uri, {
                            useNewUrlParser: true,
                            useFindAndModify: true,
                            useUnifiedTopology: true,
                            useCreateIndex: true,
                        })];
                    case 1:
                        _a.sent();
                        this.database = Mongoose.connection;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** getKey gets a key from the keystore of the wallet */
    MongoKeystore.prototype.getDID = function (id) {
        if (id === void 0) { id = "default"; }
        return __awaiter(this, void 0, void 0, function () {
            var didObj, emptyDID, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!(id in this.keystore)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DIDModel.findOne({ id: id })];
                    case 2:
                        didObj = _b.sent();
                        emptyDID = new wallet_1.DID("RSA", undefined);
                        emptyDID.loadFromObject(didObj);
                        this.keystore[id] = emptyDID;
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        throw new Error("DID not found in database");
                    case 4: return [2 /*return*/, this.keystore[id]];
                }
            });
        });
    };
    /** Stores DID in the permanent keystore */
    MongoKeystore.prototype.storeDID = function (did) {
        return __awaiter(this, void 0, void 0, function () {
            var didObj, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, DIDModel.findOne({ id: did.id })];
                    case 1:
                        didObj = _a.sent();
                        console.log(didObj);
                        if (!!didObj) return [3 /*break*/, 3];
                        return [4 /*yield*/, DIDModel.create(did)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: throw new Error("The identity already exists in the storage");
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return MongoKeystore;
}(keystore_1.Keystore));
exports.MongoKeystore = MongoKeystore;
