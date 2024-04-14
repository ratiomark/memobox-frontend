export const getBrowserAndOs = () => {
	const userAgent = navigator.userAgent;
	let browserName = 'unknown';
	let osName = 'unknown';

	if (userAgent.match(/chrome|chromium|crios/i)) {
		browserName = 'chrome';
	} else if (userAgent.match(/firefox|fxios/i)) {
		browserName = 'firefox';
	} // Добавьте другие браузеры по необходимости
	console.log(userAgent)
	if (userAgent.match(/android/i)) {
		osName = 'android';
	} else if (userAgent.match(/iphone|ipad|ipod/i)) {
		osName = 'ios';
	} // Добавьте другие ОС по необходимости
	else if (userAgent.match(/Windows/i)) {
		osName = 'windows';
	} // Добавьте другие ОС по необходимости
	return { browserName, osName }
}