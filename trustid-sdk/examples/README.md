# Examples
In this directory you will find a set of examples of how to interact with TrustID,
and the implemented networks and keystores. To run the examples be sure that
you have built the typescript source of the library (or installed it from npm),
and that you have all dependencies installed.

* Before you start:
```sh
$ npm install
$ npm run build
```
* To run a specific example use:
```sh
$ tsc <example>.ts && node <example>.js
```

### Available examples
* `getting-started.ts`: Shows a simple flow of operations with TrustID,
from creating a DID, to using it for off-chain signatures and invoking
an existing service.
* `mongo-keystore.ts`: [Comming soon].
* `create-service.ts`: [Comming soon].

*Disclaimer: Do not hesitate to suggest any additional example you find useful in an issue and
we will add it.*