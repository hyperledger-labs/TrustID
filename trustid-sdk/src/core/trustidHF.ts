/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {TrustID, AccessPolicy} from "./trustid";
import {HfDriver} from "../drivers/hfdriver";
import {DID} from "./did";

export interface Config {
	fcn: string;
	channel: string;
	chaincodeName: string;
	stateStore: string;
	caName: string;
	mspId: string;
	walletID: string;
	asLocalhost: boolean;
	ccp: any;
}

export class TrustIdHf extends TrustID {
	public config: Config;
	public driver: HfDriver;

	constructor(config: Config) {
		super();
		this.config = config;
		this.driver = new HfDriver();
	}

	async configureDriver(): Promise<void> {
		const cfg = {
			stateStore: this.config.stateStore,
			caName: this.config.caName,
			mspId: this.config.mspId,
			walletID: this.config.walletID,
			asLocalhost: this.config.asLocalhost,
			ccp: this.config.ccp,
		};

		await this.driver.connect(cfg);
	}
	async disconnectDriver(): Promise<void> {
		await this.driver.disconnect();
	}
	/** createIdentity registers a new unverified identity */
	public async createSelfIdentity(did: DID): Promise<any> {
		const args = [
			JSON.stringify({
				publicKey: did.pubkey,
				payload: await did.sign({
					function: "createSelfIdentity",
					params: {
						did: did.id,
						publicKey: did.pubkey,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);
		return res;
	}
	/** createIdentity registers a new unverified identity */
	public async createIdentity(did: DID, controller: DID): Promise<any> {
		const args = [
			JSON.stringify({
				did: controller.id,
				payload: await controller.sign({
					function: "createIdentity",
					params: {
						did: did.id,
						publicKey: did.pubkey,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);
		return res;
	}

		/** createIdentity registers a new unverified identity */
		public async importIdentity(did: DID): Promise<any> {
			const args = [
				JSON.stringify({
					did: did.id,
					payload: await did.sign({
						function: "createSelfIdentity",
						params: {
							did: did.id,
							publicKey: did.pubkey,
						},
					}),
				}),
			];
			let res: any = await this.driver.callContractTransaction(
				this.config.chaincodeName,
				this.config.fcn,
				args,
				this.config.channel
			);
			return res;
		}

		/** createIdentity registers a new unverified identity */
		public async importSignedIdentity(publicKey: string, payload: string): Promise<any> {
			const args = [ JSON.stringify({
				publicKey: publicKey,
				payload: payload
				}),
			];
			let res: any = await this.driver.callContractTransaction(
				this.config.chaincodeName,
				this.config.fcn,
				args,
				this.config.channel
			);
			return res;
		}
	/** VerifyIdentity allow admins to verify user identityes */
	public async verifyIdentity(adminDID: DID, id: string): Promise<any> {
		const args = [
			JSON.stringify({
				did: adminDID.id,
				payload: await adminDID.sign({
					function: "verifyIdentity",
					params: {
						did: id,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);

		return res;
	}

	/** Revoke allow admins to revoke user identityes */
	public async revokeIdentity(adminDID: DID, id: string): Promise<any> {
		const args = [
			JSON.stringify({
				did: adminDID.id,
				payload: await adminDID.sign({
					function: "revokeIdentity",
					params: {
						did: id,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);

		return res;
	}

	/** GetIdentity gets a new identity */
	public async getIdentity(did: DID, id: string): Promise<any> {
		const args = [
			JSON.stringify({
				did: did.id,
				payload: await did.sign({
					function: "getIdentity",
					params: {
						did: id,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);
		return res;
	}

	/** Registers new service in the platform */
	public async createService(did: DID, serviceDID: string, name: string, accessPolicy: AccessPolicy, channel: string): Promise<any> {
		const args = [
			JSON.stringify({
				did: did.id,
				payload: await did.sign({
					function: "createServiceIdentity",
					params: {
						did: serviceDID,
						name: name,
						channel: channel,
						accessPolicy: accessPolicy,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);
		return res;
	}

	/** Updates accesses for a service */
	public async updateService(
		did: DID,
		serviceDID: string,
		name: string,
		channel: string
	): Promise<any> {
		const args = [
			JSON.stringify({
				did: did.id,
				payload: await did.sign({
					function: "updateService",
					params: {
						did: serviceDID,
						name: name,
						channel: channel,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);
		return res;
	}
	public async updateServiceAccess(
		did: DID,
		serviceDID: string,
		access: AccessPolicy
	): Promise<any> {
		const args = [
			JSON.stringify({
				did: did.id,
				payload: await did.sign({
					function: "updateServiceAccess",
					params: {
						did: serviceDID,
						access: access,
					},
				}),
			}),
		];
		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);
		return res;
	}

	/** Gets information from a service */
	public async getService(did: DID, serviceDID: string): Promise<any> {
		const args = [
			JSON.stringify({
				did: did.id,
				payload: await did.sign({
					function: "getServiceIdentity",
					params: {
						did: serviceDID,
					},
				}),
			}),
		];

		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			args,
			this.config.channel
		);
		return JSON.parse(res);
	}

	/** Invokes a chaincode through the proxy */
	public async invoke(did: DID, serviceDID: string, args: string[], channel: string): Promise<any> {
		const argsCall = [
			JSON.stringify({
				did: did.id,
				payload: await did.sign({
					function: "invoke",
					params: {
						did: serviceDID,
						args: args,
						channel: channel,
					},
				}),
			}),
		];

		let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			argsCall,
			this.config.channel
		);
		return res;
	}

	public async invokeSigned(did: string, payload: string): Promise<any> {
		const argsCall = [ JSON.stringify({
			did: did,
			payload: payload
		}),
		];
			let res: any = await this.driver.callContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			argsCall,
			this.config.channel
		);
		return res;
	}

	/** Invokes a chaincode through the proxy */
	public async query(did: DID, serviceDID: string, args: string[], channel: string): Promise<any> {
		const argsCall = [
			JSON.stringify({
				did: did.id,
				payload: await did.sign({
					function: "invoke",
					params: {
						did: serviceDID,
						args: args,
						channel: channel,
					},
				}),
			}),
		];

		let res: any = await this.driver.getContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			argsCall,
			this.config.channel
		);
		return res;
	}

	public async querySigned(did: string, payload: string): Promise<any> {
		const argsCall = [ JSON.stringify({
			did: did,
			payload: payload
		}),
		];
			let res: any = await this.driver.getContractTransaction(
			this.config.chaincodeName,
			this.config.fcn,
			argsCall,
			this.config.channel
		);
		return res;
	}
	/** Subscribe Event Service */
	public async subscribeEventService(did: DID, serviceDID: string, eventName: string): Promise<any> {
	
		const eventEmitter  = await this.driver.subscribeEvent(this.config.chaincodeName, serviceDID, eventName, this.config.channel);
		return eventEmitter;

	}

	public async checkConnection(): Promise<boolean> {
	
		const connection  = await this.driver.checkConnection(this.config.channel);
	
		return connection;

	}

}

	