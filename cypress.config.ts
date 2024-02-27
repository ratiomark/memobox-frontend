import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
	e2e: {
		setupNodeEvents(on) {
			on(
				'file:preprocessor',
				vitePreprocessor({
					configFile: './vite.config.ts',
					mode: 'development',

				}),
			)
		},
		baseUrl: 'http://localhost:5173',
		viewportWidth: 1920,
		viewportHeight: 1080,
		supportFile: false,
	},
})

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
