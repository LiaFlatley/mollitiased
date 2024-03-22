import { afterEach, beforeAll, describe, expect, it, SpyInstance, vi } from 'vitest';
import { normalizeCwdOption, NormalizedCwdOption } from './cwd.option.js';

export const mockProcessCwdValue = '/foo';

export const mockProcessCwd = (): SpyInstance => {
	return vi.spyOn(process, 'cwd').mockReturnValue(mockProcessCwdValue);
};

describe('cwdOption', () => {
	let processCwdSpy: SpyInstance;

	beforeAll(() => {
		processCwdSpy = mockProcessCwd();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should default to process.cwd() when not defined', () => {
		expect(normalizeCwdOption()).toEqual({
			cwd: mockProcessCwdValue,
		} as NormalizedCwdOption);

		expect(processCwdSpy).toHaveBeenCalled();
	});

	it('should not call process.cwd() when cwd is overridden', () => {
		const cwdOverride = './foo';
		expect(normalizeCwdOption({ cwd: cwdOverride })).toEqual({
			cwd: cwdOverride,
		} as NormalizedCwdOption);

		expect(processCwdSpy).not.toHaveBeenCalled();
	});
});
