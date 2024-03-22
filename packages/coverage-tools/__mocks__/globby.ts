import type { Options } from 'globby';
import { join } from 'node:path/posix';
import { expect } from 'vitest';

export const mockProjectRoot = '/foo/bar';

export const globby = async (
	patterns: string[],
	options: Options
): Promise<string[] | undefined> => {
	expect(options.absolute).toBeTruthy();
	expect(options.onlyFiles).toBeTruthy();

	if (patterns.some((pattern) => pattern.includes('zed'))) {
		return [join(mockProjectRoot, 'packages/zed/coverage/lcov.info')];
	} else if (patterns.some((pattern) => pattern.includes('zod'))) {
		return [join(mockProjectRoot, 'packages/zod/coverage/lcov.info')];
	}
};
