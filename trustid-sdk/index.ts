
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {Wallet} from "./src/wallet";
import {DID} from "./src/core/did"
import {FileKeystore} from "./src/keystores/fileKeystore";
import {MongoKeystore} from "./src/keystores/mongoKeystore";
import {LocalStorageKeystore} from "./src/keystores/localStorageKeystore";
import {TrustIdHf} from "./src/core/trustidHF"
import {AccessPolicy, PolicyType} from "./src/core/trustid";

export {Wallet, DID, 
    FileKeystore, MongoKeystore, 
    LocalStorageKeystore, TrustIdHf,
    AccessPolicy, PolicyType};
