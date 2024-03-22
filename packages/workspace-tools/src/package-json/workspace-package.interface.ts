import type { PackageJson } from '../package-json/package-json.interface.js';

export interface WorkspacePackage {
	path: string;
	packageJson: PackageJson;
}
