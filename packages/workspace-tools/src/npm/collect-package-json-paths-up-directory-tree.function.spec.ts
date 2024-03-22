import { join } from 'node:path/posix';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/fs.js';
import { collectPackageJsonPathsUpDirectoryTree } from './collect-package-json-paths-up-directory-tree.function.js';

vi.mock('fs');

describe('collectPackageJsonPathsUpDirectoryTree', () => {
	afterAll(() => {
		vi.resetAllMocks();
		vi.unmock('node:fs');
	});

	it('should find nothing when not in a workspace', () => {
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree('/foo');
		expect(foundPackageJsons).toEqual([]);
	});

	it('should be able to return the root of the workspace from the root', () => {
		const testPath = mockProjectRoot;
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree(testPath);
		expect(foundPackageJsons).toEqual([mockProjectRoot]);
	});

	it('should be able to walk from zed', () => {
		const testPath = join(mockProjectRoot, 'packages', 'zed');
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree(testPath);
		expect(foundPackageJsons).toEqual([mockProjectRoot, testPath]);
	});

	it('should be able to walk from zod', () => {
		const testPath = join(mockProjectRoot, 'packages', 'zod');
		const foundPackageJsons = collectPackageJsonPathsUpDirectoryTree(testPath);
		expect(foundPackageJsons).toEqual([mockProjectRoot, testPath]);
	});
});
