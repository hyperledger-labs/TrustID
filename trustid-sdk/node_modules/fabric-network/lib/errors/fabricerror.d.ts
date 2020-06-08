/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export interface FabricErrorInfo {
    message?: string;
    cause?: Error;
    transactionId?: string;
}
/**
 * Base type for Fabric-specific errors.
 * @memberof module:fabric-network
 * @property {Error} [cause] Underlying error that caused this error.
 * @property {string} [transactionId] ID of the associated transaction.
 */
export declare class FabricError extends Error {
    cause?: Error;
    transactionId?: string;
    constructor(info?: string | FabricErrorInfo);
}
