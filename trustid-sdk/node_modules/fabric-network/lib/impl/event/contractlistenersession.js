"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("../../logger");
const Listeners = require("./listeners");
const logger = Logger.getLogger('ContractListenerSession');
class ContractListenerSession {
    constructor(listener, chaincodeId, network, options) {
        this.listener = listener;
        this.chaincodeId = chaincodeId;
        this.network = network;
        this.blockListener = this.newBlockListener(options);
        this.options = options;
    }
    async start() {
        await this.network.addBlockListener(this.blockListener, this.options);
    }
    close() {
        this.network.removeBlockListener(this.blockListener);
    }
    newBlockListener(options) {
        const callback = this.onContractEvent.bind(this);
        return Listeners.blockFromContractListener(callback, options === null || options === void 0 ? void 0 : options.checkpointer);
    }
    async onContractEvent(event) {
        if (this.isMatch(event)) {
            await this.notifyListener(event);
        }
    }
    isMatch(event) {
        return event.chaincodeId === this.chaincodeId;
    }
    async notifyListener(event) {
        try {
            await this.listener(event);
        }
        catch (error) {
            logger.warn('Error notifying contract listener', error);
        }
    }
}
exports.ContractListenerSession = ContractListenerSession;
//# sourceMappingURL=contractlistenersession.js.map