/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Identity } from './identity';
import { IdentityProviderRegistry } from './identityproviderregistry';
import { WalletStore } from './walletstore';
/**
 * Stores identity information for use when connecting a Gateway. The wallet is backed by a store that handles
 * persistence of identity information. Default implementations using various stores can be obtained using static
 * factory functions on [Wallets]{@link module:fabric-network.Wallets}.
 * @memberof module:fabric-network
 */
export declare class Wallet {
    private readonly providerRegistry;
    private readonly store;
    /**
     * Create a wallet instance backed by a given store. This can be used to create a wallet using your own
     * custom store implementation.
     * @param {module:fabric-network.WalletStore} store Backing store implementation.
     */
    constructor(store: WalletStore);
    /**
     * Put an identity in the wallet.
     * @param {string} label Label used to identify the identity within the wallet.
     * @param {module:fabric-network.Identity} identity Identity to store in the wallet.
     * @returns {Promise<void>}
     */
    put(label: string, identity: Identity): Promise<void>;
    /**
     * Get an identity from the wallet. The actual properties of this identity object will vary depending on its type.
     * @param label Label used to identify the identity within the wallet.
     * @returns {Promise<module:fabric-network.Identity|undefined>} An identity if it exists; otherwise undefined.
     */
    get(label: string): Promise<Identity | undefined>;
    /**
     * Get the labels of all identities in the wallet.
     * @returns {Promise<string[]>} Identity labels.
     */
    list(): Promise<string[]>;
    /**
     * Remove an identity from the wallet.
     * @param label Label used to identify the identity within the wallet.
     * @returns {Promise<void>}
     */
    remove(label: string): Promise<void>;
    /**
     * Get the identity provider registry for this wallet. All identity types stored in the wallet must have a
     * corresponding provider in the registry.
     * @returns {module:fabric-network.IdentityProviderRegistry} An identity provider registry.
     */
    getProviderRegistry(): IdentityProviderRegistry;
}
