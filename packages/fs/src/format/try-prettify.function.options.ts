import type { BuiltInParserName } from 'prettier';
import { CwdOption, normalizeCwdOption } from '../directory/cwd.option.js';

export interface PrettifyOptions extends CwdOption {
	/**
	 * Which prettier parser is used
	 *
	 * @default 'babel'
	 */
	parser?: BuiltInParserName;
}

export type NormalizedPrettifyOptions = Required<PrettifyOptions>;

export const normalizePrettifyOptions = (options?: PrettifyOptions): NormalizedPrettifyOptions => {
	return {
		...normalizeCwdOption(options),
		parser: options?.parser ?? 'babel',
	};
};
