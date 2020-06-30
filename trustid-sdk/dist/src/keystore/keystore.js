"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keystore = void 0;
var Keystore = /** @class */ (function () {
    function Keystore() {
        this.keystore = {};
    }
    // Store DID in memory
    Keystore.prototype.storeInMemory = function (did) {
        this.keystore[did.id] = did;
        return true;
    };
    /** List available keys in the keystore inmemory*/
    Keystore.prototype.listDID = function () {
        return Object.keys(this.keystore);
    };
    /** setDefault sets a DID as the default key for the wallet */
    Keystore.prototype.setDefault = function (did) {
        this.keystore["default"] = did;
        return true;
    };
    return Keystore;
}());
exports.Keystore = Keystore;
