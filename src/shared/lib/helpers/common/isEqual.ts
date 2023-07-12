export function isEqual(a: unknown, b: unknown): boolean {
	if (a === b) return true;

	if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
		return false;
	}

	const keysA = Object.keys(a as object);
	const keysB = Object.keys(b as object);

	if (keysA.length !== keysB.length) return false;

	for (const key of keysA) {
		if (!keysB.includes(key)) return false;
		if (typeof (a as any)[key] === 'object' && typeof (b as any)[key] === 'object') {
			if (!isEqual((a as any)[key], (b as any)[key])) return false;
		} else {
			if ((a as any)[key] !== (b as any)[key]) return false;
		}
	}

	return true;
}
