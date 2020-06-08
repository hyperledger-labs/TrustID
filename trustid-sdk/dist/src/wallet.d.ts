import { TrustID } from "./network/trustInterface";
import { Keystore } from "./keystore/keystore";
export declare class DID {
    id: string;
    pubkey: string;
    type: string;
    controller: string;
    access: number;
    private privkey;
    private unlockedKey;
    readonly ALGO_TYPES: string[];
    constructor(type?: any, controller?: string);
    private keyGeneration;
    createKey(passphrase?: string): Promise<void>;
    unlockAccount(passphrase?: string): Promise<void>;
    lockAccount(): any;
    loadFromObject(obj: any): void;
    exportDID(withPrivate: boolean): {
        id: string;
        type: string;
        pubkey: string;
        privkey: string;
        controller: string;
    };
    /** sign Generates a JWS from a payload using an id from the wallet */
    sign(payload: object): Promise<string>;
    /** verify Verifies a JWS from a payload using a did */
    verify(signature: string, did: DID): Promise<any>;
}
/** Class representing Wallets
 *  It follows a Singleton pattern.
 */
export declare class Wallet {
    /** Instance for the wallet */
    private static _instance;
    private keystore;
    /** Drivers to connected blockchains */
    networks: {
        [k: string]: TrustID;
    };
    /** Constructor for the wallet */
    private constructor();
    static get Instance(): Wallet;
    getDID(id: string): Promise<DID>;
    storeDID(did: DID): Promise<boolean>;
    listDID(): string[];
    setDefault(did: DID): boolean;
    storeInMemory(did: DID): boolean;
    /** Set the Keystore to use in the wallet. */
    setKeystore(keystore: Keystore): void;
    /** Set the Keystore to use in the wallet. */
    addNetwork(id: string, network: TrustID): void;
    /** generateDID generates a new DID in the wallet */
    generateDID(type: string, controller?: string, passphrase?: string): Promise<DID>;
}
