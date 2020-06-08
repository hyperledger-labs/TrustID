/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { QueryHandlerFactory } from './queryhandler';
/**
 * @typedef DefaultQueryHandlerStrategies
 * @memberof module:fabric-network
 * @property {module:fabric-network.QueryHandlerFactory} MSPID_SCOPE_SINGLE Query any one of the event services for the connected organisation. Continue
 * to use the same event service for all queries unless it fails.
 * @property {module:fabric-network.QueryHandlerFactory} MSPID_SCOPE_ROUND_ROBIN Query any one of the event services for the connected organisation.
 * Use the next available peer for each successive query.
 */
export declare const MSPID_SCOPE_SINGLE: QueryHandlerFactory;
export declare const MSPID_SCOPE_ROUND_ROBIN: QueryHandlerFactory;
