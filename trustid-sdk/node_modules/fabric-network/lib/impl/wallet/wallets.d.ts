/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Wallet } from './wallet';
import * as nano from 'nano';
/**
 * Factory for creating wallets backed by default store implementations.
 * @memberof module:fabric-network
 */
export declare class Wallets {
    /**
     * Create a wallet backed by an in-memory (non-persistent) store. Each wallet instance created will have its own
     * private in-memory store.
     * @returns {Promise<module:fabric-network.Wallet>} A wallet.
     */
    static newInMemoryWallet(): Promise<Wallet>;
    /**
     * Create a wallet backed by the provided file system directory.
     * @param {string} directory A directory path.
     * @returns {Promise<module:fabric-network.Wallet>} A wallet.
     */
    static newFileSystemWallet(directory: string): Promise<Wallet>;
    /**
     * Create a wallet backed by a CouchDB database.
     * @param {string | nano.Configuration} config URL string or configuration for a CouchDB server.
     * @param {string} [dbName=wallet] Name of a database hosted on the CouchDB server.
     * @returns {Promise<module:fabric-network.Wallet>} A wallet.
     */
    static newCouchDBWallet(config: string | nano.Configuration, dbName?: string): Promise<Wallet>;
}
