"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_common_1 = require("fabric-common");
class X509Provider {
    constructor() {
        this.type = 'X.509';
    }
    fromJson(data) {
        if (data.type !== this.type) {
            throw new Error('Invalid identity type: ' + data.type);
        }
        if (data.version === 1) {
            const x509Data = data;
            return {
                credentials: {
                    certificate: x509Data.credentials.certificate,
                    privateKey: x509Data.credentials.privateKey,
                },
                mspId: x509Data.mspId,
                type: 'X.509',
            };
        }
        else {
            throw new Error('Unsupported identity version: ' + data.version);
        }
    }
    toJson(identity) {
        const data = {
            credentials: {
                certificate: identity.credentials.certificate,
                privateKey: identity.credentials.privateKey,
            },
            mspId: identity.mspId,
            type: 'X.509',
            version: 1,
        };
        return data;
    }
    async getUserContext(identity, name) {
        const cryptoSuite = fabric_common_1.User.newCryptoSuite();
        const user = new fabric_common_1.User(name);
        user.setCryptoSuite(cryptoSuite);
        const importedKey = cryptoSuite.createKeyFromRaw(identity.credentials.privateKey.toString());
        await user.setEnrollment(importedKey, identity.credentials.certificate.toString(), identity.mspId, true);
        return user;
    }
}
exports.X509Provider = X509Provider;
//# sourceMappingURL=x509identity.js.map