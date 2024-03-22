import type { Options } from 'globby';
import { join } from 'node:path/posix';
import { expect } from 'vitest';
import { mockProjectRoot } from './fs.js';

export const globby = async (_patterns: string[], options: Options): Promise<string[]> => {
	expect(options.absolute).toBeTruthy();
	expect(options.onlyDirectories).toBeTruthy();
	expect(options.cwd).toBe(mockProjectRoot);
	return [join(mockProjectRoot, 'packages/zed'), join(mockProjectRoot, 'packages/zod')];
};
