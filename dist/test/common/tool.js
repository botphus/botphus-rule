"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Valid error promise
 * @param  {Promise<any>}  promiseFunc Promise function
 * @return {Promise<void>}             Promise result
 */
function validPromiseError(promiseFunc, assertFunc) {
    return promiseFunc
        .then(() => {
        return Promise.reject(new Error('Invalid expectation'));
    })
        .catch((err) => {
        if (assertFunc) {
            assertFunc(err);
        }
        return Promise.resolve();
    });
}
exports.validPromiseError = validPromiseError;
