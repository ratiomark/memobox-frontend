// import AboutIconDeprecated from '@/shared/assets/icon/about-20-20.svg'
// import MainIconDeprecated from '@/shared/assets/icon/main-20-20.svg'
// import ProfileIconDeprecated from '@/shared/assets/icon/profile-20-20.svg'
// import ArticleIconDeprecated from '@/shared/assets/icon/article-20-20.svg'
import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { HeaderItemType } from '../types/items'
import {
	obtainRouteMain,
	obtainRouteSettings,
	obtainRouteStats,
	obtainRouteTrash,
	obtainRouteView,
} from '@/app/providers/router/config/routeConfig/routeConfig'

import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/InfoBook.svg';

// createSelector принимает массив(или просто набор селекторов через запятую) селекторов и функцию преобразования. Если передаю массив, то каждое вычисленное значение селектора будет доступно в аргументах функции по порядку в котором были указаны в массиве
export const getHeaderItems = createSelector(
	[getUserAuthData],
	(userData) => {
		const sidebarItemsList: HeaderItemType[] = [
			{
				path: obtainRouteMain(),
				text: 'cupboard',
				Icon: MainIcon,
			},
			{
				path: '/view',
				text: 'view',
				Icon: AboutIcon,
			},
			{
				path: obtainRouteStats(),
				text: 'stats',
				Icon: MainIcon,
			},
			{
				path: obtainRouteSettings(),
				text: 'settings',
				Icon: AboutIcon,
			},
			{
				path: obtainRouteTrash(),
				text: 'trash',
				Icon: AboutIcon,
			},
		]
		// ссылки только для авторизованных пользователей
		// if (userData) {
		// 	sidebarItemsList.push(
		// 		{
		// 			path: obtainRouteProfile(userData.id),
		// 			text: 'PROFILE PAGE',
		// 			Icon: toggleFeatures({
		// 				name: 'isAppRedesigned',
		// 				off: () => ProfileIconDeprecated,
		// 				on: () => ProfileIcon,
		// 			}),
		// 		},
		// 		{
		// 			path: obtainRouteArticles(),
		// 			text: 'ARTICLES',
		// 			Icon: toggleFeatures({
		// 				name: 'isAppRedesigned',
		// 				off: () => ArticleIconDeprecated,
		// 				on: () => ArticleIcon,
		// 			}),
		// 		},
		// 	)
		// }
		return sidebarItemsList
	}
)

