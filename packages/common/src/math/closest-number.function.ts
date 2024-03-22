export const closestNumber = (numbers: number[], target: number): number =>
	numbers.reduce((prev, curr) =>
		Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
	);
