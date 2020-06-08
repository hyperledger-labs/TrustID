"use strict";
/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const transactioneventstrategy_1 = require("./transactioneventstrategy");
const Logger = require("../../logger");
const logger = Logger.getLogger('AllForTxStrategy');
/**
 * Event handling strategy that:
 * - Waits for all reponses from event hubs.
 * - Fails if all responses are errors.
 * - Succeeds if any reponses are successful.
 *
 * Instances of the strategy are stateful and must only be used for a single transaction.
 * @private
 * @class
 */
class AllForTxStrategy extends transactioneventstrategy_1.TransactionEventStrategy {
    checkCompletion(counts, successFn, failFn) {
        const method = 'checkCompletion';
        logger.debug('%s:%j', method, counts);
        const isAllResponsesReceived = (counts.success + counts.fail === counts.expected);
        if (isAllResponsesReceived) {
            if (counts.success > 0) {
                logger.debug('%s - success', method);
                successFn();
            }
            else {
                failFn(new Error('No successful events received'));
            }
        }
        else {
            logger.debug('%s: not complete', method);
        }
    }
}
exports.AllForTxStrategy = AllForTxStrategy;
//# sourceMappingURL=allfortxstrategy.js.map