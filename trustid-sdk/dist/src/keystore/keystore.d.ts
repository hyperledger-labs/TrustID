import { DID } from "../wallet";
export declare abstract class Keystore {
    /** InMemory Keystore representing all the DIDs loaded in the wallet*/
    protected keystore: {
        [k: string]: any;
    };
    constructor();
    abstract getDID(id: string): Promise<DID>;
    abstract storeDID(did: DID): Promise<boolean>;
    storeInMemory(did: DID): boolean;
    /** List available keys in the keystore inmemory*/
    listDID(): string[];
    /** setDefault sets a DID as the default key for the wallet */
    setDefault(did: DID): boolean;
}
