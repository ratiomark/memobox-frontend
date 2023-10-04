// import axios from 'axios';
// import { KEY_USER_ID_LOCAL_STORAGE, KEY_USER_LOCAL_STORAGE } from '@/shared/const/localStorage';



// export const $api = axios.create({
// 	baseURL: __API__,
// 	// изначально заголовочная часть была тут, но перенес ее в интерцептор
// 	// headers: {
// 	// 	authorization: localStorage.getItem(KEY_USER_LOCAL_STORAGE) || ''
// 	// }
// })

// // создаю интерцептор, который будет отрабатыватся каждый раз перед тем как проходит запрос

// $api.interceptors.request.use((config) => {
// 	if (config.headers) {
// 		config.headers.Authorization = localStorage.getItem(KEY_USER_ID_LOCAL_STORAGE) || ''
// 	}
// 	return config
// })