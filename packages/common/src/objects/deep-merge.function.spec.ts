import { describe, expect, it } from 'vitest';
import { deepMerge } from './deep-merge.function.js';

describe('deepMerge', () => {
	it('should be able to merge multiple shallow objects and mutate the target', () => {
		const target = { a: 'a' };
		const source1 = { b: 'b' };
		const source2 = { c: 'c' };

		const result = deepMerge(target, source1, source2);
		const expected = { a: 'a', b: 'b', c: 'c' };

		expect(result).toEqual(expected);
		expect(result).toBe(target);
	});

	it('should be able to merge deeper objects and mutate the target', () => {
		const target = { a: 'a', deep: { foo: 'foo' } };
		const source1 = { b: 'b', another: {} };
		const source2 = { c: 'c', deep: { bar: 'bar' } };

		const result = deepMerge(target, source1, source2);
		const expected = { a: 'a', b: 'b', c: 'c', deep: { foo: 'foo', bar: 'bar' }, another: {} };

		expect(result).toEqual(expected);
		expect(result).toBe(target);
	});

	it('should be able to delete items that are explicitly undefined in the sources', () => {
		const target = { a: 'a', deleteMe: 'delete', keepMeHere: 'keepMeHere' };
		const source = { deleteMe: undefined };

		const result = deepMerge(target, source);
		const expected = { a: 'a', keepMeHere: 'keepMeHere' };

		expect(result).toEqual(expected);
		expect(result).toBe(target);
	});
});
