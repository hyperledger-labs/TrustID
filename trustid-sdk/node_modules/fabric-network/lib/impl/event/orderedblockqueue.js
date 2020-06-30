"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Long = require("long");
class OrderedBlockQueue {
    constructor(startBlock) {
        this.queue = new Map();
        this.nextBlockNumber = startBlock;
    }
    addBlock(event) {
        const blockNumber = event.blockNumber;
        if (!this.isNewBlockNumber(blockNumber)) {
            return;
        }
        const key = this.blockNumberToKey(blockNumber);
        this.queue.set(key, event);
        if (!this.nextBlockNumber) {
            this.nextBlockNumber = blockNumber;
        }
    }
    getNextBlock() {
        if (!this.nextBlockNumber) {
            return;
        }
        const key = this.blockNumberToKey(this.nextBlockNumber);
        const event = this.queue.get(key);
        if (event) {
            this.queue.delete(key);
            this.nextBlockNumber = this.nextBlockNumber.add(Long.ONE);
        }
        return event;
    }
    getNextBlockNumber() {
        return this.nextBlockNumber;
    }
    size() {
        return this.queue.size;
    }
    isNewBlockNumber(blockNumber) {
        return !this.nextBlockNumber || this.nextBlockNumber.lessThanOrEqual(blockNumber);
    }
    blockNumberToKey(blockNumber) {
        return blockNumber.toString();
    }
}
exports.OrderedBlockQueue = OrderedBlockQueue;
//# sourceMappingURL=orderedblockqueue.js.map