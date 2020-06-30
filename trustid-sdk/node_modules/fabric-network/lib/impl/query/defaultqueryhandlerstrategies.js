"use strict";
/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const singlequeryhandler_1 = require("./singlequeryhandler");
const roundrobinqueryhandler_1 = require("./roundrobinqueryhandler");
function getOrganizationPeers(network) {
    const mspId = network.getGateway().getIdentity().mspId;
    return network.getChannel().getEndorsers(mspId);
}
/**
 * @typedef DefaultQueryHandlerStrategies
 * @memberof module:fabric-network
 * @property {module:fabric-network.QueryHandlerFactory} MSPID_SCOPE_SINGLE Query any one of the event services for the connected organisation. Continue
 * to use the same event service for all queries unless it fails.
 * @property {module:fabric-network.QueryHandlerFactory} MSPID_SCOPE_ROUND_ROBIN Query any one of the event services for the connected organisation.
 * Use the next available peer for each successive query.
 */
exports.MSPID_SCOPE_SINGLE = (network) => {
    const peers = getOrganizationPeers(network);
    return new singlequeryhandler_1.SingleQueryHandler(peers);
};
exports.MSPID_SCOPE_ROUND_ROBIN = (network) => {
    const peers = getOrganizationPeers(network);
    return new roundrobinqueryhandler_1.RoundRobinQueryHandler(peers);
};
//# sourceMappingURL=defaultqueryhandlerstrategies.js.map