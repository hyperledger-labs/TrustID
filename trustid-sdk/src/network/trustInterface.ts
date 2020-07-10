/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { DID } from "../wallet";

export  abstract class  TrustID {

    abstract configureDriver(): Promise<void>;
    abstract disconnectDriver(): Promise<void>;

    abstract createIdentity(did: DID, controller: DID): Promise<object>;
    abstract createSelfIdentity(did: DID): Promise<object>;

    abstract verifyIdentity(adminDID: DID, id:string): Promise<object>;
    abstract getIdentity(did: DID, id: string): Promise<object>;
    abstract revokeIdentity(adminDID: DID, id: string): Promise<object>; 
    abstract createService(did: DID, serviceDID: string, name: string, access: AccessPolicy, channel: string): Promise<object>;
    abstract updateService(did: DID, serviceDID: string, access: AccessPolicy): Promise<object>;
    abstract getService(did: DID, serviceDID: string): Promise<object>;
    abstract invoke (did: DID, serviceDID: string, args: string[], channel: string): Promise<object>;
    abstract query(did: DID, serviceDID: string, args: string[], channel: string): Promise<object>;


}

export enum PolicyType {
    PublicPolicy = "PUBLIC",
    SameControllerPolicy            = "SAME_CONTROLLER",
	FineGrainedPolicy               = "FINE_GRAINED",
}

export interface AccessPolicy {
    policy: PolicyType,
    threshold?: Number,
    registry?: object,
}

