import type { ObjectKeyOrder } from '@alexaegis/common';
import { DEFAULT_PACKAGE_JSON_SORTING_PREFERENCE } from '../package-json/default-package-json-order.const.js';
import {
	DistributeInWorkspaceOptions,
	NormalizedDistributeInWorkspaceOptions,
	normalizeDistributeInWorkspaceOptions,
} from './distribute-in-workspace.options.js';

export type DistributePackageJsonItemsInWorkspaceOnlyOptions = {
	sortingPreference?: ObjectKeyOrder;
};

export type DistributePackageJsonItemsInWorkspaceOptions =
	DistributePackageJsonItemsInWorkspaceOnlyOptions & DistributeInWorkspaceOptions;

export type NormalizedDistributePackageJsonItemsInWorkspaceOptions =
	Required<DistributePackageJsonItemsInWorkspaceOptions> & NormalizedDistributeInWorkspaceOptions;

export const normalizeDistributePackageJsonItemsInWorkspaceOptions = (
	options?: DistributePackageJsonItemsInWorkspaceOptions
): NormalizedDistributePackageJsonItemsInWorkspaceOptions => {
	return {
		...normalizeDistributeInWorkspaceOptions(options),
		sortingPreference: options?.sortingPreference ?? DEFAULT_PACKAGE_JSON_SORTING_PREFERENCE,
	};
};
