"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_common_1 = require("fabric-common");
/**
 * Identity provider to handle X.509 identities where the private key is stored in a hardware security module.
 * @memberof module:fabric-network
 * @implements module:fabric-network.IdentityProvider
 */
class HsmX509Provider {
    /**
     * Create a provider instance.
     * @param {module:fabric-network.HsmOptions} [options={}] Options specifying how to connect to the HSM. Mandatory
     * unless this information is provided through external configuration.
     */
    constructor(options = {}) {
        this.type = 'HSM-X.509';
        this.options = {};
        Object.assign(this.options, options);
        this.options.software = false; // Must be set to enable HSM
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
                },
                mspId: x509Data.mspId,
                type: 'HSM-X.509',
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
            },
            mspId: identity.mspId,
            type: 'HSM-X.509',
            version: 1,
        };
        return data;
    }
    async getUserContext(identity, name) {
        const cryptoSuite = fabric_common_1.User.newCryptoSuite(this.options);
        const user = new fabric_common_1.User(name);
        user.setCryptoSuite(cryptoSuite);
        const publicKey = await cryptoSuite.importKey(identity.credentials.certificate);
        const privateKeyObj = await cryptoSuite.getKey(publicKey.getSKI());
        await user.setEnrollment(privateKeyObj, identity.credentials.certificate.toString(), identity.mspId, true);
        return user;
    }
}
exports.HsmX509Provider = HsmX509Provider;
//# sourceMappingURL=hsmx509identity.js.map