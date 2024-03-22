import type { CollectWorkspacePackagesOptions } from '@alexaegis/workspace-tools';

export const mergeLcovReportsInWorkspace = async (
	_rawOptions?: CollectWorkspacePackagesOptions
): Promise<string> => {
	return 'lcov';
};
