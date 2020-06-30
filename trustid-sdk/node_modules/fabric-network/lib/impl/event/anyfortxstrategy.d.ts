/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventCount, SuccessCallback, FailCallback, TransactionEventStrategy } from './transactioneventstrategy';
/**
 * Event handling strategy that:
 * - Waits for first successful reponse from an event service.
 * - Fails if all responses are errors.
 * - Succeeds if any reponses are successful.
 *
 * Instances of the strategy are stateful and must only be used for a single transaction.
 * @private
 * @class
 */
export declare class AnyForTxStrategy extends TransactionEventStrategy {
    protected checkCompletion(counts: EventCount, successFn: SuccessCallback, failFn: FailCallback): void;
}
