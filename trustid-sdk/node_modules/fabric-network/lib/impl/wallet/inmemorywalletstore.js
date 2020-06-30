"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryWalletStore {
    constructor() {
        this.map = new Map();
    }
    async remove(label) {
        this.map.delete(label);
    }
    async get(label) {
        return this.map.get(label);
    }
    async list() {
        return Array.from(this.map.keys());
    }
    async put(label, data) {
        this.map.set(label, data);
    }
}
exports.InMemoryWalletStore = InMemoryWalletStore;
//# sourceMappingURL=inmemorywalletstore.js.map