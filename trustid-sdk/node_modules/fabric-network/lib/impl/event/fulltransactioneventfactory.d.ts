/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Block } from 'fabric-common';
import { BlockEvent, TransactionEvent } from '../../events';
export declare function getTransactionEnvelopeIndexes(blockData: Block): number[];
export declare function newFullTransactionEvent(blockEvent: BlockEvent, txEnvelopeIndex: number): TransactionEvent;
