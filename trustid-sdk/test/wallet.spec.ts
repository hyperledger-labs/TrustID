
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { expect } from 'chai';
import { Wallet } from '../src/wallet';
import { FileKeystore } from '../src/keystore/fileKeystore';

import 'mocha';

const wal = Wallet.Instance;
//const hfdriver = wal.drivers.hf
const ks = new FileKeystore('file');
wal.setKeystore(ks)

describe('Wallet tests', () => {

    it('creates new wallet', () => {
        expect(wal).to.not.equal({});
    });

    it('Creates FileKeystore for integration in wallet', () => {
        expect(ks).to.not.equal({});
    });


    it('wallet not initialized twice', () => {
        const wal2 = Wallet.Instance;
        expect(wal).to.equal(wal2);
    });

    it('generate RSA DID', async () => {
        const did = await wal.generateDID('RSA', 'default', 'secret');
        const did2 = await wal.generateDID('RSA', 'default', 'secret');
        expect([did.type, did.controller]).to.eql(['RSA', 'default']);
        expect(await wal.getDID(did.id)).to.eql(did);
        expect(await wal.getDID(did.id)).to.not.eql(did2);
    });

    it('DID operations', async () => {
        const did = await wal.generateDID('EC', 'default', 'secret');
        const did2 = await wal.generateDID('EC', 'default', 'secret');

        const payload = {my: "payload"}
        try {
            await wal.generateDID('ed213', 'default', 'secret')
        } catch(err) {
            expect(err).to.be.an('error');
        }
        
        try {
            await did.unlockAccount('wrong')
        } catch(err) {
            expect(err).to.be.an('error');
        }

        try {
            await did.sign(payload)
        } catch(err) {
            expect(err).to.be.an('error');
        }
        
        await did2.unlockAccount('secret');
        await did.unlockAccount('secret');


        const signed = await did2.sign(payload);
        const verified = await did.verify(signed, did2);
        
        expect(verified).to.eql(payload);

        // Wrong verification
        try {
            await did.verify(signed, did);
        } catch(err) {
            expect(err).to.be.an('error');
        }

        did.lockAccount()

        try {
            await did.sign(payload)
        } catch(err) {
            expect(err).to.be.an('error');
        }

    });


});

