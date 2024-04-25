import { indexedConfigService } from '../common/indexedDBService';

// Функция для выполнения запроса с авторизацией
export const authorizedFetchSW = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
	// Создание заголовков для запроса
	const headers = new Headers(init?.headers);
	const baseUrl = await getBaseUrlFromIndexedDB(); // Получаем базовый URL из IndexedDB
	// Получаем токен и язык пользователя с помощью postMessage и храним их в IndexedDB
	const token = await getTokenFromIndexedDB(); // Функция для получения токена из IndexedDB
	// const userLang = await getLangFromIndexedDB(); // Функция для получения языка из IndexedDB
	console.log(input)
	console.log(baseUrl)
	const url = baseUrl + input;
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}
	console.log(url)
	// headers.set('Accept-Language', userLang);
	// headers.set('x-custom-lang', userLang);
	console.log(init)
	// // Выполнение запроса
	let response = await fetch(url, { ...init, headers });

	// Обработка случая, когда токен необходимо обновить
	if (response.status === 401) {
		const refreshToken = await getRefreshTokenFromIndexedDB(); // Получаем refresh токен
		// Обновляем токен
		const refreshResponse = await fetch(baseUrl + '/auth/refresh', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${refreshToken}`
			}
		});

		if (refreshResponse.ok) {
			const refreshData = await refreshResponse.json();
			await saveTokenToIndexedDB(refreshData.token); // Сохраняем новый токен
			await saveRefreshTokenToIndexedDB(refreshData.refreshToken); // Сохраняем новый refresh токен

			// Повторяем запрос с новым токеном
			headers.set('Authorization', `Bearer ${refreshData.token}`);
			response = await fetch(input, { ...init, headers });
		} else {
			// Обработка ошибки обновления токена
			throw new Error('Unable to refresh token');
		}
	}
	console.log(response)

	return response;
};


async function getBaseUrlFromIndexedDB(): Promise<string> {
	return (await indexedConfigService.getConfig('apiBaseUrl'))!
}

// Заглушки функций для взаимодействия с IndexedDB
async function getTokenFromIndexedDB(): Promise<string> {
	return (await indexedConfigService.getConfig('token'))!
}

async function getLangFromIndexedDB(): Promise<string> {
	return (await indexedConfigService.getConfig('language'))!
}

async function getRefreshTokenFromIndexedDB(): Promise<string> {
	return (await indexedConfigService.getConfig('refreshToken'))!
}

async function saveTokenToIndexedDB(token: string): Promise<void> {
	await indexedConfigService.setConfig('token', token)
}

async function saveRefreshTokenToIndexedDB(refreshToken: string): Promise<void> {
	await indexedConfigService.setConfig('refreshToken', refreshToken)
}

// authorizedFetch('',{ method: 'GET' })