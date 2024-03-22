import { describe, expect, it } from 'vitest';
import { identity, identityAsync } from './identity.function.js';

describe('identity', () => {
	describe('sync', () => {
		it('should return undefined by default', () => {
			expect(identity()).toBeUndefined();
		});

		it('should return what you pass to it', () => {
			const foo = 'foo';
			expect(identity(foo)).toBe(foo);
		});
	});

	describe('async', () => {
		it('should return undefined by default', async () => {
			expect(await identityAsync()).toBeUndefined();
		});

		it('should return what you pass to it', async () => {
			const foo = 'foo';
			expect(await identityAsync(foo)).toBe(foo);
		});
	});
});
