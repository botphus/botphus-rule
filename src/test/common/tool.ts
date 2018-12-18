/**
 * Valid error promise
 * @param  {Promise<any>}  promiseFunc Promise function
 * @return {Promise<void>}             Promise result
 */
export function validPromiseError(promiseFunc: Promise<any>, assertFunc?: (err: Error) => void): Promise<void> {
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
