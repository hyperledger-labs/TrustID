/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Network } from '../../network';
import { Endorser, EventService, StartRequestOptions } from 'fabric-common';
export declare class EventServiceManager {
    private readonly network;
    private readonly channel;
    private readonly mspId;
    private readonly eventServices;
    private readonly identityContext;
    constructor(network: Network);
    /**
     * Get a shared event service that can only be used for realtime listening to filtered events. These event services
     * provide high performance event listening for commit events.
     * @param peer Peer from which to receive events.
     * @returns An event service.
     */
    getCommitEventService(peer: Endorser): EventService;
    /**
     * Use this method to be sure the event service has been connected and has been started. If the event service is not
     * started, it will start the service based on the options provided. If the event service is already started, it
     * will check that the event service is compatible with the options provided.
     * @param eventService EventService to be started if it not already started.
     * @param options The options to start the event service.
     */
    startEventService(eventService: EventService, options?: StartRequestOptions): Promise<void>;
    newDefaultEventService(): EventService;
    close(): void;
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
    private newEventService;
    private newEventer;
    private createName;
    private assertValidOptionsForStartedService;
    private getEventPeers;
    private getOrganizationPeers;
    private getNetworkPeers;
}
