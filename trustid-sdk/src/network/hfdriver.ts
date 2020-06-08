/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {Driver} from "./driver";

const FabricCAServices = require("fabric-ca-client");
const {Gateway, Wallets, DefaultEventHandlerStrategies} = require("fabric-network");

export interface HfConfig {
	stateStore: string;
	caURL: string;
	caName: string;
	caAdmin: string;
	caPassword: string;
	tlsOptions: any;
	mspId: string;
	walletID: string;
	asLocalhost: boolean;
	ccp: any;
}

export class HfDriver extends Driver {
	protected connection: any;
	constructor() {
		super();
		this.connection = {};
	}

	public async callContractTransaction(id: string, fcn: string, args: any, channel?: string | undefined) {
		try {
			const network = await this.connection.getNetwork(channel);
			const contract = await network.getContract(id);
			const result = await contract.submitTransaction(fcn, ...args);
			return result.toString();
		} catch (err) {

			if(err.responses){
				throw new Error(err.responses[0].response.message);
			} else{
				throw err;
			}
			
				
		}
	}

	public async getContractTransaction(id: string, fcn: string, args: any, channel?: string | undefined) {
		try {
			const network = await this.connection.getNetwork(channel);
			const contract = await network.getContract(id);
			const result = await contract.evaluateTransaction(fcn, ...args);
			return result.toString();
		} catch (err) {
			throw err;
		}
	}

	public async connect(config: HfConfig): Promise<any> {
		try {
			this.connection = new Gateway();
			const wallet = await Wallets.newFileSystemWallet(config.stateStore);
			const caService = new FabricCAServices(config.caURL, config.tlsOptions, config.caName);
			const req = {
				enrollmentID: config.caAdmin,
				enrollmentSecret: config.caPassword,
			};
			const enrollment = await caService.enroll(req);

			const identity = {
				credentials: {
					certificate: enrollment.certificate,
					privateKey: enrollment.key.toBytes(),
				},
				mspId: config.mspId,
				type: "X.509",
			};
			await wallet.put(config.walletID, identity);
			await this.connection.connect(config.ccp, {
				wallet: wallet,
				identity: config.walletID,
				discovery: {
					enabled: true,
					asLocalhost: config.asLocalhost,
				},
				eventHandlerOptions: {
					strategy: DefaultEventHandlerStrategies.NETWORK_SCOPE_ANYFORTX,
				},
			});

			return this.connection;
		} catch (err) {
			throw err;
		}
	}
	public async disconnect() {
		this.connection.disconnect();
	}
}
