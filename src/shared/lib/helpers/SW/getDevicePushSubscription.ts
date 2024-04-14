export const getDevicePushSubscription = async () => {
	const registration = await navigator.serviceWorker.ready;
	const subscription = await registration.pushManager.getSubscription();
	return subscription
}

