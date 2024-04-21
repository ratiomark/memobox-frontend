import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import visualizer from 'rollup-plugin-visualizer'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
// import path from 'path'
// https://vitejs.dev/config/
// https://stackoverflow.com/questions/73273017/when-i-run-vite-preview-i-get-the-bundle-size-of-300kb-and-when-i-run-vite-build
// eslint-disable-next-line prefer-const
let versionId = '1234'
versionId = new Date().toISOString();

export default defineConfig({
	// base: 'https://memobox.tech/',
	plugins: [
		// visualizer(),
		react(),
		VitePWA({
			minify: true,
			registerType: 'autoUpdate',
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw-custom.ts',

			injectManifest: {
				minify: true,
				sourcemap: false,
				enableWorkboxModulesLogs: true,
			},
			workbox: {
				maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
				sourcemap: false,
				cacheId: versionId,
				swDest: 'dist/sw-custom.js',
			},
			devOptions: {
				enabled: false,
				type: 'module',
			},
			manifest: {
				name: 'Memobox',
				short_name: 'Memobox',
				description: 'Memobox - memorize everything!',
				theme_color: '#33d69f',
				background_color: '#33d69f',
				display: 'standalone',
				icons: [
					{
						src: 'images/favicon_io/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'images/favicon_io/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'images/favicon_io/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'images/favicon_io/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],
			}
		}),
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
		// sourcemap: 'inlinefalse,
		// sourcemap: 'hiddenfalse,
		sourcemap: false,

		rollupOptions: {

			output: {
				manualChunks(id) {
					if (id.includes('/LexicalEditor/')) {
						return 'lexical-editor-chunk';
					}
					// 	// if (id.includes(path.resolve(__dirname, 'src/shared/ui/LexicalEditor/'))) {
					// 	// 	return 'lexical-playground-chunk';
					// 	// }
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
	// в .env нужно указывать переменные с указанным префиксом. VITE_ - дефолтный префикс
	envPrefix: 'VITE_',
	define: {
		__IS_DEV__: JSON.stringify(true),
		// __API__: JSON.stringify('https://memobox-backend.onrender.com/api/v1'),
		// __API__: JSON.stringify('https://qlwh4kww-3000.uks1.devtunnels.ms/api/v1'),
		__API__: JSON.stringify('http://localhost:3000/api/v1'),
		// __API__: JSON.stringify('http://localhost:8000'),
		// NSA: укажи тут адрес сервера
		// __API__BACK: JSON.stringify('http://localhost:3000'),
		// __API__BACK: JSON.stringify('https://memobox-backend.onrender.com/api/v1'),
		__API__BACK: JSON.stringify('https://memobox.tech/api/v1'),
		__PROJECT__: JSON.stringify('frontend'),
		__VAPID_PUBLIC_KEY__: JSON.stringify('BN1AMPF6naRQmxIfr367bePCH_EM7o3q7bf61-CrYKWJJfqfpbUi5n30mFZCiGwggqI65Z4U96dDC7o61Zubric')
	}
})
