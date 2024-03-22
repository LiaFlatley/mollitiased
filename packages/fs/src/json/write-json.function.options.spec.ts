import { describe, expect, it } from 'vitest';
import {
	NormalizedWriteJsonOptions,
	normalizeWriteJsonOptions,
	WriteJsonOptions,
} from './write-json.function.options.js';

describe('WriteJsonFunctionOptions', () => {
	it('should have a default when not defined', () => {
		expect(normalizeWriteJsonOptions()).toEqual({
			autoPrettier: true,
			dry: false,
		} as NormalizedWriteJsonOptions);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: WriteJsonOptions = {
			autoPrettier: false,
			dry: true,
		};
		expect(normalizeWriteJsonOptions(manualOptions)).toEqual(manualOptions);
	});
});
