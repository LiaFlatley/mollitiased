import type { CollectWorkspacePackagesOptions } from '@alexaegis/workspace-tools';
import { mockProjectRoot } from '../../../__mocks__/globby.js';

export const collectLcovReportPaths = async (
	rawOptions?: CollectWorkspacePackagesOptions
): Promise<string[]> => {
	const defaultCwd = mockProjectRoot;
	const cwd = rawOptions?.cwd ?? defaultCwd;

	if (cwd.startsWith(mockProjectRoot)) {
		return [
			'/foo/bar/packages/zed/coverage/lcov.info',
			'/foo/bar/packages/zod/coverage/lcov.info',
		];
	} else {
		return [];
	}
};
