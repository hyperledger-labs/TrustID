/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { TxEventHandlerFactory } from './transactioneventhandler';
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
export declare const MSPID_SCOPE_ALLFORTX: TxEventHandlerFactory;
export declare const MSPID_SCOPE_ANYFORTX: TxEventHandlerFactory;
export declare const NETWORK_SCOPE_ALLFORTX: TxEventHandlerFactory;
export declare const NETWORK_SCOPE_ANYFORTX: TxEventHandlerFactory;
