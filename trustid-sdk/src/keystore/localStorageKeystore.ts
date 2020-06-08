/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { Keystore } from './keystore';
import { DID } from '../wallet'

export class LocalStorageKeystore extends Keystore {

    readonly WALLET_SRCS = [
        "file",
        "empty",
        "localStorage"
    ]

    constructor() {
        super();
    }

    /** getKey gets a key from the keystore of the wallet */
    public async getDID(id: string = "default"): Promise<DID> {
        let did = new DID()
        const value = localStorage.getItem(id)
        if (value) {
            did.loadFromObject(JSON.parse(value))
        } else {
            did = {} as DID
        }

        return did
    }

    /** Stores DID in the permanent keystore */
    public async storeDID(did: DID): Promise<boolean> {
        try {
            localStorage.setItem(did.id, JSON.stringify(did))
            return true
        } catch {
            return false
        }
    }

}