/**
 * Returns whatever you pass to it.
 */
export const identity = <R>(r?: R) => r;

/**
 * Returns whatever you pass to it. Asynchronously. While the regular
 * `identity` function is already awaitable, this one is always thenable.
 */
export const identityAsync = async <R>(r?: R) => r;
