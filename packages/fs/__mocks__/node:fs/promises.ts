import type { PathLike } from 'node:fs';
import { vi } from 'vitest';

export const mockWriteFile = vi.fn<[PathLike, unknown], Promise<void>>();

export const writeFile = vi.fn(async (path: PathLike, data: unknown): Promise<void> => {
	mockWriteFile(path, data);
});
