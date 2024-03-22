export interface MemoizeOptions<A, T = unknown> {
	/**
	 * @default undefined
	 */
	thisContext?: T | undefined;
	/**
	 *
	 * @default JSON.stringify
	 */
	argHasher?: (args: A) => string;
	/**
	 * @default 10
	 */
	maxCacheEntries?: number;
}

export type NormalizedMemoizeOptions<A, T = unknown> = Required<
	Omit<MemoizeOptions<A, T>, 'thisContext'>
> &
	Pick<MemoizeOptions<A, T>, 'thisContext'>;

export const normalizeMemoizeOptions = <A, T>(
	options?: MemoizeOptions<A, T>
): NormalizedMemoizeOptions<A, T> => {
	return {
		argHasher: options?.argHasher ?? JSON.stringify,
		thisContext: options?.thisContext,
		maxCacheEntries: options?.maxCacheEntries ?? 10,
	};
};
