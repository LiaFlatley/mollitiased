import type { Options } from 'prettier';
import { normalizePrettifyOptions, PrettifyOptions } from './try-prettify.function.options.js';

/**
 * @returns a function that formats strings with prettier
 */
export const getPrettierFormatter = async (
	rawOptions?: PrettifyOptions
): Promise<(content: string) => string> => {
	const options = normalizePrettifyOptions(rawOptions);
	try {
		const prettier = await import('prettier');

		const prettierConfig = await prettier.default.resolveConfig(options.cwd);
		const prettierOptions: Options = {
			...prettierConfig,
			parser: options.parser,
		};

		return (content) => prettier.default.format(content, prettierOptions);
	} catch {
		return (content) => content;
	}
};
