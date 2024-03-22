export interface ForceOption {
	/**
	 * Ignore caches, guards, overwrite files
	 *
	 * @default false
	 */
	force?: boolean;
}

export type NormalizedForceOption = Required<ForceOption>;

export const normalizeForceOption = (options?: ForceOption): NormalizedForceOption => {
	return {
		force: options?.force ?? false,
	};
};
