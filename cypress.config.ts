import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite'
import { resolve } from 'path'

export default defineConfig({
	e2e: {
		trashAssetsBeforeRuns: true,
		// screenshotsFolder: 'cypress/screenshots-test',
		setupNodeEvents(on) {
			on(
				'file:preprocessor',
				vitePreprocessor({
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
				}),
			)
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
