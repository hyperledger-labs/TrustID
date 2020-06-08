
/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
import {Wallet, DID} from "./src/wallet";
import {FileKeystore} from "./src/keystore/fileKeystore";
import {MongoKeystore} from "./src/keystore/mongoKeystore";
import {LocalStorageKeystore} from "./src/keystore/localStorageKeystore";
import {TrustIdHf} from "./src/network/trustHF"

export {Wallet, DID, FileKeystore, MongoKeystore, LocalStorageKeystore, TrustIdHf};
