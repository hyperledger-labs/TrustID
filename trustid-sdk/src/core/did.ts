/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {
	JWK,
	JWS
} from "node-jose";
import crypto from "crypto-js";
const sss = require('shamirs-secret-sharing');



export class DID {
	public id: string;
	public pubkey: string;
	public type: string;
	public controller: string;
	public access: number;
	private privkey: string;
	private unlockedKey: any;
	public unlockTimestamp: any;
	public tempPrivKey: string;
	public networkID: string;
	public recoveryKey: string;



	// TODO: Default parameters for now:
	// Default: 2048 for RSA, 'P-256' for EC, 'Ed25519' for OKP and 256 for oct.
	readonly ALGO_TYPES = ["RSA", "EC", "oct"];

	public constructor(type: any = "RSA", controller: string = "default") {
		// If type not supported throw error.
		if (!Object.values(this.ALGO_TYPES).includes(type)) {
			throw new Error("Key algorithm not supported");
		}

		this.id = "";
		this.type = type;
		this.controller = controller;
		this.access = 0;
		this.privkey = "";
		this.tempPrivKey = "";
		this.pubkey = "";
		this.unlockedKey = null;
		this.unlockTimestamp = 0;
		this.networkID = "";
		this.recoveryKey = "";

	}

	// TODO: Can we do this more efficiently?
	private async keyGeneration(): Promise < JWK.Key > {
		switch (this.type) {
			case "RSA":
				return JWK.createKey("RSA", 2048, {
					alg: ""
				});
			case "EC":
				return JWK.createKey("EC", "P-521", {
					alg: ""
				});
			case "oct":
				return JWK.createKey("oct", 256, {
					alg: ""
				});
			default:
				throw new Error("Key algorithm not supported");
		}
	}



	public async createKeySSS(shares: number = 1, threshold: number = 1) {
		// Only createKey for DID if not already created.
		if (this.privkey + this.id + this.pubkey === "") {
			let key = await this.keyGeneration();
			let addr = crypto.SHA256(key.toPEM(false)).toString(crypto.enc.Hex);
			this.id = `did:vtn:trustid:${addr}`;
			this.pubkey = key.toPEM();
			let pk = key.toPEM(true);
			const secret = Buffer.from(pk)
			const secrets = sss.split(secret, {
				shares: shares,
				threshold: threshold
			})
			return secrets
		}
	}
	public async createKey(passphrase: string = "") {
		// Only createKey for DID if not already created.

		if (this.privkey + this.id + this.pubkey === "") {
			let key = await this.keyGeneration();
			let addr = crypto.SHA256(key.toPEM(false)).toString(crypto.enc.Hex);
			this.id = `did:vtn:trustid:${addr}`;
			this.pubkey = key.toPEM();
			let pk = key.toPEM(true);
			this.privkey = crypto.AES.encrypt(pk, passphrase).toString();
		}
	}

	public async unlockAccount(passphrase: string = "", tempPassphrase: string = "", timeout: number = 30): Promise < DID > {
		try {
			this.unlockTimestamp = Date.now() + timeout * 1000;
			const pem = crypto.AES.decrypt(this.privkey, passphrase).toString(crypto.enc.Utf8);
			this.unlockedKey = await JWK.asKey(pem, "pem");
			if (tempPassphrase != "") {
				this.tempPrivKey = crypto.AES.encrypt(this.unlockedKey.toPEM(true), tempPassphrase).toString();
			}
			return this
		} catch {
			throw new Error("Private key couldn't be deciphered");
		}
	}
	public async updatePassword(oldPassphrase: string = "", passphrase: string = ""): Promise < DID > {
		try {
			
			const pem = crypto.AES.decrypt(this.privkey, oldPassphrase).toString(crypto.enc.Utf8);
			this.unlockedKey = await JWK.asKey(pem, "pem");
			this.privkey = crypto.AES.encrypt(this.unlockedKey.toPEM(true), passphrase).toString();
			return this
		} catch {
			throw new Error("Private key couldn't be deciphered");
		}
	}


	public async unlockAccountSSS(secrets: string[], timeout: number = 30): Promise < DID > {
		try {
			this.unlockTimestamp = Date.now() + timeout * 1000;
			const pem = sss.combine(secrets).toString();
			this.unlockedKey = await JWK.asKey(pem, "pem");
			return this
		} catch (err) {
			throw new Error(err);
		}
	}




	public async unlockAccountTemp(passphrase: string = "", timeout: number = 60000): Promise < void > {
		try {
			this.unlockTimestamp = Date.now() + timeout * 1000;
			const pem = await crypto.AES.decrypt(this.tempPrivKey, passphrase);
			const parsed = pem.toString(crypto.enc.Utf8);
			this.unlockedKey = await JWK.asKey(parsed, "pem");
			return
		} catch (err) {
			throw err;
		}
	}

	public lockAccount(): any {
		this.unlockedKey = undefined;
	}

	public async generateRecoveryKey(password: string, shares: number = 1, threshold: number = 1): Promise < Buffer[] > {
		try {
			await this.unlockAccount(password);
			const pk = this.unlockedKey.toPEM(true);
			const secret = Buffer.from(pk)
			const newSecrets = sss.split(secret, {
				shares: shares,
				threshold: threshold
			})
			return newSecrets
		} catch (err) {
			throw err;
		}
	}
	public async generateRecoveryKeyTemp(passwordTemp: string, shares: number = 1, threshold: number = 1): Promise < Buffer[] > {
		try {
			await this.unlockAccountTemp(passwordTemp);
			const pk = this.unlockedKey.toPEM(true);
			const secret = Buffer.from(pk)
			const newSecrets = sss.split(secret, {
				shares: shares,
				threshold: threshold
			})
			return newSecrets
		} catch (err) {
			throw err;
		}
	}


	/* el nuevo */
	public async recoverKey(secrets: Buffer[], newPassword: string): Promise < DID > {
		// Only createKey for DID if not already created.
		try {
			const pem = sss.combine(secrets);
			const unlockedKey = await JWK.asKey(pem, "pem");
			this.privkey = crypto.AES.encrypt(unlockedKey.toPEM(true), newPassword).toString();
			return this;
		} catch (err) {
			throw err;
		}
	}
	public loadFromObject(obj: any): void {
		let {
			id,
			type,
			controller,
			access,
			pubkey,
			privkey,
			tempPrivKey,
			unlockTimestamp,
			networkID
		} = obj;
		this.id = id;
		this.type = type;
		this.controller = controller;
		this.access = access;
		this.pubkey = pubkey;
		this.privkey = privkey;
		this.tempPrivKey = tempPrivKey;
		this.unlockTimestamp = unlockTimestamp;
		this.networkID = networkID;
	}

	public exportDID(withPrivate: boolean) {
		const privkey = withPrivate ? this.privkey : "";
		return {
			id: this.id,
			type: this.type,
			pubkey: this.pubkey,
			privkey: privkey,
			controller: this.controller,
		};
	}

	public importDID(obj: any) {
		if (obj.hasOwnProperty('pubkey') && obj.hasOwnProperty('privkey') && obj.hasOwnProperty('type')) {
			const did = new DID();
			did.loadFromObject(obj);
			let addr = crypto.SHA256(obj.pubkey.toString(crypto.enc.Hex));
			this.id = `did:vtn:trustid:${addr}`;

		} else {
			throw new Error("Field pubkey or privkey is missing");
		}

	}

	/** sign Generates a JWS from a payload using an id from the wallet */
	public async sign(payload: object): Promise < string > {
		try {
			if (!this.unlockedKey) {
				throw Error("You must unlock the account before signing the message.");
			}
			var buf = Buffer.from(JSON.stringify(payload));
			let sign = await JWS.createSign({
						fields: {
							cty: "jwk+json"
						},
						format: "compact",
					},
					this.unlockedKey
				)
				.update(buf)
				.final();

			return sign.toString();
		} catch (err) {
			throw err;
		}
	}

	/** verify Verifies a JWS from a payload using a did */
	public async verify(signature: string, did: DID): Promise < any > {
		let pk = await JWK.asKey(did.pubkey, "pem");
		let verify = await JWS.createVerify(pk).verify(signature);
		return JSON.parse(verify.payload.toString());
	}

	public generateRandomKey(): string {
		const words = crypto.lib.WordArray.random(32);
		return words.toString();
	}

	public cipherChunkSSS(password: string, share: Buffer): string {
		// Only createKey for DID if not already created.
		try {
			return crypto.AES.encrypt(share.toString('hex'), password).toString();
		} catch (err) {
			throw err;
		}
	}
	public decipherChunkSSS(password: string, cipheredShare: string): Buffer {
		// Only createKey for DID if not already created.
		try {
			const decipheredShare = crypto.AES.decrypt(cipheredShare, password).toString(crypto.enc.Utf8)
			return Buffer.from(decipheredShare, 'hex');
		} catch (err) {
			throw err;
		}
	}
}