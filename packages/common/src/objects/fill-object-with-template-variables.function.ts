import { deepMapObject } from './deep-map-object.function.js';
import type { SimpleObjectKey } from './struct.type.js';

/**
 * Maps and fills every string value in an object based on a variableMap.
 *
 * If the target object has a string value containing `"${variableName}"`, the
 * corresponding value from the variableMap will be substitued into it.
 */
export const fillObjectWithTemplateVariables = <
	VariableKeys extends SimpleObjectKey,
	T extends Record<string | number, unknown> = Record<string | number, unknown>
>(
	target: T,
	variables: Record<VariableKeys, string>
): T => {
	return deepMapObject(target, (_key, value) => {
		if (typeof value === 'string') {
			return Object.entries<string>(variables).reduce((acc, [variableKey, variableValue]) => {
				return acc.replaceAll('${' + variableKey + '}', variableValue);
			}, value);
		}
	});
};
