import {
	CollectWorkspacePackagesOptions,
	normalizeCollectWorkspacePackagesOptions,
} from '@alexaegis/workspace-tools';
import { readFile } from 'node:fs/promises';
import { collectLcovReportPaths } from './collect-lcov-report-paths.function.js';

export const mergeLcovReportsInWorkspace = async (
	rawOptions?: CollectWorkspacePackagesOptions
): Promise<string> => {
	const options = normalizeCollectWorkspacePackagesOptions(rawOptions);
	const lcovPaths = await collectLcovReportPaths(rawOptions);

	options.logger.info(
		`found the following lcov files in the workpace:\n\t- ${lcovPaths.join('\n\t- ')}`
	);

	const allLcovReports = await Promise.all(
		lcovPaths.map((path) =>
			readFile(path, {
				encoding: 'utf8',
			})
		)
	);

	return allLcovReports.join('\n');
};
