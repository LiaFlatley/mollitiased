import { noopLogger } from '@alexaegis/logging';
import { describe, expect, it, vi } from 'vitest';
import {
	DistributeFileInWorkspaceOptions,
	NormalizedDistributeFileInWorkspaceOptions,
	normalizeDistributeFileInWorkspaceOptions,
} from './distribute-file-in-workspace.function.options.js';

const mockCwd = '/foo/bar';

vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);

describe('DistributeFileInWorkspaceOptions', () => {
	const defaultOptions: NormalizedDistributeFileInWorkspaceOptions = {
		cwd: mockCwd,
		dependencyCriteria: [],
		dry: false,
		force: false,
		logger: noopLogger,
		onlyWorkspaceRoot: false,
		skipWorkspaceRoot: false,
		symlinkInsteadOfCopy: false,
	} as NormalizedDistributeFileInWorkspaceOptions;

	it('should have a default when not defined', () => {
		expect(normalizeDistributeFileInWorkspaceOptions()).toEqual(defaultOptions);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: DistributeFileInWorkspaceOptions = {
			dry: true,
		};
		expect(normalizeDistributeFileInWorkspaceOptions(manualOptions)).toEqual({
			...defaultOptions,
			...manualOptions,
		});
	});
});
