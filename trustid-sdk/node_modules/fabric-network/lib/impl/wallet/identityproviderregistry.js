"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const x509identity_1 = require("./x509identity");
const defaultProviders = [
    new x509identity_1.X509Provider(),
];
function getDefaultProviders() {
    const reducer = (accumulator, provider) => {
        accumulator.set(provider.type, provider);
        return accumulator;
    };
    return defaultProviders.reduce(reducer, new Map());
}
/**
 * Registry of identity providers for use by a wallet.
 * @memberof module:fabric-network
 */
class IdentityProviderRegistry {
    constructor() {
        this.providers = getDefaultProviders();
    }
    /**
     * Get the provider for a given type from the registry. Throws an error if no provider for the type exists.
     * @param {string} type Identity type identifier.
     * @returns {module:fabric-network.IdentityProvider} An identity provider.
     */
    getProvider(type) {
        const provider = this.providers.get(type);
        if (!provider) {
            throw new Error('Unknown identity type: ' + type);
        }
        return provider;
    }
    /**
     * Add a provider to the registry.
     * @param {module:fabric-network.IdentityProvider} provider Identity provider.
     */
    addProvider(provider) {
        this.providers.set(provider.type, provider);
    }
}
exports.IdentityProviderRegistry = IdentityProviderRegistry;
//# sourceMappingURL=identityproviderregistry.js.map