"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const filecheckpointer_1 = require("./impl/filecheckpointer");
/**
 * Provides static factory functions used to create instances of default
 * {@link module:fabric-network.Checkpointer|Checkpointer} implementations.
 * @memberof module:fabric-network
 */
class DefaultCheckpointers {
    /**
     * Create a checkpointer that uses the specified file to store persistent state. If the file does not exist, it will
     * be created and the checkpointer will have an uninitialized state that will accept any events. If the file does
     * exist, it must contain valid checkpoint state.
     * @param {string} path Path to a file holding persistent checkpoint state.
     * @returns {Promise<module:fabric-network.Checkpointer>} A checkpointer.
     */
    static async file(path) {
        const checkpointer = new filecheckpointer_1.FileCheckpointer(path);
        await checkpointer.init();
        return checkpointer;
    }
}
exports.DefaultCheckpointers = DefaultCheckpointers;
//# sourceMappingURL=defaultcheckpointers.js.map