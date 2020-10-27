/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import { Keystore } from './keystore';
import { DID } from '../wallet'
const mongodb = require("mongodb")



//const DIDModel = Mongoose.model("did", DIDSchema);

export class MongoKeystore extends Keystore {

    private database: any;
    private uri: string;
    private databaseName: string;
    private validator  = {
        $jsonSchema: {
            bsonType: "object",
            required: [ "id", "pubkey", "type", "controller", "access", "privkey"],
            properties: {
                id: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                pubkey: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                type: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                controller: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                access: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                },
                privkey: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                tempPrivKey: {
                    bsonType: "string",
                    description: "must be a string"
                }
            }
        }
    }


    // Create connection to the keystore database.
    constructor(mongoURI: string, databaseName: string) {
        super();
        this.uri = mongoURI;
        this.database = null;
        this.databaseName = databaseName;
    }

    public async init() {
        try {
            const client = await mongodb.MongoClient.connect(this.uri,  { useUnifiedTopology: true });
            this.database = client.db(this.databaseName);
            this.database.createCollection("dids", {
                validator: this.validator
            });
        } catch(err){
            throw err;

        }

    }

    /** getKey gets a key from the keystore of the wallet */
    public async getDID(id: string = "default"): Promise<DID> {
        // We check DID in mongoDB
        // Retrieve from database
        try {
            const didObj = await this.database.collection('dids').findOne({ id: id });
               let emptyDID: DID = new DID("RSA", undefined);
            await emptyDID.loadFromObject(didObj);
            return emptyDID
        } catch (err) {
            throw new Error("DID not found in database")
        }
    }

    /** Stores DID in the permanent keystore */
    public async storeDID(did: DID): Promise<boolean> {
        try {
            const didObj = await this.database.collection('dids').findOne({ id: did.id });
            if(!didObj){
                await this.database.collection('dids').insertOne(did)
                return true;
            } else {
                throw new Error("The identity already exists in the database");
            }
        } catch (err){
            throw err;
        }
    }

    /** Stores DID in the permanent keystore */
    public async updateDID(did: DID): Promise<boolean> {
        try {
            // Update DID in Mongo. Modify if it exists, create if it doesn't
            await this.database.collection('dids').replaceOne({
                id: did.id },
                did,
                {upsert: false });
            this.keystore[did.id] = did // update in memory keystore

            return true
        } catch (err){
            throw err;
        }
    }

}