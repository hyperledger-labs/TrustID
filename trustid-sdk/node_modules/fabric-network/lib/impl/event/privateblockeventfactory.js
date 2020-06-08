"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gatewayutils_1 = require("../gatewayutils");
const fullblockeventfactory_1 = require("./fullblockeventfactory");
const fullcontracteventfactory_1 = require("./fullcontracteventfactory");
const fulltransactioneventfactory_1 = require("./fulltransactioneventfactory");
const util = require("util");
function newPrivateBlockEvent(eventInfo) {
    const privateData = eventInfo.privateData;
    if (!privateData) {
        throw new Error('No private data found: ' + util.inspect(eventInfo));
    }
    const fullBlockEvent = fullblockeventfactory_1.newFullBlockEvent(eventInfo);
    const privateBlockEvent = {
        blockNumber: fullBlockEvent.blockNumber,
        blockData: fullBlockEvent.blockData,
        getTransactionEvents: gatewayutils_1.cachedResult(() => newPrivateTransactionEvents(privateBlockEvent, privateData))
    };
    return Object.freeze(privateBlockEvent);
}
exports.newPrivateBlockEvent = newPrivateBlockEvent;
function newPrivateTransactionEvents(blockEvent, privateData) {
    return fulltransactioneventfactory_1.getTransactionEnvelopeIndexes(blockEvent.blockData)
        .map((index) => newPrivateTransactionEvent(blockEvent, index, privateData[index]));
}
function newPrivateTransactionEvent(blockEvent, index, privateData) {
    const fullTransactionEvent = fulltransactioneventfactory_1.newFullTransactionEvent(blockEvent, index);
    const privateTransactionEvent = {
        transactionId: fullTransactionEvent.transactionId,
        status: fullTransactionEvent.status,
        transactionData: fullTransactionEvent.transactionData,
        isValid: fullTransactionEvent.isValid,
        privateData,
        getBlockEvent: () => blockEvent,
        getContractEvents: gatewayutils_1.cachedResult(() => fullcontracteventfactory_1.newFullContractEvents(privateTransactionEvent))
    };
    return Object.freeze(privateTransactionEvent);
}
//# sourceMappingURL=privateblockeventfactory.js.map