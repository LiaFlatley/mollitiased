import { describe, expect, it } from 'vitest';
import { createLogger } from './create-logger.function.js';
import { defaultLoggerSettings } from './default-logger-settings.const.js';

describe('createLogger', () => {
	it('should create a tslog Logger with the default options', () => {
		const logger = createLogger();

		expect(logger).toBeDefined();
		expect(logger.settings).toContain(defaultLoggerSettings);
	});
});
