"use strict";
/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const allfortxstrategy_1 = require("./allfortxstrategy");
const anyfortxstrategy_1 = require("./anyfortxstrategy");
const transactioneventhandler_1 = require("./transactioneventhandler");
function getOrganizationPeers(network) {
    const mspId = network.getGateway().getIdentity().mspId;
    return network.getChannel().getEndorsers(mspId);
}
function getNetworkPeers(network) {
    return network.getChannel().getEndorsers();
}
/**
 * @typedef DefaultEventHandlerStrategies
 * @memberof module:fabric-network
 * @property {module:fabric-network.TxEventHandlerFactory} MSPID_SCOPE_ALLFORTX Listen for transaction commit
 * events from all peers in the client identity's organization.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until successful
 * events are received from <em>all</em> currently connected peers (minimum 1).
 * @property {module:fabric-network.TxEventHandlerFactory} MSPID_SCOPE_ALLFORTX Listen for transaction commit
 * events from all peers in the client identity's organization.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until successful
 * events are received from <em>all</em> currently connected peers (minimum 1).
 * @property {module:fabric-network.TxEventHandlerFactory} MSPID_SCOPE_ALLFORTX Listen for transaction commit
 * events from all peers in the client identity's organization.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until successful
 * events are received from <em>all</em> currently connected peers (minimum 1).
 * @property {module:fabric-network.TxEventHandlerFactory} NETWORK_SCOPE_ANYFORTX Listen for transaction commit
 * events from all peers in the network.
 * The [submitTransaction]{@link module:fabric-network.Contract#submitTransaction} function will wait until a
 * successful event is received from <em>any</em> peer.
 */
exports.MSPID_SCOPE_ALLFORTX = (transactionId, network) => {
    const eventStrategy = new allfortxstrategy_1.AllForTxStrategy(getOrganizationPeers(network));
    return new transactioneventhandler_1.TransactionEventHandler(transactionId, network, eventStrategy);
};
exports.MSPID_SCOPE_ANYFORTX = (transactionId, network) => {
    const eventStrategy = new anyfortxstrategy_1.AnyForTxStrategy(getOrganizationPeers(network));
    return new transactioneventhandler_1.TransactionEventHandler(transactionId, network, eventStrategy);
};
exports.NETWORK_SCOPE_ALLFORTX = (transactionId, network) => {
    const eventStrategy = new allfortxstrategy_1.AllForTxStrategy(getNetworkPeers(network));
    return new transactioneventhandler_1.TransactionEventHandler(transactionId, network, eventStrategy);
};
exports.NETWORK_SCOPE_ANYFORTX = (transactionId, network) => {
    const eventStrategy = new anyfortxstrategy_1.AnyForTxStrategy(getNetworkPeers(network));
    return new transactioneventhandler_1.TransactionEventHandler(transactionId, network, eventStrategy);
};
//# sourceMappingURL=defaulteventhandlerstrategies.js.map