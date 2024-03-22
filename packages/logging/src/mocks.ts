import type { Logger } from 'tslog';
import { vi } from 'vitest';

export const mockTsLogSilly = vi.fn();
export const mockTsLogTrace = vi.fn();
export const mockTsLogDebug = vi.fn();
export const mockTsLogLog = vi.fn();
export const mockTsLogInfo = vi.fn();
export const mockTsLogWarn = vi.fn();
export const mockTsLogFatal = vi.fn();
export const mockTsLogError = vi.fn();
export const mockTsLogAttachTransport = vi.fn();
export const mockTsLogGetSubLogger = vi.fn(() => mockLogger);

export const mockLogger = {
	silly: mockTsLogSilly,
	trace: mockTsLogTrace,
	debug: mockTsLogDebug,
	log: mockTsLogLog,
	info: mockTsLogInfo,
	warn: mockTsLogWarn,
	fatal: mockTsLogFatal,
	error: mockTsLogError,
	attachTransport: mockTsLogAttachTransport,
	getSubLogger: mockTsLogGetSubLogger,
} as unknown as Logger<unknown>;
