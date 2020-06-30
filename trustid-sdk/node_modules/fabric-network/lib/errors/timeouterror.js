"use strict";
/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fabricerror_1 = require("./fabricerror");
/**
 * Error indicating a timeout.
 * @extends module:fabric-network.FabricError
 * @memberof module:fabric-network
 */
class TimeoutError extends fabricerror_1.FabricError {
    constructor(info) {
        super(info);
        this.name = TimeoutError.name;
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=timeouterror.js.map