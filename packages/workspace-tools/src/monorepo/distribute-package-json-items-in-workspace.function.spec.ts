import { writeJson } from '@alexaegis/fs';
import { mockLogger } from '@alexaegis/logging/mocks';
import { join } from 'node:path/posix';

import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/fs.js';
import { PackageJson, PACKAGE_JSON_NAME } from '../index.js';
import { distributePackageJsonItemsInWorkspace } from './distribute-package-json-items-in-workspace.function.js';

const mockPackageJsonWorkspaceValue: PackageJson = {
	name: 'workspace',
	workspaces: ['packages/*'],
};

const mockPackageJsonZedValue: PackageJson = {
	name: 'zed',
	dependencies: { foo: '1.0.0', bar: '0.5.0' },
	scripts: {
		whoami: 'echo I am someone else',
	},
};

const mockPackageJsonZodValue: PackageJson = {
	name: 'zod',
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

	const mockWriteJson = vi.fn<[Record<string, unknown>, string], Promise<void>>(
		async (_o: Record<string, unknown>, _path: string) => undefined
	);

	return {
		readJson: mockReadJson,
		readYaml: mockReadYaml,
		writeJson: mockWriteJson,
		normalizeCwdOption: await vi
			.importActual<typeof import('@alexaegis/fs')>('@alexaegis/fs')
			.then((mod) => mod.normalizeCwdOption),
	};
});

vi.mock('globby');
vi.mock('fs');
vi.mock('node:fs/promises');

describe('distributePackageJsonItemsInWorkspace', async () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('distributing dependencies and template variables', () => {
		const updates: PackageJson = {
			dependencies: {
				bar: '1.0.0',
			},
			scripts: {
				whoami: 'echo I am ${packageName}',
			},
		};

		it('should mix in the distributed dependencies into all packageJson files', async () => {
			await distributePackageJsonItemsInWorkspace(updates, {
				cwd: mockProjectRoot,
				logger: mockLogger,
			});

			expect(writeJson).toHaveBeenCalledWith(
				{
					name: 'workspace',
					dependencies: {
						bar: '1.0.0',
					},
					scripts: {
						whoami: 'echo I am workspace',
					},
					workspaces: ['packages/*'],
				},
				'/foo/bar/package.json',
				expect.anything()
			);

			expect(writeJson).toHaveBeenCalledWith(
				{
					name: 'zed',
					dependencies: {
						bar: '1.0.0',
						foo: '1.0.0',
					},
					scripts: {
						whoami: 'echo I am zed',
					},
				},
				'/foo/bar/packages/zed/package.json',
				expect.anything()
			);

			expect(writeJson).toHaveBeenCalledWith(
				{
					name: 'zod',
					dependencies: {
						bar: '1.0.0',
						foo: '1.0.0',
					},
					scripts: {
						whoami: 'echo I am zod',
					},
				},
				'/foo/bar/packages/zod/package.json',
				expect.anything()
			);
		});

		it('should mix in the distributed dependencies into only the inner packageJson files when skipping the workspace', async () => {
			await distributePackageJsonItemsInWorkspace(updates, {
				cwd: mockProjectRoot,
				logger: mockLogger,
				skipWorkspaceRoot: true,
			});

			expect(writeJson).not.toHaveBeenCalledWith(
				expect.anything(),
				'/foo/bar/package.json',
				expect.anything()
			);

			expect(writeJson).toHaveBeenCalledWith(
				{
					name: 'zed',
					dependencies: {
						bar: '1.0.0',
						foo: '1.0.0',
					},
					scripts: {
						whoami: 'echo I am zed',
					},
				},
				'/foo/bar/packages/zed/package.json',
				expect.anything()
			);

			expect(writeJson).toHaveBeenCalledWith(
				{
					name: 'zod',
					dependencies: {
						bar: '1.0.0',
						foo: '1.0.0',
					},
					scripts: {
						whoami: 'echo I am zod',
					},
				},
				'/foo/bar/packages/zod/package.json',
				expect.anything()
			);
		});

		it('should mix in the distributed dependencies into only the workspace packageJson file when onlyWorkspaceRoot is true', async () => {
			await distributePackageJsonItemsInWorkspace(updates, {
				cwd: mockProjectRoot,
				logger: mockLogger,
				onlyWorkspaceRoot: true,
			});

			expect(writeJson).toHaveBeenCalledWith(
				{
					name: 'workspace',
					dependencies: {
						bar: '1.0.0',
					},
					scripts: {
						whoami: 'echo I am workspace',
					},
					workspaces: ['packages/*'],
				},
				'/foo/bar/package.json',
				expect.anything()
			);

			expect(writeJson).not.toHaveBeenCalledWith(
				expect.anything(),
				'/foo/bar/packages/zed/package.json',
				expect.anything()
			);

			expect(writeJson).not.toHaveBeenCalledWith(
				expect.anything(),
				'/foo/bar/packages/zod/package.json',
				expect.anything()
			);
		});

		it('should not do anything when dry', async () => {
			await distributePackageJsonItemsInWorkspace(updates, {
				cwd: mockProjectRoot,
				logger: mockLogger,
				dry: true,
			});

			expect(writeJson).toHaveBeenCalledWith(expect.anything(), expect.anything(), {
				dry: true,
			});
		});

		it('should report errors to the logger when write fails', async () => {
			(writeJson as Mock).mockImplementationOnce(async () => {
				throw new Error('Error');
			});

			await distributePackageJsonItemsInWorkspace(updates, {
				cwd: mockProjectRoot,
				logger: mockLogger,
			});

			expect(mockLogger.error).toHaveBeenCalled();
		});
	});
});
