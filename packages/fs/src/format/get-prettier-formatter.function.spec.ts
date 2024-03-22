import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { mockPrettierFormat, mockPrettifiedJson } from '../mocks.js';
import { getPrettierFormatter } from './get-prettier-formatter.function.js';

describe('getPrettierFormatter', () => {
	describe('when prettier is present', () => {
		beforeAll(() => {
			// 'prettier' is dynamically imported so it can be dynamically mocked
			vi.doMock('prettier');
		});

		afterAll(() => {
			vi.doUnmock('prettier');
		});

		it('should return a function', async () => {
			const formatter = await getPrettierFormatter();
			expect(typeof formatter).toEqual('function');
		});

		it('should return a formatted json', async () => {
			const formatter = await getPrettierFormatter({ parser: 'json' });
			const input = '{"foo": "hello",  "bar": 2}';

			expect(formatter(input)).toEqual(mockPrettifiedJson);
			expect(mockPrettierFormat).toHaveBeenCalledOnce();
		});
	});

	describe('when prettier is not present', () => {
		beforeAll(() => {
			vi.doMock('prettier', () => {
				return {};
			});
		});

		afterAll(() => {
			vi.doUnmock('prettier');
		});

		it('should return a function', async () => {
			const formatter = await getPrettierFormatter();
			expect(typeof formatter).toEqual('function');
		});

		it('should return strings as is', async () => {
			const formatter = await getPrettierFormatter({ parser: 'json' });
			const input = '{im: not: even, making, sense}';
			expect(formatter(input)).toEqual(input);
		});
	});
});
