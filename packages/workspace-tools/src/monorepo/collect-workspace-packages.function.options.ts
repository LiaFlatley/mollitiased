import { CwdOption, normalizeCwdOption, NormalizedCwdOption } from '@alexaegis/fs';
import { LoggerOption, NormalizedLoggerOption, normalizeLoggerOption } from '@alexaegis/logging';

interface CollectWorkspaceOnlyOptions {
	/**
	 * Only return the root workspace package
	 *
	 * @default false
	 */
	onlyWorkspaceRoot?: boolean;

	/**
	 * Skip the root workspace package itself
	 *
	 * @default false
	 */
	skipWorkspaceRoot?: boolean;

	/**
	 * Return only those packages that list these dependencies. When it's not
	 * defined or is an empty array, it will not perform such filtering.
	 *
	 * @default []
	 */
	dependencyCriteria?: string[];
}

export type CollectWorkspacePackagesOptions = CollectWorkspaceOnlyOptions &
	CwdOption &
	LoggerOption;

export type NormalizedCollectWorkspacePackagesOptions = Required<CollectWorkspaceOnlyOptions> &
	NormalizedCwdOption &
	NormalizedLoggerOption;

export const normalizeCollectWorkspacePackagesOptions = (
	options?: CollectWorkspacePackagesOptions
): NormalizedCollectWorkspacePackagesOptions => {
	return {
		...normalizeCwdOption(options),
		...normalizeLoggerOption(options),
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
		dependencyCriteria: options?.dependencyCriteria ?? [],
	};
};
