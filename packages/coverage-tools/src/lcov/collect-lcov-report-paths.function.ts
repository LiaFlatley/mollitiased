import {
	collectWorkspacePackages,
	getWorkspaceRoot,
	NODE_MODULES_DIRECTORY_NAME,
} from '@alexaegis/workspace-tools';
import { globby } from 'globby';
import {
	CollectLcovReportPathsOptions,
	normalizeCollectLcovReportPathsOptions,
} from './collect-lcov-report-paths.function.options.js';

export const LCOV_INFO_FILE_NAME = 'lcov.info';

export const collectLcovReportPaths = async (
	rawOptions?: CollectLcovReportPathsOptions
): Promise<string[]> => {
	const options = normalizeCollectLcovReportPathsOptions(rawOptions);
	const workspaceRoot = await getWorkspaceRoot(options.cwd);

	const workspacePackages = await collectWorkspacePackages({
		...options,
		skipWorkspaceRoot: true,
	});

	const lcovPathResults = await Promise.all(
		workspacePackages.map((workspacePackage) =>
			globby([`${workspacePackage.path}/**/${LCOV_INFO_FILE_NAME}`], {
				absolute: true,
				onlyFiles: true,
				cwd: workspaceRoot,
				ignore: [`**/${NODE_MODULES_DIRECTORY_NAME}`],
			})
		)
	);

	return lcovPathResults.flat();
};
