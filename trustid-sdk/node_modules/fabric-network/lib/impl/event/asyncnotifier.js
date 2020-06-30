"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
class AsyncNotifier {
    constructor(readCallback, notifyCallback) {
        this.running = false;
        this.readCallback = readCallback;
        this.notifyCallback = notifyCallback;
    }
    notify() {
        if (!this.running) {
            this.running = true;
            this.run(); // tslint:disable-line: no-floating-promises
        }
    }
    async run() {
        for (let event; event = this.readCallback();) { // tslint:disable-line: no-conditional-assignment
            await this.notifyCallback(event);
        }
        this.running = false;
    }
}
exports.AsyncNotifier = AsyncNotifier;
//# sourceMappingURL=asyncnotifier.js.map