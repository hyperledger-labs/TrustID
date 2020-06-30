"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("../../logger");
const commiteventfactory_1 = require("./commiteventfactory");
const logger = Logger.getLogger('CommitListenerSession');
class CommitListenerSession {
    constructor(listener, eventServiceManager, endorsers, transactionId) {
        this.endorsers = {};
        this.eventListeners = [];
        this.listener = listener;
        this.eventServiceManager = eventServiceManager;
        this.eventServices = endorsers.map((endorser) => eventServiceManager.getCommitEventService(endorser));
        this.transactionId = transactionId;
        for (const endorser of endorsers) {
            this.endorsers[endorser.name] = endorser;
        }
    }
    async start() {
        const startErrors = await this.registerTransactionListeners();
        // Notify listeners of errors after all registrations are complete so listeners can remove themselves in response
        for (const error of startErrors) {
            this.listener(error, undefined);
        }
    }
    close() {
        for (const eventListener of this.eventListeners) {
            eventListener.unregisterEventListener();
        }
    }
    async registerTransactionListeners() {
        const startErrors = [];
        for (const eventService of this.eventServices) {
            const error = await this.startEventService(eventService);
            if (error) {
                startErrors.push(error);
            }
            else {
                // Only register listener for event services that start successfully
                const eventListener = this.registerTransactionListener(eventService);
                this.eventListeners.push(eventListener);
            }
        }
        return startErrors;
    }
    async startEventService(eventService) {
        try {
            await this.eventServiceManager.startEventService(eventService);
        }
        catch (error) {
            const commitError = error;
            commitError.peer = this.getEndorserForEventService(eventService);
            return commitError;
        }
    }
    getEndorserForEventService(eventService) {
        return this.endorsers[eventService.name];
    }
    registerTransactionListener(eventService) {
        const peer = this.getEndorserForEventService(eventService);
        const callback = (error, event) => {
            const commitError = error ? Object.assign(error, { peer }) : undefined;
            const commitEvent = event ? commiteventfactory_1.newCommitEvent(peer, event) : undefined;
            this.notifyListener(commitError, commitEvent);
        };
        const registrationOptions = {
            unregister: false
        };
        return eventService.registerTransactionListener(this.transactionId, callback, registrationOptions);
    }
    notifyListener(commitError, commitEvent) {
        try {
            this.listener(commitError, commitEvent);
        }
        catch (error) {
            logger.warn('Error notifying listener:', error);
        }
    }
}
exports.CommitListenerSession = CommitListenerSession;
//# sourceMappingURL=commitlistenersession.js.map