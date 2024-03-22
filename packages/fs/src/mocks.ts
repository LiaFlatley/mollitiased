import type { Options } from 'prettier';
import { vi } from 'vitest';

export const mockPrettifiedJson = 'prettyJson';
export const mockPrettierFormat = vi.fn<[string, Options], string | undefined>(
	(_data: string) => mockPrettifiedJson
);

export const mockPrettier = () => {
	return {
		format: mockPrettierFormat,
		resolveConfig: vi.fn<[string], Promise<Options>>(),
	};
};
