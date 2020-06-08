"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gatewayutils_1 = require("../gatewayutils");
const filteredblockeventfactory_1 = require("./filteredblockeventfactory");
const TransactionStatus = require("./transactionstatus");
const util = require("util");
function newCommitEvent(peer, eventInfo) {
    if (!eventInfo.transactionId || !eventInfo.status) {
        throw new Error('Invalid event info for commit event: ' + util.inspect(eventInfo));
    }
    const transactionId = eventInfo.transactionId;
    const getBlockEvent = gatewayutils_1.cachedResult(() => filteredblockeventfactory_1.newFilteredBlockEvent(eventInfo));
    const getTransactionEvent = gatewayutils_1.cachedResult(() => {
        const blockEvent = getBlockEvent();
        const transactionEvent = blockEvent.getTransactionEvents().find((tx) => tx.transactionId === transactionId);
        if (!transactionEvent) {
            throw new Error(`Transaction ${transactionId} does not exist in block: ${util.inspect(blockEvent)}`);
        }
        return transactionEvent;
    });
    const commitEvent = {
        peer,
        transactionId,
        status: eventInfo.status,
        get transactionData() {
            return getTransactionEvent().transactionData;
        },
        isValid: eventInfo.status === TransactionStatus.VALID_STATUS,
        getBlockEvent,
        getContractEvents: () => getTransactionEvent().getContractEvents()
    };
    return Object.freeze(commitEvent);
}
exports.newCommitEvent = newCommitEvent;
//# sourceMappingURL=commiteventfactory.js.map