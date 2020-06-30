import { Keystore } from './keystore';
import { DID } from '../wallet';
export declare class LocalStorageKeystore extends Keystore {
    readonly WALLET_SRCS: string[];
    constructor();
    /** getKey gets a key from the keystore of the wallet */
    getDID(id?: string): Promise<DID>;
    /** Stores DID in the permanent keystore */
    storeDID(did: DID): Promise<boolean>;
}
