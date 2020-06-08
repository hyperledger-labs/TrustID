import { TrustID, Access } from "./trustInterface";
import { HfDriver } from "./hfdriver";
import { DID } from "../wallet";
export interface Config {
    fcn: string;
    channel: string;
    chaincodeName: string;
    stateStore: string;
    caURL: string;
    caName: string;
    caAdmin: string;
    caPassword: string;
    tlsOptions: any;
    mspId: string;
    walletID: string;
    asLocalhost: boolean;
    ccp: any;
}
export declare class TrustIdHf extends TrustID {
    config: Config;
    driver: HfDriver;
    constructor(config: Config);
    configureDriver(): Promise<void>;
    disconnectDriver(): Promise<void>;
    /** createIdentity registers a new unverified identity */
    createIdentity(did: DID): Promise<Object>;
    /** VerifyIdentity allow admins to verify user identityes */
    verifyIdentity(adminDID: DID, id: string): Promise<object>;
    /** Revoke allow admins to revoke user identityes */
    revokeIdentity(adminDID: DID, id: string): Promise<object>;
    /** GetIdentity gets a new identity */
    getIdentity(did: DID, id: string): Promise<object>;
    /** Registers new service in the platform */
    createService(did: DID, serviceDID: string, name: string, isPublic?: boolean): Promise<object>;
    /** Updates accesses for a service */
    updateService(did: DID, serviceDID: string, access: Access, isPublic?: boolean): Promise<object>;
    /** Gets information from a service */
    getService(did: DID, serviceDID: string): Promise<object>;
    /** Invokes a chaincode through the proxy */
    invoke(did: DID, serviceDID: string, args: string[], channel: string): Promise<object>;
    /** Invokes a chaincode through the proxy */
    query(did: DID, serviceDID: string, args: string[], channel: string): Promise<object>;
}
