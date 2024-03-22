import { describe, expect, it } from 'vitest';
import { yes, yesAsync } from './yes.function.js';

describe('yes', () => {
	describe('sync', () => {
		it('should return true', () => {
			expect(yes()).toBeTruthy();
		});
	});

	describe('async', () => {
		it('should return true', async () => {
			expect(await yesAsync()).toBeTruthy();
		});
	});
});
