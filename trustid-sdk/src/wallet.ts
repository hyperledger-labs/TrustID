
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { JWK, JWS } from "node-jose";
import { TrustID } from "./network/trustInterface";

import crypto from 'crypto-js';

import { Keystore } from "./keystore/keystore";
import { FileKeystore } from "./keystore/fileKeystore";

export class DID {
	public id: string;
	public pubkey: string;
	public type: string;
	public controller: string;
	public access: number;
	private privkey: string;
	private unlockedKey: any;
	private unlockTimestamp : any;

	// TODO: Default parameters for now:
	// Default: 2048 for RSA, 'P-256' for EC, 'Ed25519' for OKP and 256 for oct.
	readonly ALGO_TYPES = ["RSA", "EC", "oct"];

	public constructor(
		type: any = "RSA",
		controller: string = "default"
	) {
		// If type not supported throw error.
		if (!Object.values(this.ALGO_TYPES).includes(type)) {
			throw new Error("Key algorithm not supported");
		}

		this.id = ""
		this.type = type;
		this.controller = controller;
		this.access = 0;
		this.privkey = "";
		this.pubkey = "";
		this.unlockedKey = null;
		this.unlockTimestamp = 0;
	}

	// TODO: Can we do this more efficiently?
	private async keyGeneration(): Promise<JWK.Key> {
		switch (this.type) {
			case "RSA":
				return JWK.createKey("RSA", 2048, { alg: "" });
			case "EC":
				return JWK.createKey("EC", "P-521", { alg: "" });
			case "oct":
				return JWK.createKey("oct", 256, { alg: "" });
			default:
				throw new Error("Key algorithm not supported");
		}
	}

	public async createKey(passphrase: string = "") {
		// Only createKey for DID if not already created.
		if (this.privkey + this.id + this.pubkey === "") {
			let key = await this.keyGeneration();
			let addr = crypto.SHA256(key.toPEM(false)).toString(crypto.enc.Hex);
			this.id = `did:vtn:trustid:${addr}`;
			this.pubkey = key.toPEM();
			let pk = key.toPEM(true)
			this.privkey = crypto.AES.encrypt(pk, passphrase).toString();
		}
	}

	public async unlockAccount(passphrase: string = "", timeout: number = 30): Promise<void> {
		try {
			this.unlockTimestamp = Date.now() + timeout*1000
			const pem = crypto.AES.decrypt(this.privkey, passphrase).toString(crypto.enc.Utf8)
			this.unlockedKey = await JWK.asKey(
				pem,
				"pem"
			);
		} catch {
			throw new Error("Private key couldn't be deciphered")
		}

	}

	public lockAccount(): any {
		this.unlockedKey = undefined;
	}

	public loadFromObject(obj: any): void {
		let { id, type, controller, access, pubkey, privkey } = obj;
		this.id = id;
		this.type = type;
		this.controller = controller;
		this.access = access;
		this.pubkey = pubkey;
		this.privkey = privkey;
	}

	public exportDID(withPrivate: boolean) {
		const privkey = withPrivate ? this.privkey : ""
		return {
			id: this.id, 
			type: this.type,
			pubkey: this.pubkey,
			privkey: privkey,
			controller: this.controller
		}
	}


	/** sign Generates a JWS from a payload using an id from the wallet */
	public async sign(payload: object): Promise<string> {

		if (this.unlockTimestamp < Date.now()) {
			this.unlockedKey = null;
		}

		if (!this.unlockedKey) {
			throw Error("You must unlock the account before signing the message.");
		}

		var buf = Buffer.from(JSON.stringify(payload));

		let sign = await JWS.createSign(
			{
				fields: { cty: 'jwk+json' },
				format: 'compact'
			},
			this.unlockedKey)
			.update(buf)
			.final();

		return sign.toString();
	}

	/** verify Verifies a JWS from a payload using a did */
	public async verify(signature: string, did: DID): Promise<any> {
		let pk = await JWK.asKey(did.pubkey, 'pem')
		let verify = await JWS.createVerify(pk).verify(signature);
		return JSON.parse(verify.payload.toString());
	}
}

/** Class representing Wallets
 *  It follows a Singleton pattern.
 */
export class Wallet {
	/** Instance for the wallet */
	private static _instance: Wallet;
	// /** Keystore representing all the DIDs loaded in the wallet*/
	private keystore: Keystore;

	/** Drivers to connected blockchains */
	public networks: { [k: string]: TrustID };
	/** Constructor for the wallet */
	private constructor() {
		this.keystore = new FileKeystore();
		this.networks = {};
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}

	// Functions from specific keystore that will be overloaded
	// in wallet
	public async getDID(id: string): Promise<DID> {
		return this.keystore.getDID(id);
	}
	public async storeDID(did: DID): Promise<boolean> {
		return this.keystore.storeDID(did);
	}
	public listDID(): string[] {
		return this.keystore.listDID();
	}
	public setDefault(did: DID): boolean {
		return this.keystore.setDefault(did);
	}
	public storeInMemory(did: DID): boolean {
		return this.keystore.storeInMemory(did);
	}

	/** Set the Keystore to use in the wallet. */
	public setKeystore(keystore: Keystore): void {
		this.keystore = keystore;
	}

	/** Set the Keystore to use in the wallet. */
	public addNetwork(id: string, network: TrustID): void {
		this.networks[id] = network;
	}

	/** generateDID generates a new DID in the wallet */
	public async generateDID(type: string, controller: string = "default", passphrase: string = ""): Promise<DID> {
		const value: DID = new DID(type, controller);
		await value.createKey(passphrase);
		await this.keystore.storeDID(value);
		
		// If it is the first key assign key as default.
		// if (Object.keys(await this.keystore.getDID("default")).length === 0) {
		// 	this.keystore.setDefault(value);
		// }

		if (Object.keys(await this.keystore.getDID(value.id)).length === 0) {
			this.keystore.storeInMemory(value);
		}

		return value;
	}
}
