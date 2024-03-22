import { collectPackageJsonPathsUpDirectoryTree } from './collect-package-json-paths-up-directory-tree.function.js';

/**
 *
 * @param cwd process.cwd()
 * @returns
 */
export const getWorkspaceRoot = (cwd: string = process.cwd()): string | undefined => {
	return collectPackageJsonPathsUpDirectoryTree(cwd)[0];
};
