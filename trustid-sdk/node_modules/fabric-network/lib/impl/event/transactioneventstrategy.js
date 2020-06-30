"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("../../logger");
const logger = Logger.getLogger('TransactionEventStrategy');
/**
 * Event handling strategy base class that keeps counts of success and fail events to allow
 * subclasses to implement concrete event handling strategies. On each success or fail event,
 * the checkCompletion() function is called, which must be implemented by
 * subclasses.
 *
 * Instances of the strategy are stateful and must only be used for a single transaction.
 * @private
 * @class
 */
class TransactionEventStrategy {
    /**
     * Constructor.
     * @param {Endorser[]} peers - Peers for which to process events.
     */
    constructor(peers) {
        if (!peers || !Array.isArray(peers) || peers.length < 1) {
            const message = 'No peers for strategy';
            logger.error('constructor:', message);
            throw new Error(message);
        }
        this.peers = peers;
        this.counts = {
            success: 0,
            fail: 0,
            expected: peers.length
        };
    }
    /**
     * Called by event handler to obtain the peers to which it should listen.
     * @returns {Endorser[]} Peers.
     */
    getPeers() {
        return this.peers;
    }
    /**
     * Called when an event is received.
     * @param {Function} successFn Callback function to invoke if this event satisfies the strategy.
     * @param {Function} failFn Callback function to invoke if this event fails the strategy.
     */
    eventReceived(successFn, failFn) {
        this.counts.success++;
        this.checkCompletion(this.counts, successFn, failFn);
    }
    /**
     * Called when an error is received.
     * @param {Function} successFn Callback function to invoke if this error satisfies the strategy.
     * @param {Function} failFn Callback function to invoke if this error fails the strategy.
     */
    errorReceived(successFn, failFn) {
        this.counts.fail++;
        this.checkCompletion(this.counts, successFn, failFn);
    }
}
exports.TransactionEventStrategy = TransactionEventStrategy;
//# sourceMappingURL=transactioneventstrategy.js.map