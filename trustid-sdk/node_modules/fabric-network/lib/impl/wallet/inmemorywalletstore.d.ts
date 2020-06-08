/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="node" />
import { WalletStore } from './walletstore';
export declare class InMemoryWalletStore implements WalletStore {
    private readonly map;
    remove(label: string): Promise<void>;
    get(label: string): Promise<Buffer | undefined>;
    list(): Promise<string[]>;
    put(label: string, data: Buffer): Promise<void>;
}
