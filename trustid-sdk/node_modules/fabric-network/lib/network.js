"use strict";
/**
 * Copyright 2018, 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore no implicit any
const Contract = require("./contract");
const blockeventsource_1 = require("./impl/event/blockeventsource");
const commitlistenersession_1 = require("./impl/event/commitlistenersession");
const eventservicemanager_1 = require("./impl/event/eventservicemanager");
const isolatedblocklistenersession_1 = require("./impl/event/isolatedblocklistenersession");
const listeners_1 = require("./impl/event/listeners");
const listenersession_1 = require("./impl/event/listenersession");
const sharedblocklistenersession_1 = require("./impl/event/sharedblocklistenersession");
const Logger = require("./logger");
const logger = Logger.getLogger('Network');
async function listenerOptionsWithDefaults(options) {
    var _a;
    const defaultOptions = {
        type: 'full'
    };
    const result = Object.assign(defaultOptions, options);
    const checkpointBlock = await ((_a = options.checkpointer) === null || _a === void 0 ? void 0 : _a.getBlockNumber());
    if (checkpointBlock) {
        result.startBlock = checkpointBlock;
    }
    return result;
}
class NetworkImpl {
    /*
     * Network constructor for internal use only.
     * @param {Gateway} gateway The owning gateway instance
     * @param {Channel} channel The fabric-base channel instance
     */
    constructor(gateway, channel) {
        this.contracts = new Map();
        this.initialized = false;
        this.commitListeners = new Map();
        this.blockListeners = new Map();
        const method = 'constructor';
        logger.debug('%s - start', method);
        this.gateway = gateway;
        this.channel = channel;
        this.eventServiceManager = new eventservicemanager_1.EventServiceManager(this);
        this.realtimeFilteredBlockEventSource = new blockeventsource_1.BlockEventSource(this.eventServiceManager, { type: 'filtered' });
        this.realtimeFullBlockEventSource = new blockeventsource_1.BlockEventSource(this.eventServiceManager, { type: 'full' });
        this.realtimePrivateBlockEventSource = new blockeventsource_1.BlockEventSource(this.eventServiceManager, { type: 'private' });
    }
    /**
     * initialize the channel if it hasn't been done
     * @private
     */
    async _initializeInternalChannel(options) {
        const method = '_initializeInternalChannel';
        logger.debug('%s - start', method);
        if (options.enabled) {
            logger.debug('%s - initialize with discovery', method);
            let targets;
            if (options.targets) {
                if (Array.isArray(options.targets) && options.targets.length > 0) {
                    for (const target of options.targets) {
                        if (!target.connected) {
                            throw Error(`Endorser instance ${target.name} is not connected to an endpoint`);
                        }
                    }
                }
                else {
                    throw Error('No discovery targets found');
                }
                targets = options.targets;
                logger.debug('%s - user has specified discovery targets', method);
            }
            else {
                logger.debug('%s - user has not specified discovery targets, check channel and client', method);
                // maybe the channel has connected endorsers with the mspid
                const mspId = this.gateway.getIdentity().mspId;
                targets = this.channel.getEndorsers(mspId);
                if (!targets || targets.length < 1) {
                    // then check the client for connected peers associated with the mspid
                    targets = this.channel.client.getEndorsers(mspId);
                }
                if (!targets || targets.length < 1) {
                    // get any peer
                    targets = this.channel.client.getEndorsers();
                }
                if (!targets || targets.length < 1) {
                    throw Error('No discovery targets found');
                }
                else {
                    logger.debug('%s - using channel/client targets', method);
                }
            }
            // should have targets by now, create the discoverers from the endorsers
            const discoverers = [];
            for (const peer of targets) {
                const discoverer = this.channel.client.newDiscoverer(peer.name, peer.mspid);
                await discoverer.connect(peer.endpoint);
                discoverers.push(discoverer);
            }
            this.discoveryService = this.channel.newDiscoveryService(this.channel.name);
            const idx = this.gateway.identityContext;
            // do the three steps
            this.discoveryService.build(idx);
            this.discoveryService.sign(idx);
            logger.debug('%s - will discover asLocalhost:%s', method, options.asLocalhost);
            await this.discoveryService.send({
                asLocalhost: options.asLocalhost,
                targets: discoverers
            });
            // now we can work with the discovery results
            // or get a handler later from the discoverService
            // to be used on endorsement, queries, and commits
            logger.debug('%s - discovery complete - channel is populated', method);
        }
        logger.debug('%s - end', method);
    }
    /**
     * Initialize this network instance
     * @private
     */
    async _initialize(discover) {
        const method = '_initialize';
        logger.debug('%s - start', method);
        if (this.initialized) {
            return;
        }
        await this._initializeInternalChannel(discover);
        this.initialized = true;
        // Must be created after channel initialization to ensure discovery has located the peers
        const queryOptions = this.gateway.getOptions().queryHandlerOptions;
        this.queryHandler = queryOptions.strategy(this);
        logger.debug('%s - end', method);
    }
    getGateway() {
        return this.gateway;
    }
    getContract(chaincodeId, name = '') {
        const method = 'getContract';
        logger.debug('%s - start - name %s', method, name);
        if (!this.initialized) {
            throw new Error('Unable to get contract as this network has failed to initialize');
        }
        const key = `${chaincodeId}:${name}`;
        let contract = this.contracts.get(key);
        if (!contract) {
            contract = new Contract(this, chaincodeId, name);
            logger.debug('%s - create new contract %s', method, chaincodeId);
            this.contracts.set(key, contract);
        }
        return contract;
    }
    getChannel() {
        return this.channel;
    }
    _dispose() {
        const method = '_dispose';
        logger.debug('%s - start', method);
        this.contracts.clear();
        this.commitListeners.forEach((listener) => listener.close());
        this.commitListeners.clear();
        this.blockListeners.forEach((listener) => listener.close());
        this.blockListeners.clear();
        this.realtimeFilteredBlockEventSource.close();
        this.realtimeFullBlockEventSource.close();
        this.realtimePrivateBlockEventSource.close();
        this.eventServiceManager.close();
        this.channel.close();
        this.initialized = false;
    }
    async addCommitListener(listener, peers, transactionId) {
        const sessionSupplier = async () => new commitlistenersession_1.CommitListenerSession(listener, this.eventServiceManager, peers, transactionId);
        return await listenersession_1.addListener(listener, this.commitListeners, sessionSupplier);
    }
    removeCommitListener(listener) {
        listenersession_1.removeListener(listener, this.commitListeners);
    }
    async addBlockListener(listener, options = {}) {
        const sessionSupplier = async () => await this.newBlockListenerSession(listener, options);
        return await listenersession_1.addListener(listener, this.blockListeners, sessionSupplier);
    }
    removeBlockListener(listener) {
        listenersession_1.removeListener(listener, this.blockListeners);
    }
    async newBlockListenerSession(listener, options) {
        options = await listenerOptionsWithDefaults(options);
        if (options.checkpointer) {
            listener = listeners_1.checkpointBlockListener(listener, options.checkpointer);
        }
        if (options.startBlock) {
            return this.newIsolatedBlockListenerSession(listener, options);
        }
        else {
            return this.newSharedBlockListenerSession(listener, options.type);
        }
    }
    newIsolatedBlockListenerSession(listener, options) {
        const blockSource = new blockeventsource_1.BlockEventSource(this.eventServiceManager, options);
        return new isolatedblocklistenersession_1.IsolatedBlockListenerSession(listener, blockSource);
    }
    newSharedBlockListenerSession(listener, type) {
        if (type === 'filtered') {
            return new sharedblocklistenersession_1.SharedBlockListenerSession(listener, this.realtimeFilteredBlockEventSource);
        }
        else if (type === 'full') {
            return new sharedblocklistenersession_1.SharedBlockListenerSession(listener, this.realtimeFullBlockEventSource);
        }
        else if (type === 'private') {
            return new sharedblocklistenersession_1.SharedBlockListenerSession(listener, this.realtimePrivateBlockEventSource);
        }
        else {
            throw new Error('Unsupported event listener type: ' + type);
        }
    }
}
exports.NetworkImpl = NetworkImpl;
//# sourceMappingURL=network.js.map