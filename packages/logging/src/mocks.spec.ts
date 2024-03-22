import { describe, expect, it } from 'vitest';
import {
	mockLogger,
	mockTsLogAttachTransport,
	mockTsLogDebug,
	mockTsLogError,
	mockTsLogFatal,
	mockTsLogGetSubLogger,
	mockTsLogInfo,
	mockTsLogLog,
	mockTsLogSilly,
	mockTsLogTrace,
	mockTsLogWarn,
} from './mocks.js';

describe('mocks', () => {
	it('should exist', () => {
		expect(mockLogger).toBeDefined();

		expect(mockTsLogSilly()).toBeUndefined();
		expect(mockTsLogTrace()).toBeUndefined();
		expect(mockTsLogDebug()).toBeUndefined();
		expect(mockTsLogLog()).toBeUndefined();
		expect(mockTsLogInfo()).toBeUndefined();
		expect(mockTsLogWarn()).toBeUndefined();
		expect(mockTsLogFatal()).toBeUndefined();
		expect(mockTsLogError()).toBeUndefined();
		expect(mockTsLogAttachTransport()).toBeUndefined();
		expect(mockTsLogGetSubLogger()).toBe(mockLogger);
	});
});
