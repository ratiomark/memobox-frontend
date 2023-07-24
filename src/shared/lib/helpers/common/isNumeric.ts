export function isNumeric(str: string | number): boolean {
	if (str === '') return false;
	return !isNaN(Number(str));
}