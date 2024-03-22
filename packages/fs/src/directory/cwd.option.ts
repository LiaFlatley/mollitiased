export interface CwdOption {
	/**
	 * Current working directory
	 *
	 * @default process.cwd()
	 */
	cwd?: string;
}

export type NormalizedCwdOption = Required<CwdOption>;

export const normalizeCwdOption = (options?: CwdOption): NormalizedCwdOption => {
	return {
		cwd: options?.cwd ?? process.cwd(),
	};
};
