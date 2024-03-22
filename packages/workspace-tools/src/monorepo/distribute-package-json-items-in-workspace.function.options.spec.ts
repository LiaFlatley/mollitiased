import { noopLogger } from '@alexaegis/logging';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_PACKAGE_JSON_SORTING_PREFERENCE } from '../index.js';
import {
	DistributePackageJsonItemsInWorkspaceOptions,
	NormalizedDistributePackageJsonItemsInWorkspaceOptions,
	normalizeDistributePackageJsonItemsInWorkspaceOptions,
} from './distribute-package-json-items-in-workspace.function.options.js';

const mockCwd = '/foo/bar';

vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);

describe('normalizeDistributePackageJsonItemsInWorkspaceOptions', () => {
	const defaultOptions: NormalizedDistributePackageJsonItemsInWorkspaceOptions = {
		cwd: mockCwd,
		dependencyCriteria: [],
		dry: false,
		force: false,
		logger: noopLogger,
		onlyWorkspaceRoot: false,
		skipWorkspaceRoot: false,
		sortingPreference: DEFAULT_PACKAGE_JSON_SORTING_PREFERENCE,
	} as NormalizedDistributePackageJsonItemsInWorkspaceOptions;

	it('should have a default when not defined', () => {
		expect(normalizeDistributePackageJsonItemsInWorkspaceOptions()).toEqual(defaultOptions);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: DistributePackageJsonItemsInWorkspaceOptions = {
			dry: true,
			sortingPreference: [],
		};
		expect(normalizeDistributePackageJsonItemsInWorkspaceOptions(manualOptions)).toEqual({
			...defaultOptions,
			...manualOptions,
		});
	});
});
