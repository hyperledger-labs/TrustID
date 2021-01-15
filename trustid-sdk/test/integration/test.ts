/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {Wallet} from "../../src/wallet";
import {AccessPolicy, PolicyType} from "../../src/core/trustid";
import {expect} from "chai";

import {TrustIdHf} from "../../src/core/trustidHF";
const path = require("path");
const fs = require("fs");
const ccpPath = path.resolve(__dirname, "..", "..", "..", "config", "connection-profile.json");

const adminPriv = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7Th71Us2fUkeB
g0gxGtRDgkeEefTBnE8IP2Rw/PrdIwGJicK1EzbikrzqABpO4zgPxXYuOsDp28Fb
AE5/a4X/iKshFcw5ojny61cQKwDSvoLDZKkJhJXwErXLyGmezDTb9PTFhENsWp+G
+pywEnbgsjoXi0Khs+h6ASlsJNagsy4wRPdZkUvKZhKIbjY2ZtxnQpMaTBPOIvKU
vbafnABlOV+6+4FANFsr9L181bNeOiaEmaqzJCajZgBHQUDVpefs96qj/S0J+0mT
wmNajN0+DedN4Z6Xl/E25XuuaU3brEFTqnTE2DXa3P7iCCsR6r313OCR8/4pCliX
NlUEs12ZAgMBAAECggEAZ/0SQP9Mu5RxsJzTWrfbevN8gzc2RLtkQV74g6ZgHJ/P
va1nFSLqyNXQ3lVaRcvulwr49ueVrQBdlAlSi3mFtn4JDGBOtvyzEYPJHWfSmC4+
6P4cvvUGTXgFyHKm+QvEmQ2hS3uH90NE6CqBDVvi9hLdH68oOiBpBDta5Ph61FJS
OcaVQ20jEldMkz6bYv9pOYl6hunJnYB+ZYKcq25SkTEERwKQueDtzwB8ulsazbuw
n8CraL2ncN7cAOlfcVYUica1LnP74roEK+zIUFFsjTxC9xMS47GwWkFls1VLEDb1
tKUxJLnYJJy/18b+gpFDztr3BZFgiUpO1QUaY9aPgQKBgQDwBNm9usvfB/w76z0A
U5JNfC1Pk3MpxRBKOM84s3HCUiu7KbCnLmOKTmORAcsbO0H+uU5xMYcsUdIgQF2C
9SAGcKize12xqcsutoQPiEisEi387rsk1iQ8jJ03fQY6SNBe+fZta3JXuVogeiRd
zz0YfZ7OBh2MkwEDpNjUAeXiaQKBgQDHxsIPvFGq0cbzmuIYQsQJV71y3H4iPGRI
DVkTs6Vc9VDMAN5GtRB1HkfpQtVBFwpDZIhvfySmLhnGi2vs6fKFwo9SpRmxSypZ
rkzs1/0Gc7ZRbHRwt1n326s2Sry+6+0AxOxsM6+OJNqfugN9RAfg8zeJeEEJTYTU
3ty+pULbsQKBgQDPl7JoGib4mSR9AqH5JU8Vu4BJIkPp7aqAN5Bq/zE2G/H86DsE
7edkGRaetYlg3SjgUo/Y8ThzibUO9fyrJq3zQ/91dQ79edjlZzDjakFIqlSiPi0Y
2CnxQME92+HGCXJHozSTQOpdm0+rZVkM1hCGnSf8E2f9TKwE5dAv1hBpeQKBgQC/
pL7DQ5+AY68cP+dG6L2QTNgTWMuzYgW9TPi3uq0WiMqSeP7CC64W/A52CUP0JfsV
fVqYwvpQZIcbfOHyqtaZVHQTDwifmICu+VMYHXa/+r7aS1VET8+BwvvyoC2CZWa9
RyuZ/NcbX+VONq5kO5/nPsp3GKIjH3cekhBm3rhNcQKBgBlCEJfRyslFjv90wI5N
iWEOYoTkY3R8RhAooq9AbFIbPPXHUiJOyqnau4FeiUTtc0ZyRv5A55qhKbsj7p4o
bmyvEGp6cvVmnn3UGH49k5blWzm0MoksxSiYphtBxHqMyuY+Gfj6BN+JAwyrEKwl
g/fADk89eHUjNgoedy6wWqL3
-----END PRIVATE KEY-----`;

const adminPub = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu04e9VLNn1JHgYNIMRrU
Q4JHhHn0wZxPCD9kcPz63SMBiYnCtRM24pK86gAaTuM4D8V2LjrA6dvBWwBOf2uF
/4irIRXMOaI58utXECsA0r6Cw2SpCYSV8BK1y8hpnsw02/T0xYRDbFqfhvqcsBJ2
4LI6F4tCobPoegEpbCTWoLMuMET3WZFLymYSiG42NmbcZ0KTGkwTziLylL22n5wA
ZTlfuvuBQDRbK/S9fNWzXjomhJmqsyQmo2YAR0FA1aXn7Peqo/0tCftJk8JjWozd
Pg3nTeGel5fxNuV7rmlN26xBU6p0xNg12tz+4ggrEeq99dzgkfP+KQpYlzZVBLNd
mQIDAQAB
-----END PUBLIC KEY-----
`;

describe("Integration test", async() => {
	
	it("Invoke service", async () => {

		const wal = Wallet.Instance;
		try {
			var ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

			var config = {
				stateStore: '/tmp/cloud',
				caName: 'telefonicaca',
				mspId: 'telefonicaMSP',
				walletID: 'adminUser',
				asLocalhost: false,
				ccp: ccp,
				chaincodeName: "identitycc",
				fcn: "proxy",
				channel: "channel1"
			}
			
			let identity = await wal.generateDID("RSA", "default", "secret");

			await wal.setDefault(identity);

			const trustID = new TrustIdHf(config);
			wal.addNetwork("hf", trustID);
			await wal.networks["hf"].configureDriver();

			let access: AccessPolicy = {policy: PolicyType.PublicPolicy};

			const didUnlock = await wal.getDID("default");
			await didUnlock.unlockAccount("secret");
			await wal.networks["hf"].createSelfIdentity(await wal.getDID("default"));

			console.log("Getting created key...");
			await trustID.getIdentity(await wal.getDID("default"), await didUnlock.id);
			const id = Date.now();
			const res = await trustID.createService(await wal.getDID("default"), `vtn:trustos:service:${id}`, "sacc", access,config.channel);
			await trustID.updateServiceAccess(await wal.getDID("default"), `vtn:trustos:service:${id}`, access);
			const result = await trustID.invoke(
				await wal.getDID("default"),
				`vtn:trustos:service:${id}`,
				["set", "5", "100"],
				config.channel
				
			);
			await wal.networks["hf"].disconnectDriver();

			expect(result).to.equal("100");
		} catch (err) {
			//await wal.networks["hf"].disconnectDriver();

			console.log(err);
		}
			
	});
});
