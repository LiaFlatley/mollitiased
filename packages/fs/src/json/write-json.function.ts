import { writeFile } from 'node:fs/promises';
import { tryPrettify } from '../format/try-prettify.function.js';
import { normalizeWriteJsonOptions, WriteJsonOptions } from './write-json.function.options.js';

export const writeJson = async <
	T extends Record<string | number, unknown> = Record<string | number, unknown>
>(
	data: T,
	path: string,
	rawOptions?: WriteJsonOptions
): Promise<void> => {
	const options = normalizeWriteJsonOptions(rawOptions);

	const rawData = JSON.stringify(data);

	if (options.autoPrettier) {
		const formattedData = await tryPrettify(rawData, { parser: 'json-stringify' });
		if (!options.dry) {
			await writeFile(path, formattedData);
		}
	} else if (!options.dry) {
		await writeFile(path, rawData);
	}
};
