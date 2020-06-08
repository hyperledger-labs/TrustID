"use strict";
/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
// reuse the client implementation of the logger as we are part of the client
// abstracted out in case we want to change this in the future.
const fabric_common_1 = require("fabric-common");
exports.getLogger = fabric_common_1.Utils.getLogger;
//# sourceMappingURL=logger.js.map