/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { BlockEvent } from '../../events';
import Long = require('long');
export declare class OrderedBlockQueue {
    private readonly queue;
    private nextBlockNumber?;
    constructor(startBlock?: Long);
    addBlock(event: BlockEvent): void;
    getNextBlock(): BlockEvent | undefined;
    getNextBlockNumber(): Long.Long | undefined;
    size(): number;
    private isNewBlockNumber;
    private blockNumberToKey;
}
