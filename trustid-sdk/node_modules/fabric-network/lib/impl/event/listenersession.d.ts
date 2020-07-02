/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export interface ListenerSession {
    start(): Promise<void>;
    close(): void;
}
export declare function addListener<T>(listener: T, listenerSessions: Map<T, ListenerSession>, sessionSupplier: () => Promise<ListenerSession>): Promise<T>;
export declare function removeListener<T>(listener: T, listenerSessions: Map<T, ListenerSession>): void;
