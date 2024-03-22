import type { Options } from 'globby';

import { join } from 'node:path/posix';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/fs.js';

import { PackageJson, PACKAGE_JSON_NAME } from '../package-json/package-json.interface.js';
import { collectWorkspacePackages } from './collect-workspace-packages.function.js';

const mockPackageJsonWorkspaceValue: PackageJson = {
	name: 'name',
	workspaces: ['packages/**'],
};

const mockPackageJsonZedValue: PackageJson = {
	name: 'name',
	dependencies: { foo: '1.0.0', bar: '1.0.0' },
};

const mockPackageJsonZodValue: PackageJson = {
	name: 'name',
	dependencies: { foo: '1.0.0' },
};

vi.mock('@alexaegis/fs', async () => {
	const mockReadJson = vi.fn<[string | undefined], Promise<unknown>>(async (path) => {
		if (path?.endsWith(join('zed', PACKAGE_JSON_NAME))) {
			return mockPackageJsonZedValue;
		} else if (path?.endsWith(join('zod', PACKAGE_JSON_NAME))) {
			return mockPackageJsonZodValue;
		} else if (path?.endsWith(PACKAGE_JSON_NAME)) {
			return mockPackageJsonWorkspaceValue;
		} else {
			return undefined;
		}
	});

	const mockReadYaml = vi.fn<[string | undefined], Promise<unknown>>(async (_path) => {
		return undefined;
	});

	return {
		readJson: mockReadJson,
		readYaml: mockReadYaml,
		normalizeCwdOption: await vi
			.importActual<typeof import('@alexaegis/fs')>('@alexaegis/fs')
			.then((mod) => mod.normalizeCwdOption),
	};
});

vi.mock('node:fs', () => {
	return {
		existsSync: vi.fn((path: string) => {
			return (
				path === join(mockProjectRoot, 'packages/zed', PACKAGE_JSON_NAME) ||
				path === join(mockProjectRoot, 'packages/zod', PACKAGE_JSON_NAME) ||
				path === join(mockProjectRoot, PACKAGE_JSON_NAME)
			);
		}),
	};
});

vi.mock('globby', () => {
	return {
		globby: (_patterns: string[], options: Options): string[] => {
			expect(options.absolute).toBeTruthy();
			expect(options.onlyDirectories).toBeTruthy();
			expect(options.cwd).toBe('/foo/bar');
			return ['/foo/bar/packages/zed', '/foo/bar/packages/zod'];
		},
	};
});

describe('collectWorkspacePackages in a multi-package npm workspace', () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should be able to collect all packages in a workspace from a sub package', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo/bar/packages/zed' });
		expect(foundPackageJsons).toEqual([
			{ path: '/foo/bar', packageJson: mockPackageJsonWorkspaceValue },
			{ path: '/foo/bar/packages/zed', packageJson: mockPackageJsonZedValue },
			{ path: '/foo/bar/packages/zod', packageJson: mockPackageJsonZodValue },
		]);
	});

	it('should be able to collect all packages in a workspace from the root', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo/bar' });
		expect(foundPackageJsons).toEqual([
			{ packageJson: mockPackageJsonWorkspaceValue, path: '/foo/bar' },
			{ packageJson: mockPackageJsonZedValue, path: '/foo/bar/packages/zed' },
			{ packageJson: mockPackageJsonZodValue, path: '/foo/bar/packages/zod' },
		]);
	});

	it('should be able to collect packages with specific dependencies being present', async () => {
		const foundPackageJsons = await collectWorkspacePackages({
			cwd: '/foo/bar',
			dependencyCriteria: ['foo', 'bar'],
		});
		expect(foundPackageJsons).toEqual([
			{ packageJson: mockPackageJsonZedValue, path: '/foo/bar/packages/zed' },
		]);
	});

	it('should be able to collect nothing, outside the workspace', async () => {
		const foundPackageJsons = await collectWorkspacePackages({ cwd: '/foo' });
		expect(foundPackageJsons).toEqual([]);
	});
});
