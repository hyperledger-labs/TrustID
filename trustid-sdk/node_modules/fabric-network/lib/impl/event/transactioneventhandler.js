"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const timeouterror_1 = require("../../errors/timeouterror");
const Logger = require("../../logger");
const logger = Logger.getLogger('TransactionEventHandler');
/**
 * Handles events for a given transaction. Used to wait for a submitted transaction to be successfully commited to
 * the ledger.
 * Delegates to an event strategy to decide whether events or errors received should be interpreted as success or
 * failure of a transaction.
 * @private
 */
class TransactionEventHandler {
    /**
     * Constructor.
     * @private
     * @param {Transaction} transaction - Transaction object.
     * @param {Object} strategy - Event strategy implementation.
     * @param {TransactionOptions} [options] Additional options.
     */
    constructor(transactionId, network, strategy) {
        this.listener = this.eventCallback.bind(this);
        this.strategySuccessCallback = this.strategySuccess.bind(this);
        this.strategyFailCallback = this.strategyFail.bind(this);
        const method = 'constructor';
        this.transactionId = transactionId;
        this.network = network;
        this.strategy = strategy;
        const defaultOptions = {
            commitTimeout: 30
        };
        this.options = Object.assign(defaultOptions, network.getGateway().getOptions().eventHandlerOptions);
        logger.debug('%s: transactionId = %s, options = %j', method, this.transactionId, this.options);
        this.peers = strategy.getPeers();
        this.unrespondedPeers = new Set(this.peers);
        this.notificationPromise = new Promise((resolve, reject) => {
            this.resolveNotificationPromise = resolve;
            this.rejectNotificationPromise = reject;
        });
    }
    /**
     * Called to initiate listening for transaction events.
     */
    async startListening() {
        const method = 'startListening';
        if (this.peers && this.peers.length > 0) {
            logger.debug('%s - have eventService list - start monitoring', method);
            this.setListenTimeout();
            await this.network.addCommitListener(this.listener, this.peers, this.transactionId);
        }
        else {
            logger.error('%s - No event services', method);
            // shutdown the monitoring
            this.resolveNotificationPromise();
        }
    }
    /**
     * Wait until enough events have been received from the event services to satisfy the event handling strategy.
     * @throws {Error} if the transaction commit is not successful within the timeout period.
     */
    async waitForEvents() {
        logger.debug('waitForEvents start');
        await this.notificationPromise;
        logger.debug('waitForEvents end');
    }
    /**
     * Cancel listening for events.
     */
    cancelListening() {
        logger.debug('cancelListening called');
        if (this.timeoutHandler) {
            clearTimeout(this.timeoutHandler);
        }
        this.network.removeCommitListener(this.listener);
    }
    eventCallback(error, event) {
        if (event && !event.isValid) {
            const message = `Commit of transaction ${this.transactionId} failed on peer ${event.peer.name} with status ${event.status}`;
            this.strategyFail(new Error(message));
        }
        const peer = (error === null || error === void 0 ? void 0 : error.peer) || event.peer;
        if (!this.unrespondedPeers.delete(peer)) {
            // Already seen a response from this peer
            return;
        }
        if (error) {
            this.strategy.errorReceived(this.strategySuccessCallback, this.strategyFailCallback);
        }
        else {
            this.strategy.eventReceived(this.strategySuccessCallback, this.strategyFailCallback);
        }
    }
    setListenTimeout() {
        const method = 'setListenTimeout';
        if (typeof this.options.commitTimeout !== 'number' || this.options.commitTimeout <= 0) {
            logger.debug('%s - no commit timeout', method);
            return;
        }
        logger.debug('%s setTimeout(%s) in seconds for transaction %s', method, this.options.commitTimeout, this.transactionId);
        this.timeoutHandler = setTimeout(() => {
            this.timeoutFail();
            logger.error('%s - event handler timed out', method);
        }, this.options.commitTimeout * 1000);
        logger.debug('%s - end', method);
    }
    timeoutFail() {
        const unrespondedPeerNames = Array.from(this.unrespondedPeers)
            .map((peer) => peer.name)
            .join(', ');
        const errorInfo = {
            message: 'Event strategy not satisfied within the timeout period. No response received from peers: ' + unrespondedPeerNames,
            transactionId: this.transactionId
        };
        const error = new timeouterror_1.TimeoutError(errorInfo);
        this.strategyFail(error);
    }
    /**
     * Callback for the strategy to indicate successful commit of the transaction.
     * @private
     */
    strategySuccess() {
        logger.debug('strategySuccess: commit success for transaction %j', this.transactionId);
        this.cancelListening();
        this.resolveNotificationPromise();
    }
    /**
     * Callback for the strategy to indicate failure of the transaction commit.
     * @private
     * @param {Error} error Reason for failure.
     */
    strategyFail(error) {
        logger.warn('strategyFail: commit failure for transaction %j: %s', this.transactionId, error);
        this.cancelListening();
        this.rejectNotificationPromise(error);
    }
}
exports.TransactionEventHandler = TransactionEventHandler;
//# sourceMappingURL=transactioneventhandler.js.map