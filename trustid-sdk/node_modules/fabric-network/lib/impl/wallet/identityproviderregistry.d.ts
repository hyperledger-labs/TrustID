/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { IdentityProvider } from './identityprovider';
/**
 * Registry of identity providers for use by a wallet.
 * @memberof module:fabric-network
 */
export declare class IdentityProviderRegistry {
    private readonly providers;
    /**
     * Get the provider for a given type from the registry. Throws an error if no provider for the type exists.
     * @param {string} type Identity type identifier.
     * @returns {module:fabric-network.IdentityProvider} An identity provider.
     */
    getProvider(type: string): IdentityProvider;
    /**
     * Add a provider to the registry.
     * @param {module:fabric-network.IdentityProvider} provider Identity provider.
     */
    addProvider(provider: IdentityProvider): void;
}
