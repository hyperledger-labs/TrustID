"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore no implicit any
const protos = require("fabric-protos");
function newCodeToStatusMap() {
    const result = {};
    for (const [status, code] of Object.entries(protos.protos.TxValidationCode)) {
        result[code] = status;
    }
    return result;
}
const codeToStatusMap = Object.freeze(newCodeToStatusMap());
exports.VALID_STATUS = 'VALID';
function getStatusForCode(code) {
    const status = codeToStatusMap[code];
    if (!status) {
        throw new Error('Unexpected transaction status code: ' + code);
    }
    return status;
}
exports.getStatusForCode = getStatusForCode;
//# sourceMappingURL=transactionstatus.js.map