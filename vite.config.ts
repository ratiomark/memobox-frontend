import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import visualizer from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
// https://stackoverflow.com/questions/73273017/when-i-run-vite-preview-i-get-the-bundle-size-of-300kb-and-when-i-run-vite-build
export default defineConfig({
	plugins: [
		visualizer(),
		react(),
		svgr({
			exportAsDefault: true,
			svgrOptions: {
				icon: true,
				svgoConfig: {
					plugins: [
						{
							name: 'convertColors',
							params: {
								currentColor: true
							}
						}
					]
				}
			}
		})
	],
	resolve: {
		alias: [
			{ find: '@', replacement: '/src' }
		]
	},
	build: {
		sourcemap: 'hidden',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('/lexical-playground/')) {
						return 'lexical';
					}
				}
			}
		}
		// rollupOptions: {
		// 	output: {
		// 		manualChunks(id) {
		// 			if (id.includes('node_modules')) {
		// 				// Разделите node_modules на свой собственный чанк
		// 				return 'vendor';
		// 			} else if (id.includes('common')) {
		// 				// Разделите общий код на свой собственный чанк
		// 				return 'common';
		// 			} else {
		// 				// Оставьте все остальное в основном чанке
		// 				return 'main';
		// 			}
		// 		}
		// 	}
		// }
	},
	define: {
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify('http://localhost:8000'),
		__PROJECT__: JSON.stringify('frontend')
	}
})
