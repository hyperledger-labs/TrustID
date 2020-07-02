"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function newFullContractEvents(transactionEvent) {
    const transactionActions = transactionEvent.transactionData.actions || [];
    return transactionActions.map((transactionAction) => {
        const chaincodeEvent = transactionAction.payload.action.proposal_response_payload.extension.events;
        return newFullContractEvent(transactionEvent, chaincodeEvent);
    });
}
exports.newFullContractEvents = newFullContractEvents;
function newFullContractEvent(transactionEvent, chaincodeEvent) {
    const contractEvent = {
        chaincodeId: chaincodeEvent.chaincode_id,
        eventName: chaincodeEvent.event_name,
        payload: chaincodeEvent.payload,
        getTransactionEvent: () => transactionEvent
    };
    return Object.freeze(contractEvent);
}
//# sourceMappingURL=fullcontracteventfactory.js.map