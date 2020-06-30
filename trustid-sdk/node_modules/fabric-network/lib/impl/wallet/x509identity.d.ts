/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { User } from 'fabric-common';
import { Identity } from './identity';
import { IdentityData } from './identitydata';
import { IdentityProvider } from './identityprovider';
export interface X509Identity extends Identity {
    type: 'X.509';
    credentials: {
        certificate: string;
        privateKey: string;
    };
}
export declare class X509Provider implements IdentityProvider {
    readonly type: string;
    fromJson(data: IdentityData): X509Identity;
    toJson(identity: X509Identity): IdentityData;
    getUserContext(identity: X509Identity, name: string): Promise<User>;
}
