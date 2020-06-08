"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nano = require("nano");
const encoding = 'utf8';
class CouchDBWalletStore {
    constructor(db) {
        this.db = db;
    }
    static async newInstance(config, dbName) {
        const client = nano(config);
        try {
            await client.db.get(dbName); // Throws if database does not exist
        }
        catch (error) {
            await client.db.create(dbName);
        }
        const db = client.use(dbName);
        return new CouchDBWalletStore(db);
    }
    async remove(label) {
        const document = await this.getDocument(label);
        if (document) {
            await this.db.destroy(document._id, document._rev);
        }
    }
    async get(label) {
        const document = await this.getDocument(label);
        return document ? Buffer.from(document.data, encoding) : undefined;
    }
    async list() {
        const response = await this.db.list();
        return response.rows.map((row) => row.id);
    }
    async put(label, data) {
        const newDocument = {
            _id: label,
            data: data.toString(encoding),
        };
        // Overwrite any existing document revision instead of creating a new revision
        const existingDocument = await this.getDocument(label);
        if (existingDocument) {
            newDocument._rev = existingDocument._rev;
        }
        await this.db.insert(newDocument);
    }
    async getDocument(label) {
        try {
            return await this.db.get(label);
        }
        catch (error) {
            // TODO: Log error
        }
        return undefined;
    }
}
exports.CouchDBWalletStore = CouchDBWalletStore;
//# sourceMappingURL=couchdbwalletstore.js.map