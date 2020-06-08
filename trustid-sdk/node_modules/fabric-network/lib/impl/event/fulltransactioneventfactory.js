"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const gatewayutils_1 = require("../gatewayutils");
const fullcontracteventfactory_1 = require("./fullcontracteventfactory");
const TransactionStatus = require("./transactionstatus");
// @ts-ignore no implicit any
const protos = require("fabric-protos");
function getTransactionEnvelopeIndexes(blockData) {
    const txEnvelopeIndexes = [];
    const envelopes = blockData.data.data || [];
    envelopes.forEach((envelope, index) => {
        if (isTransactionPayload(envelope.payload)) {
            txEnvelopeIndexes.push(index);
        }
    });
    return txEnvelopeIndexes;
}
exports.getTransactionEnvelopeIndexes = getTransactionEnvelopeIndexes;
function isTransactionPayload(payload) {
    return payload.header.channel_header.type === protos.common.HeaderType.ENDORSER_TRANSACTION;
}
function newFullTransactionEvent(blockEvent, txEnvelopeIndex) {
    const blockMetadata = blockEvent.blockData.metadata.metadata || [];
    const transactionStatusCodes = blockMetadata[protos.common.BlockMetadataIndex.TRANSACTIONS_FILTER];
    const envelope = blockEvent.blockData.data.data[txEnvelopeIndex];
    const transactionId = envelope.payload.header.channel_header.tx_id;
    const code = transactionStatusCodes[txEnvelopeIndex];
    const status = TransactionStatus.getStatusForCode(code);
    const transactionEvent = {
        transactionId,
        status,
        transactionData: envelope.payload.data,
        isValid: status === TransactionStatus.VALID_STATUS,
        getBlockEvent: () => blockEvent,
        getContractEvents: gatewayutils_1.cachedResult(() => fullcontracteventfactory_1.newFullContractEvents(transactionEvent))
    };
    return Object.freeze(transactionEvent);
}
exports.newFullTransactionEvent = newFullTransactionEvent;
//# sourceMappingURL=fulltransactioneventfactory.js.map