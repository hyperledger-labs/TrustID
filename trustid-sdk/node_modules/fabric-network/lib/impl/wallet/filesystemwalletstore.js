"use strict";
/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const suffix = '.id';
function isIdentityFile(file) {
    return file.endsWith(suffix);
}
function toLabel(file) {
    const endIndex = file.length - suffix.length;
    return file.substring(0, endIndex);
}
class FileSystemWalletStore {
    constructor(directory) {
        this.storePath = directory;
    }
    static async newInstance(directory) {
        await fs.mkdirp(directory);
        return new FileSystemWalletStore(directory);
    }
    async remove(label) {
        const file = this.toPath(label);
        await fs.unlink(file);
    }
    async get(label) {
        const file = this.toPath(label);
        try {
            return await fs.readFile(file);
        }
        catch (error) {
            return undefined;
        }
    }
    async list() {
        return (await fs.readdir(this.storePath))
            .filter(isIdentityFile)
            .map(toLabel);
    }
    async put(label, data) {
        const file = this.toPath(label);
        await fs.writeFile(file, data);
    }
    toPath(label) {
        return path.join(this.storePath, label + suffix);
    }
}
exports.FileSystemWalletStore = FileSystemWalletStore;
//# sourceMappingURL=filesystemwalletstore.js.map