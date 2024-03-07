let localStorageData: { [key: string]: any } = {}
export const saveLocalStorageData = () => {
	Object.keys(window.localStorage).forEach((key) => {
		localStorageData[key] = window.localStorage.getItem(key)
	})
}
export const restoreLocalStorageData = () => {
	Object.keys(localStorageData).forEach((key) => {
		window.localStorage.setItem(key, localStorageData[key])
	})
}
export const clearLocalStorageData = () => {
	localStorageData = {};
};