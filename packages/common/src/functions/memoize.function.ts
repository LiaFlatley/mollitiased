import type { Fn } from './fn.type.js';
import { MemoizeOptions, normalizeMemoizeOptions } from './memoize.function.options.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoize = <F extends (...args: any) => unknown, T = unknown>(
	fn: F,
	rawOptions?: MemoizeOptions<Parameters<F>, T>
): Fn<Parameters<F>, ReturnType<F>> => {
	const options = normalizeMemoizeOptions(rawOptions);
	const cache = new Map<string, ReturnType<F>>();
	const dropQueue: string[] = [];

	return (...args: Parameters<F>): ReturnType<F> => {
		const argsHash = options.argHasher(args);

		// Checking for the existence of a key instead of straight-up using get
		// and checking if it's nullish or not prevents nullish results from
		// being cached.
		if (cache.has(argsHash)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return cache.get(argsHash)!;
		} else {
			// eslint-disable-next-line prefer-spread
			const result = fn.apply(options.thisContext, args) as ReturnType<F>;

			cache.set(argsHash, result);

			dropQueue.push(argsHash);
			if (options.maxCacheEntries > 0 && dropQueue.length > options.maxCacheEntries) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const cacheToDrop = dropQueue.shift()!;
				cache.delete(cacheToDrop);
			}

			return result;
		}
	};
};
