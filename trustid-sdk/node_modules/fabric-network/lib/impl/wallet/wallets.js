"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const couchdbwalletstore_1 = require("./couchdbwalletstore");
const filesystemwalletstore_1 = require("./filesystemwalletstore");
const inmemorywalletstore_1 = require("./inmemorywalletstore");
const wallet_1 = require("./wallet");
/**
 * Factory for creating wallets backed by default store implementations.
 * @memberof module:fabric-network
 */
class Wallets {
    /**
     * Create a wallet backed by an in-memory (non-persistent) store. Each wallet instance created will have its own
     * private in-memory store.
     * @returns {Promise<module:fabric-network.Wallet>} A wallet.
     */
    static async newInMemoryWallet() {
        const store = new inmemorywalletstore_1.InMemoryWalletStore();
        return new wallet_1.Wallet(store);
    }
    /**
     * Create a wallet backed by the provided file system directory.
     * @param {string} directory A directory path.
     * @returns {Promise<module:fabric-network.Wallet>} A wallet.
     */
    static async newFileSystemWallet(directory) {
        const store = await filesystemwalletstore_1.FileSystemWalletStore.newInstance(directory);
        return new wallet_1.Wallet(store);
    }
    /**
     * Create a wallet backed by a CouchDB database.
     * @param {string | nano.Configuration} config URL string or configuration for a CouchDB server.
     * @param {string} [dbName=wallet] Name of a database hosted on the CouchDB server.
     * @returns {Promise<module:fabric-network.Wallet>} A wallet.
     */
    static async newCouchDBWallet(config, dbName = 'wallet') {
        const store = await couchdbwalletstore_1.CouchDBWalletStore.newInstance(config, dbName);
        return new wallet_1.Wallet(store);
    }
}
exports.Wallets = Wallets;
//# sourceMappingURL=wallets.js.map