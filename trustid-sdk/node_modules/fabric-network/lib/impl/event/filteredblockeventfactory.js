"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gatewayutils_1 = require("../gatewayutils");
const TransactionStatus = require("./transactionstatus");
const util = require("util");
function newFilteredBlockEvent(eventInfo) {
    if (!eventInfo.filteredBlock) {
        throw new Error('No block data found: ' + util.inspect(eventInfo));
    }
    const blockEvent = {
        blockNumber: eventInfo.blockNumber,
        blockData: eventInfo.filteredBlock,
        getTransactionEvents: gatewayutils_1.cachedResult(() => newFilteredTransactionEvents(blockEvent))
    };
    return Object.freeze(blockEvent);
}
exports.newFilteredBlockEvent = newFilteredBlockEvent;
function newFilteredTransactionEvents(blockEvent) {
    const filteredTransactions = blockEvent.blockData.filtered_transactions || [];
    return filteredTransactions.map((tx) => newFilteredTransactionEvent(blockEvent, tx));
}
function newFilteredTransactionEvent(blockEvent, filteredTransaction) {
    const transactionEvent = {
        transactionId: filteredTransaction.txid,
        status: filteredTransaction.tx_validation_code,
        transactionData: filteredTransaction,
        isValid: filteredTransaction.tx_validation_code === TransactionStatus.VALID_STATUS,
        getBlockEvent: () => blockEvent,
        getContractEvents: gatewayutils_1.cachedResult(() => newFilteredContractEvents(transactionEvent))
    };
    return Object.freeze(transactionEvent);
}
function newFilteredContractEvents(transactionEvent) {
    var _a;
    const chaincodeActions = ((_a = transactionEvent.transactionData.transaction_actions) === null || _a === void 0 ? void 0 : _a.chaincode_actions) || [];
    return chaincodeActions.map((ccAction) => newFilteredContractEvent(transactionEvent, ccAction.chaincode_event));
}
function newFilteredContractEvent(transactionEvent, chaincodeEvent) {
    const contractEvent = {
        chaincodeId: chaincodeEvent.chaincode_id,
        eventName: chaincodeEvent.event_name,
        getTransactionEvent: () => transactionEvent
    };
    return Object.freeze(contractEvent);
}
//# sourceMappingURL=filteredblockeventfactory.js.map