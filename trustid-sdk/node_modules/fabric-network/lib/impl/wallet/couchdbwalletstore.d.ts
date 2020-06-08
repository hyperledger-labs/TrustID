/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="node" />
import nano = require('nano');
import { WalletStore } from './walletstore';
export declare class CouchDBWalletStore implements WalletStore {
    static newInstance(config: string | nano.Configuration, dbName: string): Promise<CouchDBWalletStore>;
    private readonly db;
    private constructor();
    remove(label: string): Promise<void>;
    get(label: string): Promise<Buffer | undefined>;
    list(): Promise<string[]>;
    put(label: string, data: Buffer): Promise<void>;
    private getDocument;
}
