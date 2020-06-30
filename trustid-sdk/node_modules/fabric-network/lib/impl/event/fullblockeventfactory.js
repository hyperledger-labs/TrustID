"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gatewayutils_1 = require("../gatewayutils");
const fulltransactioneventfactory_1 = require("./fulltransactioneventfactory");
const util = require("util");
function newFullBlockEvent(eventInfo) {
    if (!eventInfo.block) {
        throw new Error('No block data found: ' + util.inspect(eventInfo));
    }
    const blockEvent = {
        blockNumber: eventInfo.blockNumber,
        blockData: eventInfo.block,
        getTransactionEvents: gatewayutils_1.cachedResult(() => newFullTransactionEvents(blockEvent))
    };
    return Object.freeze(blockEvent);
}
exports.newFullBlockEvent = newFullBlockEvent;
function newFullTransactionEvents(blockEvent) {
    return fulltransactioneventfactory_1.getTransactionEnvelopeIndexes(blockEvent.blockData)
        .map((index) => fulltransactioneventfactory_1.newFullTransactionEvent(blockEvent, index));
}
//# sourceMappingURL=fullblockeventfactory.js.map