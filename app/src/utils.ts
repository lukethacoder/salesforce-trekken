/**
 * Returns a promise which resolves in the `ms` value provided time
 * @param ms - milliseconds to resolve the promise
 * @returns {Promise}
 */
export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
