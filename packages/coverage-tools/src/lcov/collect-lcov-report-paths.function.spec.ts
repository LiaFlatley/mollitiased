import type { CollectWorkspacePackagesOptions, WorkspacePackage } from '@alexaegis/workspace-tools';
import { join } from 'node:path/posix';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { mockProjectRoot } from '../../__mocks__/globby.js';
import { collectLcovReportPaths } from './collect-lcov-report-paths.function.js';

vi.mock('globby');
const cwdSpy = vi.spyOn(process, 'cwd').mockImplementation(() => mockProjectRoot);

vi.mock('@alexaegis/workspace-tools', async () => {
	const actualWorkspaceTools = await vi.importActual<typeof import('@alexaegis/workspace-tools')>(
		'@alexaegis/workspace-tools'
	);

	return {
		getWorkspaceRoot: vi.fn<[], string | undefined>(() => process.cwd()),
		collectWorkspacePackages: vi.fn(
			async (rawOptions?: CollectWorkspacePackagesOptions): Promise<WorkspacePackage[]> => {
				expect(rawOptions?.skipWorkspaceRoot).toBeTruthy();

				const cwd = rawOptions?.cwd ?? process.cwd();

				if (cwd.startsWith(mockProjectRoot)) {
					return [
						{ path: `${mockProjectRoot}/package/zed`, packageJson: {} },
						{ path: `${mockProjectRoot}/package/zod`, packageJson: {} },
					];
				} else {
					return [];
				}
			}
		),
		normalizeCollectWorkspacePackagesOptions:
			actualWorkspaceTools.normalizeCollectWorkspacePackagesOptions,
		NODE_MODULES_DIRECTORY_NAME: actualWorkspaceTools.NODE_MODULES_DIRECTORY_NAME,
	};
});

describe('collectLcovReportPaths', () => {
	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should return paths of all lcov reports in the workspace except at the root', async () => {
		expect(await collectLcovReportPaths()).toEqual([
			join(mockProjectRoot, 'packages/zed/coverage/lcov.info'),
			join(mockProjectRoot, 'packages/zod/coverage/lcov.info'),
		]);
	});

	it('should not find any outside of the project', async () => {
		cwdSpy.mockImplementationOnce(() => '/foo');
		expect(await collectLcovReportPaths()).toEqual([]);
	});
});
