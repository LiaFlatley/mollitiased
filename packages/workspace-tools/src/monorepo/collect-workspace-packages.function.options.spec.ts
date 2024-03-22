import { noopLogger } from '@alexaegis/logging';
import { describe, expect, it, vi } from 'vitest';
import {
	CollectWorkspacePackagesOptions,
	normalizeCollectWorkspacePackagesOptions,
	NormalizedCollectWorkspacePackagesOptions,
} from './collect-workspace-packages.function.options.js';

const mockCwd = '/cwd';
vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);

describe('normalizeCollectWorkspacePackagesOptions', () => {
	it('should have a default when not defined', () => {
		expect(normalizeCollectWorkspacePackagesOptions()).toEqual({
			cwd: mockCwd,
			onlyWorkspaceRoot: false,
			skipWorkspaceRoot: false,
			dependencyCriteria: [],
			logger: noopLogger,
		} as NormalizedCollectWorkspacePackagesOptions);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: CollectWorkspacePackagesOptions = {
			cwd: '/foo/bar',
			onlyWorkspaceRoot: false,
			skipWorkspaceRoot: false,
			dependencyCriteria: [],
			logger: noopLogger,
		};
		expect(normalizeCollectWorkspacePackagesOptions(manualOptions)).toEqual(manualOptions);
	});
});
