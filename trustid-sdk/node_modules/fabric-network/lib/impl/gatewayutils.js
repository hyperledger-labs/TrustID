"use strict";
/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Knuth shuffle of array elements. The supplied array is directly modified.
 * @param {array} array An array to shufle.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
exports.shuffle = shuffle;
/**
 * Implementation of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled|Promise.allSettled()}
 * for use in Node versions prior to 12.9.0, where this was introduced.
 * @param {Iterable<Promise>} promises Iterable promises.
 * @returns An array of promises.
 */
function allSettled(promises) {
    const promiseArray = Array.isArray(promises) ? promises : Array.from(promises);
    return Promise.all(promiseArray.map(settle));
}
exports.allSettled = allSettled;
function settle(promise) {
    return promise.then((value) => {
        return { status: 'fulfilled', value };
    }, (reason) => {
        return { status: 'rejected', reason };
    });
}
/**
 * Wrap a function call with a cache. On first call the wrapped function is invoked to obtain a result. Subsequent
 * calls return the cached result.
 * @param f A function whose result should be cached.
 */
function cachedResult(f) {
    let value;
    return () => {
        if (typeof value === 'undefined') {
            value = f();
        }
        return value;
    };
}
exports.cachedResult = cachedResult;
//# sourceMappingURL=gatewayutils.js.map