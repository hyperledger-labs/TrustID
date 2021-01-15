/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { Keystore } from './keystore';
import { DID } from '../core/did'

import fs from 'fs';

export class FileKeystore extends Keystore {

    readonly WALLET_SRCS = [
        "file",
        "empty",
        "localStorage"
    ]

    /** InMemory Keystore representing all the DIDs loaded in the wallet*/
    private dir: string;

    constructor(type = "file", dir: string = './keystore/keystore') {
        super();
        // Reset keystore from file if existing.
        this.loadKeystore(type, dir);
        this.dir = dir;
    }


    /** SaveKeystore with all the DIDs. Store status of the wallet  */
    public saveKeystore(type: string="file"): void {
        switch (type) {
            case "file": {
                fs.writeFileSync(this.dir, JSON.stringify(this.keystore), 'utf8')
                break;
            }
            case "localStorage": {
                localStorage.setItem('keystore', JSON.stringify(this.keystore));
                break;
            }
            default: {
                throw new Error("Storage type not implemented.")
            }

        }
    }

    /** LoadKeystore loads the stored status of a wallet */
    public loadKeystore(source: string, dir: string = ""): void {
        // If type not supported throw error.
        if (!Object.values(this.WALLET_SRCS).includes(source)) {
            throw new Error("Wallet source to initialize not valid!");
        }
        switch (source) {
            case "file": {
                let auxKs
                try{
                    let val = fs.readFileSync(dir, 'utf8');
                    auxKs = JSON.parse(val);
                } catch {
                    auxKs = {}
                }

                for (let k in auxKs) {
                    let emptyDID: DID = new DID("RSA", undefined);
                    emptyDID.loadFromObject(auxKs[k]);
                    auxKs[k] = emptyDID;
                }
                this.keystore = auxKs;
                break;
            }
            case "localStorage": {
                let val = localStorage.getItem('keystore');
                this.keystore = JSON.parse(val || "");
                break;
            }
            default: {
                throw new Error("Storage type not implemented.")
            }

        }
    }

    /** getKey gets a key from the keystore of the wallet */
    public async getDID(id: string = "default"): Promise<DID> {
        // We only get from inMemory keystore for performance purposes.

        if (!(this.keystore.hasOwnProperty(id))) {
            // throw new Error("This DID does not exist in the keystore.");
            return {} as DID
        }

        return this.keystore[id];
    }

    /** Stores DID in the permanent keystore */
    public async storeDID(did: DID): Promise<boolean> {
        // Check if did already in keystore and save keystore.
        // If not add DID and save keystore.
        try {
            if (this.keystore[did.id] == undefined) {
                // Add in inmemory storage
                this.keystore[did.id] = did;
            }

            this.saveKeystore();
            return true;
        } catch {
            return false;
        }
    }
   // TO DO
    public async updateDID(did: DID): Promise<boolean> {
        try{
            this.keystore[did.id] = did;
            this.saveKeystore();
        } catch {
            throw false;
        }

        return true
    }





}