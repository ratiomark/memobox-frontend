import { KEY_USER_TOKEN_LOCAL_STORAGE, KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { RefreshResponse } from '../types/responses';

export function isRefreshResponse(object: any): object is RefreshResponse {
	return (
		object !== null &&
		typeof object === 'object' &&
		typeof object[KEY_USER_TOKEN_LOCAL_STORAGE] === 'string' &&
		typeof object[KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE] === 'string'
	);
}