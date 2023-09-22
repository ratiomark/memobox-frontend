import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getCupboardState } from '../slice/cupboardShelfListSlice';

export const getNotificationModalIsOpen = (state: StateSchema) => state.cupboard.notificationShelfModal.isOpen
export const getNotificationModalShelfId = (state: StateSchema) => state.cupboard.notificationShelfModal.shelfId


export const getShelfNotificationSetting = createSelector(
	[
		(state: StateSchema) => state,
		getNotificationModalShelfId,
	],
	(state, shelfId) => getCupboardState.selectById(state, shelfId)?.notificationEnabled ?? true
)