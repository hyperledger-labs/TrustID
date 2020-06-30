"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
class SharedBlockListenerSession {
    constructor(listener, eventSource) {
        this.listener = listener;
        this.eventSource = eventSource;
    }
    async start() {
        await this.eventSource.addBlockListener(this.listener);
    }
    close() {
        this.eventSource.removeBlockListener(this.listener);
        // Don't close the shared event source
    }
}
exports.SharedBlockListenerSession = SharedBlockListenerSession;
//# sourceMappingURL=sharedblocklistenersession.js.map