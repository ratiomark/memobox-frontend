import { defineConfig } from 'cypress';
import { resolve } from 'path'
import vitePreprocessor from 'cypress-vite'
import fs from 'fs';

export default defineConfig({
	e2e: {
		trashAssetsBeforeRuns: true,
		video: true,
		videosFolder: 'cypress/video-test',
		// screenshotsFolder: 'cypress/screenshots-test',
		setupNodeEvents(on, config) {
			// Настройка препроцессора файлов
			on('file:preprocessor', vitePreprocessor({
				// configFile: resolve(__dirname, './vite.config.cypress.ts'),
				mode: 'development',
				build: {
					sourcemap: 'inline',
				},
				resolve: {
					alias: [
						{ find: '@', replacement: '/src' },
						{ find: '#', replacement: '/cypress' },
					]
				},
			}));

			// Обработчик для удаления видео, если в тестах нет ошибок
			on('after:spec', (spec, results) => {
				if (results && results.video) {
					// Проверяем, есть ли неудачные попытки выполнения тестов
					const failures = results.tests.some((test) =>
						test.attempts.some((attempt) => attempt.state === 'failed')
					);
					if (!failures) {
						// Удаляем видео, если все тесты в спецификации прошли успешно и не было перезапусков
						fs.unlinkSync(results.video);
					}
				}
			});
		},
		env: {
			NODE_ENV: JSON.stringify('development'),
			__IS_DEV__: JSON.stringify(true),
			__API__: JSON.stringify('http://localhost:3000/api/v1'),
			__API__BACK: JSON.stringify('https://memobox.tech/api/v1'),
			__PROJECT__: JSON.stringify('frontend')
		},
		baseUrl: 'http://localhost:5173',
		viewportWidth: 1920,
		viewportHeight: 1080,
		specPattern: ['**/*.e2e.ts', '**/*.cy.ts', '**/*.cy.js'],
	},
	env: {
		NODE_ENV: JSON.stringify('development'),
	},
	screenshotsFolder: './cypress/screenshots-test',
	// typescript: {
	// 	configFile: 'cypress/tsconfig.json',
	// },
})
// supportFile: false,

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
