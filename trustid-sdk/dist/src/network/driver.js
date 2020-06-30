"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
var Driver = /** @class */ (function () {
    function Driver() {
        this.connection = {};
    }
    /** Return connection */
    Driver.prototype.getConnection = function () {
        return this.connection;
    };
    return Driver;
}());
exports.Driver = Driver;
