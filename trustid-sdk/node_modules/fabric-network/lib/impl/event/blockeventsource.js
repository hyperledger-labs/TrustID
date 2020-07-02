"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("../../logger");
const GatewayUtils = require("../gatewayutils");
const asyncnotifier_1 = require("./asyncnotifier");
const filteredblockeventfactory_1 = require("./filteredblockeventfactory");
const fullblockeventfactory_1 = require("./fullblockeventfactory");
const orderedblockqueue_1 = require("./orderedblockqueue");
const privateblockeventfactory_1 = require("./privateblockeventfactory");
const Long = require("long");
const logger = Logger.getLogger('BlockEventSource');
const defaultBlockType = 'filtered';
class BlockEventSource {
    constructor(eventServiceManager, options = {}) {
        this.listeners = new Set();
        this.started = false;
        this.eventServiceManager = eventServiceManager;
        this.blockQueue = this.newBlockQueue(options);
        this.asyncNotifier = new asyncnotifier_1.AsyncNotifier(this.blockQueue.getNextBlock.bind(this.blockQueue), this.notifyListeners.bind(this));
        this.blockType = options.type || defaultBlockType;
    }
    async addBlockListener(listener) {
        this.listeners.add(listener);
        await this.start();
        return listener;
    }
    removeBlockListener(listener) {
        this.listeners.delete(listener);
    }
    close() {
        var _a;
        this.unregisterListener();
        (_a = this.eventService) === null || _a === void 0 ? void 0 : _a.close();
        this.started = false;
    }
    newBlockQueue(options) {
        const startBlock = options.startBlock ? Long.fromValue(options.startBlock) : undefined;
        return new orderedblockqueue_1.OrderedBlockQueue(startBlock);
    }
    async start() {
        if (this.started) {
            return;
        }
        this.started = true;
        try {
            this.eventService = this.eventServiceManager.newDefaultEventService();
            this.registerListener(); // Register before start so no events are missed
            await this.startEventService();
        }
        catch (error) {
            logger.error('Failed to start event service', error);
            this.close();
        }
    }
    registerListener() {
        const callback = this.blockEventCallback.bind(this);
        const options = {
            startBlock: this.getNextBlockNumber(),
            unregister: false
        };
        this.eventListener = this.eventService.registerBlockListener(callback, options);
    }
    unregisterListener() {
        var _a;
        try {
            (_a = this.eventListener) === null || _a === void 0 ? void 0 : _a.unregisterEventListener();
        }
        catch (error) {
            logger.warn('Failed to unregister listener', error);
        }
    }
    async startEventService() {
        const options = {
            blockType: this.blockType,
            startBlock: this.getNextBlockNumber()
        };
        await this.eventServiceManager.startEventService(this.eventService, options);
    }
    blockEventCallback(error, event) {
        if (error) {
            this.close();
            setImmediate(() => this.start()); // Must schedule after current event loop to avoid recursion in event service notification
        }
        else {
            this.onBlockEvent(event);
        }
    }
    onBlockEvent(eventInfo) {
        const blockEvent = this.newBlockEvent(eventInfo);
        this.blockQueue.addBlock(blockEvent);
        if (this.blockQueue.size() > 0) {
            this.asyncNotifier.notify();
        }
    }
    newBlockEvent(eventInfo) {
        if (this.blockType === 'filtered') {
            return filteredblockeventfactory_1.newFilteredBlockEvent(eventInfo);
        }
        else if (this.blockType === 'full') {
            return fullblockeventfactory_1.newFullBlockEvent(eventInfo);
        }
        else if (this.blockType === 'private') {
            return privateblockeventfactory_1.newPrivateBlockEvent(eventInfo);
        }
        else {
            throw new Error('Unsupported event type: ' + this.blockType);
        }
    }
    async notifyListeners(event) {
        const promises = Array.from(this.listeners).map((listener) => listener(event));
        const results = await GatewayUtils.allSettled(promises);
        for (const result of results) {
            if (result.status === 'rejected') {
                logger.warn('Error notifying listener', result.reason);
            }
        }
    }
    getNextBlockNumber() {
        return this.blockQueue.getNextBlockNumber();
    }
}
exports.BlockEventSource = BlockEventSource;
//# sourceMappingURL=blockeventsource.js.map