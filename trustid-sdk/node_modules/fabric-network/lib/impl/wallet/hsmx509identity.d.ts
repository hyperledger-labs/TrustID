/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { User } from 'fabric-common';
import { Identity } from './identity';
import { IdentityData } from './identitydata';
import { IdentityProvider } from './identityprovider';
export interface HsmX509Identity extends Identity {
    type: 'HSM-X.509';
    credentials: {
        certificate: string;
    };
}
export interface HsmOptions {
    lib?: string;
    pin?: string;
    slot?: number;
    usertype?: number;
    readwrite?: boolean;
}
/**
 * Identity provider to handle X.509 identities where the private key is stored in a hardware security module.
 * @memberof module:fabric-network
 * @implements module:fabric-network.IdentityProvider
 */
export declare class HsmX509Provider implements IdentityProvider {
    readonly type: string;
    private readonly options;
    /**
     * Create a provider instance.
     * @param {module:fabric-network.HsmOptions} [options={}] Options specifying how to connect to the HSM. Mandatory
     * unless this information is provided through external configuration.
     */
    constructor(options?: HsmOptions);
    fromJson(data: IdentityData): HsmX509Identity;
    toJson(identity: HsmX509Identity): IdentityData;
    getUserContext(identity: HsmX509Identity, name: string): Promise<User>;
}
