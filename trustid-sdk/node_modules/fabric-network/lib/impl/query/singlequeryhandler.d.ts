/**
 * Copyright 2018, 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="node" />
import { QueryHandler } from './queryhandler';
import { Query } from './query';
import { Endorser } from 'fabric-common';
export declare class SingleQueryHandler implements QueryHandler {
    private readonly peers;
    private currentPeerIndex;
    constructor(peers: Endorser[]);
    evaluate(query: Query): Promise<Buffer>;
}
