"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const identityproviderregistry_1 = require("./identityproviderregistry");
const encoding = 'utf8';
/**
 * Stores identity information for use when connecting a Gateway. The wallet is backed by a store that handles
 * persistence of identity information. Default implementations using various stores can be obtained using static
 * factory functions on [Wallets]{@link module:fabric-network.Wallets}.
 * @memberof module:fabric-network
 */
class Wallet {
    /**
     * Create a wallet instance backed by a given store. This can be used to create a wallet using your own
     * custom store implementation.
     * @param {module:fabric-network.WalletStore} store Backing store implementation.
     */
    constructor(store) {
        this.providerRegistry = new identityproviderregistry_1.IdentityProviderRegistry();
        this.store = store;
    }
    /**
     * Put an identity in the wallet.
     * @param {string} label Label used to identify the identity within the wallet.
     * @param {module:fabric-network.Identity} identity Identity to store in the wallet.
     * @returns {Promise<void>}
     */
    async put(label, identity) {
        const json = this.providerRegistry.getProvider(identity.type).toJson(identity);
        const jsonString = JSON.stringify(json);
        const buffer = Buffer.from(jsonString, encoding);
        await this.store.put(label, buffer);
    }
    /**
     * Get an identity from the wallet. The actual properties of this identity object will vary depending on its type.
     * @param label Label used to identify the identity within the wallet.
     * @returns {Promise<module:fabric-network.Identity|undefined>} An identity if it exists; otherwise undefined.
     */
    async get(label) {
        const buffer = await this.store.get(label);
        if (!buffer) {
            return undefined;
        }
        const jsonString = buffer.toString(encoding);
        const json = JSON.parse(jsonString);
        return this.providerRegistry.getProvider(json.type).fromJson(json);
    }
    /**
     * Get the labels of all identities in the wallet.
     * @returns {Promise<string[]>} Identity labels.
     */
    async list() {
        return await this.store.list();
    }
    /**
     * Remove an identity from the wallet.
     * @param label Label used to identify the identity within the wallet.
     * @returns {Promise<void>}
     */
    async remove(label) {
        await this.store.remove(label);
    }
    /**
     * Get the identity provider registry for this wallet. All identity types stored in the wallet must have a
     * corresponding provider in the registry.
     * @returns {module:fabric-network.IdentityProviderRegistry} An identity provider registry.
     */
    getProviderRegistry() {
        return this.providerRegistry;
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map