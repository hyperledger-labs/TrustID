"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayUtils = require("../gatewayutils");
const Logger = require("../../logger");
const logger = Logger.getLogger('Listener');
function checkpointBlockListener(listener, checkpointer) {
    return async (blockEvent) => {
        const checkpointBlockNumber = await checkpointer.getBlockNumber();
        if (!checkpointBlockNumber || checkpointBlockNumber.equals(blockEvent.blockNumber)) {
            await listener(blockEvent);
            const nextBlockNumber = blockEvent.blockNumber.add(1);
            await checkpointer.setBlockNumber(nextBlockNumber);
        }
    };
}
exports.checkpointBlockListener = checkpointBlockListener;
function blockFromContractListener(listener, checkpointer) {
    if (checkpointer) {
        const transactionListener = transactionFromContractListener(listener);
        const checkpointTxListener = checkpointTransactionListener(transactionListener, checkpointer);
        const blockListener = blockFromTransactionListener(checkpointTxListener);
        return checkpointBlockListener(blockListener, checkpointer);
    }
    else {
        const transactionListener = transactionFromContractListener(listener);
        return blockFromTransactionListener(transactionListener);
    }
}
exports.blockFromContractListener = blockFromContractListener;
function transactionFromContractListener(listener) {
    return async (transactionEvent) => {
        for (const contractEvent of transactionEvent.getContractEvents()) {
            await listener(contractEvent);
        }
    };
}
function checkpointTransactionListener(listener, checkpointer) {
    return async (transactionEvent) => {
        const checkpointTransactionIds = await checkpointer.getTransactionIds();
        if (!checkpointTransactionIds.has(transactionEvent.transactionId)) {
            await listener(transactionEvent);
            await checkpointer.addTransactionId(transactionEvent.transactionId);
        }
    };
}
function blockFromTransactionListener(listener) {
    return async (blockEvent) => {
        const transactionPromises = blockEvent.getTransactionEvents()
            .filter((transactionEvent) => transactionEvent.isValid)
            .map((transactionEvent) => listener(transactionEvent));
        // Don't use Promise.all() as it returns early if any promises are rejected
        const results = await GatewayUtils.allSettled(transactionPromises);
        logAndThrowErrors(results);
    };
}
function logAndThrowErrors(results) {
    const errors = results
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason);
    if (errors.length > 0) {
        errors.forEach((error) => logger.warn('Error notifying transaction listener', error));
        throw new Error('Error notifying listener: ' + errors[0].stack || errors[0].message);
    }
}
//# sourceMappingURL=listeners.js.map