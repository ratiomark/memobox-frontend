import { PostData, PostHog } from 'posthog-js';

let posthog: PostHog;

export const loadAnalytics = () => {
	if (!posthog) {
		import('posthog-js').then((module) => {
			posthog = module.default;
			// posthog.init('phc_TAy2XeA2qDuEh9Zoh8idzH5n75vPtYNN13ZAjEPx7O9', { api_host: 'https://us.i.posthog.com', autocapture: false });
			posthog.init('phc_TAy2XeA2qDuEh9Zoh8idzH5n75vPtYNN13ZAjEPx7O9', { api_host: 'https://us.i.posthog.com', autocapture: true , capture_pageview: false});
			// posthog.init('phc_TAy2XeA2qDuEh9Zoh8idzH5n75vPtYNN13ZAjEPx7O9', { api_host: 'https://us.i.posthog.com', autocapture: true , capture_pageview: false});
		}).catch(error => {
			console.error('Failed to load PostHog:', error);
		});
	}
}

export const analyticsTrackEvent = (event: string, properties?: object): void => {
	if (posthog) {
		posthog.capture(event, properties);
	} else {
		console.error('PostHog is not yet initialized. Event not tracked:', event);
	}
}

export const analyticsIdentifyUser = (userId: string, properties: object): void => {
	// loadAnalytics();
	if (posthog) {
		posthog.identify(userId, properties);
	} else {
		console.error('PostHog is not yet initialized. User not identified:', userId);
	}

}

export const analyticsLogout = (): void => {
	if (posthog) {
		posthog.capture('user_logged_out');
		posthog.reset();
	} else {
		console.error('PostHog is not yet initialized. Logout not tracked.');
	}
}

// import { PostData, PostHog } from 'posthog-js';

// declare global {
// 	interface Window {
// 		posthog: PostHog
// 	}
// }
// // let posthog: PostHog;

// // function loadPostHog() {
// // 	if (!posthog) {
// // 		import('posthog-js').then((module) => {
// // 			posthog = module.default;
// // 			posthog.init('phc_TAy2XeA2qDuEh9Zoh8idzH5n75vPtYNN13ZAjEPx7O9', { api_host: 'https://us.i.posthog.com' });
// // 		});
// // 	}
// // }

// export const trackEvent = (event: string, properties: object): void => {
// 	if (window && window.posthog) {
// 		window.posthog.capture(event, properties);
// 	} else {
// 		console.error('PostHog is not initialized yet.');
// 	}
// }