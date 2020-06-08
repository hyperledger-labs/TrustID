"use strict";
/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fabricerror_1 = require("../../errors/fabricerror");
const util = require("util");
const Logger = require("../../logger");
const logger = Logger.getLogger('RoundRobinQueryHandler');
class RoundRobinQueryHandler {
    constructor(peers) {
        this.currentPeerIndex = 0;
        logger.debug('constructor: peers=%j', peers.map((peer) => peer.name));
        this.peers = peers;
    }
    async evaluate(query) {
        const method = 'evaluate';
        logger.debug('%s - start', method);
        const startPeerIndex = this.currentPeerIndex;
        this.currentPeerIndex = (this.currentPeerIndex + 1) % this.peers.length;
        const errorMessages = [];
        for (let i = 0; i < this.peers.length; i++) {
            const peerIndex = (startPeerIndex + i) % this.peers.length;
            const peer = this.peers[peerIndex];
            logger.debug('%s - sending to peer %s', method, peer.name);
            const results = await query.evaluate([peer]);
            const result = results[peer.name];
            if (result instanceof Error) {
                errorMessages.push(result.toString());
            }
            else {
                if (result.isEndorsed) {
                    logger.debug('%s - return peer response status: %s', method, result.status);
                    return result.payload;
                }
                else {
                    logger.debug('%s - throw peer response status: %s message: %s', method, result.status, result.message);
                    throw Error(result.message);
                }
            }
        }
        const message = util.format('Query failed. Errors: %j', errorMessages);
        const error = new fabricerror_1.FabricError(message);
        logger.error('evaluate:', error);
        throw error;
    }
}
exports.RoundRobinQueryHandler = RoundRobinQueryHandler;
//# sourceMappingURL=roundrobinqueryhandler.js.map