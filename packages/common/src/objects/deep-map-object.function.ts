import { isObject } from './is-object.function.js';

export const deepMapObject = <T>(
	o: T,
	mapper: (key: string | number, value: unknown) => unknown | void
): T => {
	const target = structuredClone(o);

	if (isObject(target)) {
		for (const key in target) {
			const value = target[key];
			if (isObject(value)) {
				Object.assign(value, deepMapObject(value, mapper));
			} else {
				Object.assign(target, { [key]: mapper(key, value) ?? value });
			}
		}
	}

	return target;
};
