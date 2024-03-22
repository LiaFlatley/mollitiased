import {
	DryOption,
	ForceOption,
	NormalizedDryOption,
	NormalizedForceOption,
	normalizeDryOption,
	normalizeForceOption,
} from '@alexaegis/common';
import {
	CollectWorkspacePackagesOptions,
	normalizeCollectWorkspacePackagesOptions,
	NormalizedCollectWorkspacePackagesOptions,
} from './collect-workspace-packages.function.options.js';

export type DistributeInWorkspaceOptions = CollectWorkspacePackagesOptions &
	DryOption &
	ForceOption;

export type NormalizedDistributeInWorkspaceOptions = NormalizedCollectWorkspacePackagesOptions &
	NormalizedDryOption &
	NormalizedForceOption;

export const normalizeDistributeInWorkspaceOptions = (
	options?: DistributeInWorkspaceOptions
): NormalizedDistributeInWorkspaceOptions => {
	return {
		...normalizeCollectWorkspacePackagesOptions(options),
		...normalizeDryOption(options),
		...normalizeForceOption(options),
		dependencyCriteria: options?.dependencyCriteria ?? [],
		onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
		skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
	};
};
