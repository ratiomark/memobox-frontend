/* eslint-disable custom-fsd-checker-plugin/public-api-imports */
/* eslint-disable custom-fsd-checker-plugin/layer-import-sequence */
import { CardSchemaAfterTraining } from '@/entities/Card/model/api/cardApi';
import { authorizedFetchSW } from './sw-authorized-fetch';

export async function sendTrainingAnswersToServer(data: CardSchemaAfterTraining[]) {
	try {
		const response = await authorizedFetchSW('/cards/training/answers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Указываем тип контента
			},
			body: JSON.stringify({ // Сериализуем данные в JSON
				responses: data
			})
		})
		if (!response.ok) {
			throw new Error('Ошибка при отправке данных на сервер');
		}
		console.log('Данные успешно отправлены');
	} catch (error) {
		console.error('Ошибка при отправке данных на сервер:', error);
	}
}