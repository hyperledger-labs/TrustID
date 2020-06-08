/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Endorser, EventInfo } from 'fabric-common';
import { CommitEvent } from '../../events';
export declare function newCommitEvent(peer: Endorser, eventInfo: EventInfo): CommitEvent;
