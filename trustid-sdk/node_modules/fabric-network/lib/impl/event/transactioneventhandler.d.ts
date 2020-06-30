/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { TransactionEventStrategy } from './transactioneventstrategy';
import { Network } from '../../network';
export interface TxEventHandler {
    startListening(): Promise<void>;
    waitForEvents(): Promise<void>;
    cancelListening(): void;
}
export declare type TxEventHandlerFactory = (transactionId: string, network: Network) => TxEventHandler;
/**
 * Handles events for a given transaction. Used to wait for a submitted transaction to be successfully commited to
 * the ledger.
 * Delegates to an event strategy to decide whether events or errors received should be interpreted as success or
 * failure of a transaction.
 * @private
 */
export declare class TransactionEventHandler implements TxEventHandler {
    /**
     * @typedef {Object} TransactionOptions
     * @property {Number} [commitTimeout = 0] Number of seconds to wait for transaction completion. A value of zero
     * indicates that the handler should wait indefinitely.
     */
    private readonly transactionId;
    private readonly network;
    private readonly strategy;
    private readonly options;
    private readonly peers;
    private readonly notificationPromise;
    private readonly unrespondedPeers;
    private readonly listener;
    private readonly strategySuccessCallback;
    private readonly strategyFailCallback;
    private resolveNotificationPromise;
    private rejectNotificationPromise;
    private timeoutHandler?;
    /**
     * Constructor.
     * @private
     * @param {Transaction} transaction - Transaction object.
     * @param {Object} strategy - Event strategy implementation.
     * @param {TransactionOptions} [options] Additional options.
     */
    constructor(transactionId: string, network: Network, strategy: TransactionEventStrategy);
    /**
     * Called to initiate listening for transaction events.
     */
    startListening(): Promise<void>;
    /**
     * Wait until enough events have been received from the event services to satisfy the event handling strategy.
     * @throws {Error} if the transaction commit is not successful within the timeout period.
     */
    waitForEvents(): Promise<void>;
    /**
     * Cancel listening for events.
     */
    cancelListening(): void;
    private eventCallback;
    private setListenTimeout;
    private timeoutFail;
    /**
     * Callback for the strategy to indicate successful commit of the transaction.
     * @private
     */
    private strategySuccess;
    /**
     * Callback for the strategy to indicate failure of the transaction commit.
     * @private
     * @param {Error} error Reason for failure.
     */
    private strategyFail;
}
