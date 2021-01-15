/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {Driver} from "./driver";
import * as fs from "fs";
import {EventEmitter} from 'events'
const FabricCAServices = require("fabric-ca-client");
const {Gateway, Wallets, DefaultEventHandlerStrategies} = require("fabric-network");

export interface HfConfig {
	stateStore: string;
	caName: string;
	mspId: string;
	walletID: string;
	asLocalhost: boolean;
	ccp: any;
}

class MyEmitter extends EventEmitter {}
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
			//Get CA config from CCP
			
			const caURL = config.ccp.certificateAuthorities[config.caName].url
			const tlsOptions = {
				trustedRoots: fs.readFileSync(config.ccp.certificateAuthorities[config.caName].tlsCACerts.path,'utf8'),
				verify: false
			}
			this.connection = new Gateway();
		
			const wallet = await Wallets.newFileSystemWallet(config.stateStore);
			const caService = new FabricCAServices(caURL, tlsOptions, config.caName);
			const req = {
				enrollmentID: config.ccp.certificateAuthorities[config.caName].registrar.enrollId,
				enrollmentSecret:  config.ccp.certificateAuthorities[config.caName].registrar.enrollSecret,
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
					endorseTimeout: 90,
                	commitTimeout: 300,
					strategy: DefaultEventHandlerStrategies.NETWORK_SCOPE_ANYFORTX,
				},
			});
			return this.connection;
		} catch (err) {
			throw err;
		}
	}

	public async subscribeEvent(id: string,  serviceDID: string,eventName: string, channel: string){
	const network = await this.connection.getNetwork(channel);
	const contract = await network.getContract(id);
	const myEmmiter = new MyEmitter();

		const listener = async(event: any) => {

			if (event.eventName === eventName) {
				const details = event.payload.toString('utf8');
				const eventResult = JSON.parse(details)
				if(eventResult.did === serviceDID){
					myEmmiter.emit(eventName, eventResult)
				}

			}
		};
		await contract.addContractListener(listener, {})
		return myEmmiter
	}
	public async checkConnection(channelName: string) {
		try{
			const result= await this.connection.getNetwork(channelName);
			return true;
		} catch(err){
			return false;
		}
	}
	public async disconnect() {
		this.connection.disconnect();
	}


}
