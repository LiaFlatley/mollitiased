import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockPrettierFormat, mockPrettifiedJson } from '../mocks.js';

import { tryPrettify } from './try-prettify.function.js';
import type { PrettifyOptions } from './try-prettify.function.options.js';

vi.mock('prettier');

describe('tryPrettify', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should call the function returned by getPrettierFormatter', async () => {
		const unformatted = 'unformattedJson';
		const prettifyOptions: PrettifyOptions = { parser: 'json-stringify' };
		const result = await tryPrettify(unformatted, prettifyOptions);
		expect(result).toEqual(mockPrettifiedJson);

		expect(mockPrettierFormat).toHaveBeenCalledWith(unformatted, prettifyOptions);
	});
});
