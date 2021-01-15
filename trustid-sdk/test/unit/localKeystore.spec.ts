/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {expect} from "chai";
import {Wallet} from "../../src/wallet";
import {LocalStorageKeystore} from "../../src/keystores/localStorageKeystore";

import "mocha";

const wal = Wallet.Instance;

const ks = new LocalStorageKeystore();
wal.setKeystore(ks);

describe("LocalKeystore tests", async () => {
	const did = await wal.generateDID("RSA", "default", "secret");

	it("Creates LocalKeystore", () => {
		expect(ks).to.not.equal({});
	});

   
	it("Store and get localkeystore", async() => {
		const did2 = await wal.generateDID("RSA");
		await ks.storeDID(did2)
		const result = await ks.getDID(did2.id)
		console.log(result.id)
		console.log(did2.id)
		expect(did2.id).to.eql(result.id)
	});

	it("Store and update localkeystore", async () => {
	
		const did2 = await wal.generateDID("RSA");
		await ks.storeDID(did2);
		let res = await ks.getDID(did2.id);	
		res.tempPrivKey ="h23l";
		await ks.updateDID(res);
		 const expectedRes = await ks.getDID(did2.id);
		 expect(expectedRes.tempPrivKey).to.eql(res.tempPrivKey);

	
});
});
