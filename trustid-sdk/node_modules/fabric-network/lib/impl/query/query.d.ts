/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="node" />
import { Query as CommonQuery, Endorser } from 'fabric-common';
export interface QueryResults {
    [peerName: string]: Error | QueryResponse;
}
export interface QueryResponse {
    isEndorsed: boolean;
    payload: Buffer;
    status: number;
    message: string;
}
export interface Query {
    evaluate(peers: Endorser[]): Promise<QueryResults>;
}
/**
 * @private
 */
export declare class QueryImpl implements Query {
    private readonly query;
    private readonly requestTimeout;
    /**
     * Builds a Query instance to send and then work with the results returned
     * by the fabric-common/Query.
     * @param {module:fabric-common.Query} query - The query instance of the proposal
     * @returns {Object} options - options to be used when sending the request to
     * fabric-common service endpoint {Endorser} peer.
     */
    constructor(query: CommonQuery, options?: any);
    /**
     * Sends a signed proposal to the specified peers. The peer endorsment
     * responses are
     * @param {Endorser[]} peers - The peers to query
     * @returns {Object.<String, (QueryResponse | Error)>} Object with peer name keys and associated values that are either
     * QueryResponse objects or Error objects.
     */
    evaluate(peers: Endorser[]): Promise<QueryResults>;
}
