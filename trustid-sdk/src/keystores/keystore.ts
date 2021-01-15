/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { DID } from "../core/did";

export abstract class Keystore {
	/** InMemory Keystore representing all the DIDs loaded in the wallet*/
	protected keystore: { [k: string]: any };

	constructor() {
		this.keystore = {};
	}

	abstract async getDID(id: string): Promise<DID>;
	abstract async storeDID(did: DID): Promise<boolean>;
	abstract async updateDID(did: DID): Promise<boolean>;

	// Store DID in memory
	public storeInMemory(did: DID): boolean {
		this.keystore[did.id] = did;
		return true;
	}

	/** List available keys in the keystore inmemory*/
	public listDID(): string[] {
		return Object.keys(this.keystore);
	}

	/** setDefault sets a DID as the default key for the wallet */
	public setDefault(did: DID): boolean {
		this.keystore["default"] = did;
		return true;
	}

	/** setDefault sets a DID as the default key for the wallet */
	public getDefault(): boolean {
		return this.keystore["default"]
	
	}
}
