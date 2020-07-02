"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Long = require("long");
const fs = require("fs");
const encoding = 'utf8';
class FileCheckpointer {
    constructor(path) {
        this.transactionIds = new Set();
        this.path = path;
    }
    async init() {
        await this.load();
        await this.save();
    }
    async addTransactionId(transactionId) {
        this.transactionIds.add(transactionId);
        await this.save();
    }
    async getBlockNumber() {
        return this.blockNumber;
    }
    async getTransactionIds() {
        return this.transactionIds;
    }
    async setBlockNumber(blockNumber) {
        this.blockNumber = blockNumber;
        this.transactionIds.clear();
        await this.save();
    }
    async load() {
        const data = await this.readFile();
        if (data) {
            const json = data.toString(encoding);
            const state = JSON.parse(json);
            this.setState(state);
        }
    }
    async readFile() {
        try {
            return await fs.promises.readFile(this.path);
        }
        catch (err) {
            // Ignore error on non-existent file
        }
    }
    setState(state) {
        this.blockNumber = state.blockNumber ? Long.fromString(state.blockNumber) : undefined;
        this.transactionIds = new Set(state.transactionIds);
    }
    async save() {
        const state = this.getState();
        const json = JSON.stringify(state);
        const data = Buffer.from(json, encoding);
        await fs.promises.writeFile(this.path, data);
    }
    getState() {
        var _a;
        return {
            blockNumber: (_a = this.blockNumber) === null || _a === void 0 ? void 0 : _a.toString(),
            transactionIds: Array.from(this.transactionIds)
        };
    }
}
exports.FileCheckpointer = FileCheckpointer;
//# sourceMappingURL=filecheckpointer.js.map