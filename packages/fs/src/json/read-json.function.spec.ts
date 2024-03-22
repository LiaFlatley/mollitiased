import type { PathLike } from 'node:fs';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { readJson } from './read-json.function.js';

const testJson = {
	foo: { bar: 1, zed: 'hello' },
};

describe('readJson', () => {
	beforeAll(() => {
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
		vi.mock('node:fs/promises', async () => {
			return {
				readFile: vi.fn(async (path: PathLike): Promise<string | undefined> => {
					if (path.toString().endsWith('.json')) {
						return JSON.stringify(testJson);
					} else if (path.toString().endsWith('.txt')) {
						return 'hello world!';
					} else if (path.toString() === 'error') {
						throw new Error('File error!');
					} else {
						return undefined;
					}
				}),
			};
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('valid cases', () => {
		it('should return the testJson parsed when read from a file', async () => {
			const result = await readJson<typeof testJson>('test.json');
			expect(result).toEqual(testJson);
		});
	});

	describe('invalid cases', () => {
		it('should return undefined for nonexistent files', async () => {
			const result = await readJson('nonexistent');
			expect(result).toBeUndefined();
		});

		it('should return undefined when the fileReading results in an error', async () => {
			const result = await readJson('error');
			expect(result).toBeUndefined();
		});

		it('should return undefined when no path is given', async () => {
			const result = await readJson(undefined);
			expect(result).toBeUndefined();
		});

		it('should return undefined when when it is not json parsable', async () => {
			const result = await readJson('test.txt');
			expect(result).toBeUndefined();
		});
	});
});
