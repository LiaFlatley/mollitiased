import { LogLevel } from './log-level.enum.js';

export interface LogLevelOption {
	/**
	 * A minimum logLevel
	 *
	 * @default LogLevel.OFF
	 */
	logLevel?: LogLevel;
}

export type NormalizedLogLevelOption = Required<LogLevelOption>;

export const normalizeLogLevelOption = (options?: LogLevelOption): NormalizedLogLevelOption => {
	return {
		logLevel: options?.logLevel ?? LogLevel.OFF,
	};
};
