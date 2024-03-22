import { describe, expect, it } from 'vitest';
import { deepMapObject } from './deep-map-object.function.js';

describe('deepMapObject', () => {
	it('should map values deeply', () => {
		const original = {
			foo: 1,
			bar: 'hello',
			baz: 'hola',
			deeper: {
				zed: 'hello',
				zod: 'hola',
				yon: 2,
			},
		};

		const copyOfOriginal = structuredClone(original);

		const mappedObject = deepMapObject(original, (key, value) => {
			if (typeof value === 'string') {
				return `${value} ${key}!`;
			}
		});

		expect(original).toEqual(copyOfOriginal);
		expect(mappedObject).not.toBe(original);
		expect(mappedObject).toEqual({
			foo: 1,
			bar: 'hello bar!',
			baz: 'hola baz!',
			deeper: {
				zed: 'hello zed!',
				zod: 'hola zod!',
				yon: 2,
			},
		});
	});
});
