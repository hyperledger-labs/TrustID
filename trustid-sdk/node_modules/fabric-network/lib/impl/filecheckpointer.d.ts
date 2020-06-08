/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Checkpointer } from '../checkpointer';
import Long = require('long');
export declare class FileCheckpointer implements Checkpointer {
    private readonly path;
    private blockNumber?;
    private transactionIds;
    constructor(path: string);
    init(): Promise<void>;
    addTransactionId(transactionId: string): Promise<void>;
    getBlockNumber(): Promise<Long | undefined>;
    getTransactionIds(): Promise<Set<string>>;
    setBlockNumber(blockNumber: Long): Promise<void>;
    private load;
    private readFile;
    private setState;
    private save;
    private getState;
}
