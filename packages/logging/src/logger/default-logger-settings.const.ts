import type { ISettingsParam } from 'tslog';

export const defaultLoggerSettings: ISettingsParam<unknown> = {
	name: 'log',
	prettyLogTemplate: '{{dateIsoStr}}\t{{logLevelName}}:{{nameWithDelimiterPrefix}}\t',
};
