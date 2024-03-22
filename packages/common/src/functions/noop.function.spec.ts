import { describe, expect, it } from 'vitest';
import { noop, noopAsync } from './noop.function.js';

describe('noop', () => {
	describe('noop', () => {
		it('should return undefined', () => {
			expect(noop()).toBeUndefined();
		});
	});

	describe('noopPromise', () => {
		it('should return undefined asynchronously', async () => {
			expect(await noopAsync()).toBeUndefined();
		});
	});
});
