/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
export abstract class Driver {
	protected connection: any;
	constructor() {
		this.connection = {};
	}

	abstract connect(config: object): any;
	abstract disconnect(config: object): void;
	abstract checkConnection(channelName?:string): any;

	abstract callContractTransaction(id: string, fcn: string, args: any, channel?: string): any;
	abstract getContractTransaction(id: string, fcn: string, args: any, channel?: string): any;

	/** Return connection */
	public getConnection(): any {
		return this.connection;
	}
}
