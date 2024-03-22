import { readFile } from 'node:fs/promises';

export const readJson = async <
	T extends Record<string | number, unknown> = Record<string | number, unknown>
>(
	path: string | undefined
): Promise<T | undefined> => {
	if (path === undefined) {
		return undefined;
	}

	const rawJson = await readFile(path, {
		encoding: 'utf8',
	}).catch((error) => {
		console.error('error reading json', error);
		return undefined;
	});

	if (!rawJson) {
		return undefined;
	}

	try {
		return JSON.parse(rawJson);
	} catch {
		return undefined;
	}
};
