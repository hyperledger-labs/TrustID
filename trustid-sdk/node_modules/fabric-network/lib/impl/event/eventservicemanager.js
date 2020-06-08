"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayUtils = require("../gatewayutils");
class EventServiceManager {
    constructor(network) {
        this.eventServices = new Map();
        this.network = network;
        this.channel = network.getChannel();
        this.mspId = network.getGateway().getIdentity().mspId;
        this.identityContext = this.network.getGateway().identityContext;
    }
    /**
     * Get a shared event service that can only be used for realtime listening to filtered events. These event services
     * provide high performance event listening for commit events.
     * @param peer Peer from which to receive events.
     * @returns An event service.
     */
    getCommitEventService(peer) {
        let eventService = this.eventServices.get(peer);
        if (!eventService) {
            eventService = this.newEventService([peer]);
            this.eventServices.set(peer, eventService);
        }
        return eventService;
    }
    /**
     * Use this method to be sure the event service has been connected and has been started. If the event service is not
     * started, it will start the service based on the options provided. If the event service is already started, it
     * will check that the event service is compatible with the options provided.
     * @param eventService EventService to be started if it not already started.
     * @param options The options to start the event service.
     */
    async startEventService(eventService, options = {}) {
        if (eventService.isStarted()) {
            return this.assertValidOptionsForStartedService(options, eventService);
        }
        eventService.build(this.identityContext, options);
        eventService.sign(this.identityContext);
        // targets must be previously assigned
        await eventService.send(options);
    }
    newDefaultEventService() {
        const peers = this.getEventPeers();
        GatewayUtils.shuffle(peers);
        return this.newEventService(peers);
    }
    close() {
        this.eventServices.forEach((eventService) => eventService.close());
    }
    /**
     * This method will build fabric-common Eventers and the fabric-common
     * EventService. The Eventers will not be connected to the endpoint at
     * this time. Since the endorsers have been previously connected, the
     * endpoint should be accessable. The EventService will check the connection
     * and perform the connect during the send() when it starts the service.
     * @param peers The Endorser service endpoints used to build a
     *  a list of {@link Eventer} service endpoints that will be used as the
     *  targets of the new EventService.
     */
    newEventService(peers) {
        const serviceName = this.createName(peers);
        const eventService = this.channel.newEventService(serviceName);
        const eventers = peers.map((peer) => this.newEventer(peer));
        eventService.setTargets(eventers);
        return eventService;
    }
    newEventer(peer) {
        const eventer = this.channel.client.newEventer(peer.name);
        eventer.setEndpoint(peer.endpoint);
        return eventer;
    }
    createName(peers) {
        return peers.map((peer) => peer.name).join(',');
    }
    assertValidOptionsForStartedService(options, eventService) {
        if (options.blockType && options.blockType !== eventService.blockType) {
            throw new Error('EventService is not receiving the correct blockType');
        }
        if (options.startBlock) {
            throw new Error('EventService is started and not usable for replay');
        }
    }
    getEventPeers() {
        const orgPeers = this.getOrganizationPeers();
        return orgPeers.length > 0 ? orgPeers : this.getNetworkPeers();
    }
    getOrganizationPeers() {
        return this.channel.getEndorsers(this.mspId);
    }
    getNetworkPeers() {
        return this.channel.getEndorsers();
    }
}
exports.EventServiceManager = EventServiceManager;
//# sourceMappingURL=eventservicemanager.js.map