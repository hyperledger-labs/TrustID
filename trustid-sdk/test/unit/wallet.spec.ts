
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { expect } from 'chai';
import { Wallet } from '../../src/wallet';
import { FileKeystore } from '../../src/keystores/fileKeystore';
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

    it('List DIDs', async () =>  {
        const did = await wal.generateDID('RSA', 'default', 'secret');
        await wal.storeInMemory(did);
       const res =  await wal.listDID()
       expect(res).to.not.equal({});

    });

    it('Store default DIDs', async () =>  {
        const did = await wal.generateDID('RSA', 'default', 'secret');
        await wal.storeDID(did);
      
        wal.setDefault(did)
        const res = await wal.getDID('default')
        expect(res.id).to.equal(did.id);

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

    it('generate EC DID', async () => {
        const did = await wal.generateDID('EC', 'default', 'secret');
        const did2 = await wal.generateDID('EC', 'default', 'secret');
        expect([did.type, did.controller]).to.eql(['EC', 'default']);
        expect(await wal.getDID(did.id)).to.eql(did);
        expect(await wal.getDID(did.id)).to.not.eql(did2);
    });

    it('bad algorithm ', async () => {
        try {
            const did = await wal.generateDID('EasaC', 'default', 'secret');

        } catch (err){
    expect(err.message).to.eql("Key algorithm not supported")
        }
       
    });

    // it('Update did', async() => {
    //     const did = await wal.generateDID('RSA', 'default', 'secret');
    //     did.tempPrivKey = "lalsal"
    //     await wal.updateDID(did);

    //     const getDID = await wal.getDID(did.id)
    //     expect(getDID.tempPrivKey).to.eql(did.tempPrivKey)
    // });

    it('Unlock account bad', async() => {
        try {
            const did = await wal.generateDID('RSA', 'default', 'secret');
            await did.unlockAccount('')
        } catch(err){
            expect(err.message).to.eql("Private key couldn't be deciphered")
        }
    });

    it('Export did', async() => {
        const did = await wal.generateDID('RSA', 'default', 'secret');
        const didExp = await did.exportDID(false)
        expect(did.id).to.eql(didExp.id)
    });
    it('Export did with privKey', async() => {
        const did = await wal.generateDID('RSA', 'default', 'secret');
        const didExp = await did.exportDID(true)
        expect("").to.not.eql(didExp.privkey)
    });
    it('Create temp key', async() => {
        const did = await wal.generateDID('RSA', 'default', 'secret');
        await did.unlockAccount('secret', 'tempPass' )
        await did.unlockAccountTemp('tempPass')
        expect(did.tempPrivKey).to.not.eql("")
    });


    it('Not create temp key', async() => {
        try {
            const did = await wal.generateDID('RSA', 'default', 'secret');
            await did.unlockAccount('secret' )
           await did.unlockAccountTemp('tempPass')
        } catch(err){
            expect(err.message).to.eql("Invalid PEM formatted message.")
        }
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

