import { SWMessage } from '@/shared/types/SW-types';

export const postMessageToSW = (message: SWMessage) => {
	if (navigator.serviceWorker && navigator.serviceWorker.controller) {
		navigator.serviceWorker.controller.postMessage(message);
	}
}