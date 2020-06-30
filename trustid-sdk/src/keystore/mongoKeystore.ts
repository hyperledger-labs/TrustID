/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { Keystore } from './keystore';
import { DID } from '../wallet'
const Mongoose = require("mongoose")

const DIDSchema = new Mongoose.Schema({
    id: String,
    pubkey: String,
    type: String,
    controller: String,
    access: Number,
    privkey: String,
})

const DIDModel = Mongoose.model("did", DIDSchema);

export class MongoKeystore extends Keystore {

    private database: any;
    private uri: string;

    // Create connection to the keystore database.
    constructor(mongoURI: string) {
        super();
        this.uri = mongoURI;
        this.database = null;
    }

    public async init() {
        await Mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        this.database = Mongoose.connection;
        // this.database.once("open", async () => {
        //     console.log("Connected to database");
        // });
        // this.database.on("error", () => {
        //     console.log("Error connecting to database");
        // });
    }

    /** getKey gets a key from the keystore of the wallet */
    public async getDID(id: string = "default"): Promise<DID> {
        // We check if DID in memory
        if (!(id in this.keystore)) {
            // Retrieve from database
            try {
                const didObj = await DIDModel.findOne({ id: id });
                let emptyDID: DID = new DID("RSA", undefined);
                emptyDID.loadFromObject(didObj);
                this.keystore[id] = emptyDID;
            } catch {
                throw new Error("DID not found in database")
            }
        }

        return this.keystore[id];
    }

    /** Stores DID in the permanent keystore */
    public async storeDID(did: DID): Promise<boolean> {
        try {
            // Store DID in Mongo. Modify if it exists, create if it doesn't
            const didObj = await DIDModel.findOne({ id: did.id });
            console.log(didObj)
            if(!didObj){
                await DIDModel.create(did);
                return true;

            } else {
                throw new Error("The identity already exists in the storage");

            }
              
        } catch (err){
           throw err;
        }
    }

}