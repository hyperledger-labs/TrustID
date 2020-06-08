"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
async function addListener(listener, listenerSessions, sessionSupplier) {
    if (!listenerSessions.has(listener)) {
        const session = await sessionSupplier();
        // Store listener before starting in case start fires error events that trigger remove of the listener
        listenerSessions.set(listener, session);
        await session.start();
    }
    return listener;
}
exports.addListener = addListener;
function removeListener(listener, listenerSessions) {
    const session = listenerSessions.get(listener);
    if (session) {
        session.close();
        listenerSessions.delete(listener);
    }
}
exports.removeListener = removeListener;
//# sourceMappingURL=listenersession.js.map