/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListenerSession } from './listenersession';
import { CommitListener } from '../../events';
import { EventServiceManager } from './eventservicemanager';
import { Endorser } from 'fabric-common';
export declare class CommitListenerSession implements ListenerSession {
    private readonly listener;
    private readonly eventServiceManager;
    private readonly eventServices;
    private readonly transactionId;
    private readonly endorsers;
    private eventListeners;
    constructor(listener: CommitListener, eventServiceManager: EventServiceManager, endorsers: Endorser[], transactionId: string);
    start(): Promise<void>;
    close(): void;
    private registerTransactionListeners;
    private startEventService;
    private getEndorserForEventService;
    private registerTransactionListener;
    private notifyListener;
}
