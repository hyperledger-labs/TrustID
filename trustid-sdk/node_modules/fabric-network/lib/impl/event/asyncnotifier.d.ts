/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export declare class AsyncNotifier<T> {
    private readonly readCallback;
    private readonly notifyCallback;
    private running;
    constructor(readCallback: () => T | undefined, notifyCallback: (event: T) => Promise<unknown>);
    notify(): void;
    private run;
}
