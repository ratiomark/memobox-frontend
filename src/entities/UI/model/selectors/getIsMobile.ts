import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getIsMobile = (state: StateSchema) => state.ui.isMobile
// const getIsMobile = () => createSelector(
// 	[
// 		(state: StateSchema) => state
// 	],
// 	(state) => state.ui.isMobile
// )