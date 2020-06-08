/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="node" />
import { Block, BlockType, Endorser, FilteredBlock, FilteredTransaction } from 'fabric-common';
import { Checkpointer } from './checkpointer';
import Long = require('long');
export declare type EventType = BlockType;
export interface BlockEvent {
    readonly blockNumber: Long;
    readonly blockData: FilteredBlock | Block;
    getTransactionEvents(): TransactionEvent[];
}
export interface TransactionEvent {
    readonly transactionId: string;
    readonly status: string;
    readonly isValid: boolean;
    readonly transactionData: FilteredTransaction | any;
    readonly privateData?: any;
    getBlockEvent(): BlockEvent;
    getContractEvents(): ContractEvent[];
}
export interface ContractEvent {
    readonly chaincodeId: string;
    readonly eventName: string;
    readonly payload?: Buffer;
    getTransactionEvent(): TransactionEvent;
}
export declare type BlockListener = (event: BlockEvent) => Promise<void>;
export declare type ContractListener = (event: ContractEvent) => Promise<void>;
export interface ListenerOptions {
    startBlock?: number | string | Long;
    type?: EventType;
    checkpointer?: Checkpointer;
}
export interface CommitError extends Error {
    peer: Endorser;
}
export interface CommitEvent extends TransactionEvent {
    readonly peer: Endorser;
}
export declare type CommitListener = (error?: CommitError, event?: CommitEvent) => void;
