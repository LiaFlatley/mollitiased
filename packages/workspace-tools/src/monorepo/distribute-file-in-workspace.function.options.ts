import {
	DistributeInWorkspaceOptions,
	NormalizedDistributeInWorkspaceOptions,
	normalizeDistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

interface DistributeFileInWorkspaceOnlyOptions {
	/**
	 * Instead of copying file, just symlink them.
	 *
	 * @default false
	 */
	symlinkInsteadOfCopy?: boolean;
}

export type DistributeFileInWorkspaceOptions = DistributeFileInWorkspaceOnlyOptions &
	DistributeInWorkspaceOptions;

export type NormalizedDistributeFileInWorkspaceOptions =
	Required<DistributeFileInWorkspaceOnlyOptions> & NormalizedDistributeInWorkspaceOptions;

export const normalizeDistributeFileInWorkspaceOptions = (
	options?: DistributeFileInWorkspaceOptions
): NormalizedDistributeFileInWorkspaceOptions => {
	return {
		...normalizeDistributeInWorkspaceOptions(options),
		symlinkInsteadOfCopy: options?.symlinkInsteadOfCopy ?? false,
	};
};
