import { Keystore } from './keystore';
import { DID } from '../wallet';
export declare class MongoKeystore extends Keystore {
    private database;
    private uri;
    constructor(mongoURI: string);
    init(): Promise<void>;
    /** getKey gets a key from the keystore of the wallet */
    getDID(id?: string): Promise<DID>;
    /** Stores DID in the permanent keystore */
    storeDID(did: DID): Promise<boolean>;
}
