import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { mockWriteFile } from '../../__mocks__/node:fs/promises.js';
import { mockPrettierFormat, mockPrettifiedJson } from '../mocks.js';

import { writeJson } from './write-json.function.js';

vi.mock('prettier');
vi.mock('node:fs/promises');

describe('writeJson', () => {
	const testJson = {
		foo: { bar: 1, zed: 'hello' },
	};

	const testFileName = 'test.json';

	afterEach(() => {
		vi.clearAllMocks();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should write the prettified result by default', async () => {
		await writeJson(testJson, testFileName);
		expect(mockPrettierFormat).toHaveBeenCalledOnce();
		expect(mockWriteFile).toHaveBeenCalledWith(testFileName, mockPrettifiedJson);
	});

	it('should write the stringified form of the object when not prettified', async () => {
		await writeJson(testJson, testFileName, { autoPrettier: false });
		expect(mockPrettierFormat).not.toHaveBeenCalled();
		expect(mockWriteFile).toHaveBeenCalledWith(testFileName, JSON.stringify(testJson));
	});

	it('should not write when dry but still format when enabled', async () => {
		await writeJson(testJson, testFileName, { autoPrettier: true, dry: true });
		expect(mockPrettierFormat).toHaveBeenCalledOnce();
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it('should not write when dry and not even format when disabled', async () => {
		await writeJson(testJson, testFileName, { autoPrettier: false, dry: true });
		expect(mockPrettierFormat).not.toHaveBeenCalled();
		expect(mockWriteFile).not.toHaveBeenCalled();
	});
});
