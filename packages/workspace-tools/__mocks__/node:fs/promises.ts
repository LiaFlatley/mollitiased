import type { PathLike, Stats } from 'node:fs';
import { vi } from 'vitest';

export const cpMock = vi.fn<[string, string], Promise<void>>();
export const rmMock = vi.fn<[string, string], Promise<void>>();
export const symlinkMock = vi.fn<[string, string], Promise<void>>();
export const readFileMock = vi.fn(async (_path: PathLike): Promise<string | undefined> => {
	return undefined;
});

export const cp = vi.fn(async (path: string, target: string) => cpMock(path, target));
export const rm = vi.fn(async (path: string, target: string) => rmMock(path, target));
export const symlink = vi.fn(async (path: string, target: string) => symlinkMock(path, target));

export const readFile = vi.fn(async (path: string) => readFileMock(path));

export const lstat = vi.fn(async (path: string) => {
	switch (path) {
		case '/foo/bar/packages/rcfile':
		case '/foo/bar/packages/zed/package.json':
		case '/foo/bar/packages/zod/package.json':
		case '/foo/bar/packages/zed/rcfile': {
			return { isFile: () => true, isSymbolicLink: () => false } as Stats;
		}
		case '/foo/bar/packages/zod/rcfile': {
			return { isSymbolicLink: () => true } as Stats;
		}
		case '/foo/bar/packages/nonfile': {
			return { isFile: () => false } as Stats;
		}
		default: {
			return undefined;
		}
	}
});
