import { existsSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { PACKAGE_JSON_NAME } from '../package-json/package-json.interface.js';

export const collectPackageJsonPathsUpDirectoryTree = (cwd: string = process.cwd()): string[] => {
	return collectPackageJsonPathsUpDirectoryTreeInternal(cwd);
};

const collectPackageJsonPathsUpDirectoryTreeInternal = (
	cwd: string,
	collection: string[] = []
): string[] => {
	const path = normalize(cwd);

	if (existsSync(join(path, PACKAGE_JSON_NAME))) {
		collection.unshift(path);
	}

	const parentPath = join(path, '..');
	if (parentPath !== path) {
		return collectPackageJsonPathsUpDirectoryTreeInternal(parentPath, collection);
	}

	return collection;
};
