import { Keystore } from './keystore';
import { DID } from '../wallet';
export declare class FileKeystore extends Keystore {
    readonly WALLET_SRCS: string[];
    /** InMemory Keystore representing all the DIDs loaded in the wallet*/
    private dir;
    constructor(type?: string, dir?: string);
    /** SaveKeystore with all the DIDs. Store status of the wallet  */
    saveKeystore(type?: string): void;
    /** LoadKeystore loads the stored status of a wallet */
    loadKeystore(source: string, dir?: string): void;
    /** getKey gets a key from the keystore of the wallet */
    getDID(id?: string): Promise<DID>;
    /** Stores DID in the permanent keystore */
    storeDID(did: DID): Promise<boolean>;
}
