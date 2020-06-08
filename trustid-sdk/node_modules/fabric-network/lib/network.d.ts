/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import Contract = require('./contract');
import { Channel, Endorser } from 'fabric-common';
import { BlockListener, CommitListener, ListenerOptions } from './events';
import { QueryHandlerFactory } from './impl/query/queryhandler';
import Gateway = require('./gateway');
export interface Network {
    getGateway(): Gateway;
    getContract(chaincodeId: string, name?: string): Contract;
    getChannel(): Channel;
    addCommitListener(listener: CommitListener, peers: Endorser[], transactionId: string): Promise<CommitListener>;
    removeCommitListener(listener: CommitListener): void;
    addBlockListener(listener: BlockListener, options?: ListenerOptions): Promise<BlockListener>;
    removeBlockListener(listener: BlockListener): void;
}
export declare class NetworkImpl implements Network {
    queryHandler?: QueryHandlerFactory;
    private readonly gateway;
    private readonly channel;
    private readonly contracts;
    private initialized;
    private discoveryService?;
    private eventServiceManager;
    private readonly commitListeners;
    private readonly blockListeners;
    private readonly realtimeFilteredBlockEventSource;
    private readonly realtimeFullBlockEventSource;
    private readonly realtimePrivateBlockEventSource;
    constructor(gateway: Gateway, channel: Channel);
    /**
     * initialize the channel if it hasn't been done
     * @private
     */
    _initializeInternalChannel(options: any): Promise<void>;
    /**
     * Initialize this network instance
     * @private
     */
    _initialize(discover: any): Promise<void>;
    getGateway(): any;
    getContract(chaincodeId: string, name?: string): any;
    getChannel(): Channel;
    _dispose(): void;
    addCommitListener(listener: CommitListener, peers: Endorser[], transactionId: string): Promise<CommitListener>;
    removeCommitListener(listener: CommitListener): void;
    addBlockListener(listener: BlockListener, options?: ListenerOptions): Promise<BlockListener>;
    removeBlockListener(listener: BlockListener): void;
    private newBlockListenerSession;
    private newIsolatedBlockListenerSession;
    private newSharedBlockListenerSession;
}
