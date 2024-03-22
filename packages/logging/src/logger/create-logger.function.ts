import { deepMerge } from '@alexaegis/common';
import { ISettingsParam, Logger } from 'tslog';
import { defaultLoggerSettings } from './default-logger-settings.const.js';

export const createLogger = <L = unknown>(settings?: ISettingsParam<L>): Logger<L> => {
	return new Logger(deepMerge({} as ISettingsParam<L>, defaultLoggerSettings, settings));
};
