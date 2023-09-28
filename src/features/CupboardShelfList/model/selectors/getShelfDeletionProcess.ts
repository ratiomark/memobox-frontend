import { StateSchema } from '@/app/providers/StoreProvider';
import { EntityId, createSelector } from '@reduxjs/toolkit';
import { getCupboardState } from '../..';
import { RequestStatusType } from '@/shared/types/GeneralTypes';

// export const getShelfDeletionRequestStatus = (state: StateSchema) => state.cupboard.shelfDeletionProcess.requestStatus
// export const getShelfDeletionRequestStatusByShelfId = (state: StateSchema) => state.cupboard.shelfDeletionProcess.requestStatus
export const getShelfDeletionShelfId = (state: StateSchema) => state.cupboard.shelfDeletionProcess.shelfId
export const getShelfDeletionIsAnyShelfInDeletionProcess = (state: StateSchema) => state.cupboard.shelfDeletionProcess.isAnyShelfInDeletionProcess ?? false

export const getShelfIsDeleting = (shelfId: string) => {
	return createSelector(
		[
			(state: StateSchema) => state
		],
		(state) => getCupboardState.selectById(state, shelfId)?.isDeleting
	)
}

export const getShelfIsDeleted = (shelfId: string) => {
	return createSelector(
		[
			(state: StateSchema) => state
		],
		(state) => getCupboardState.selectById(state, shelfId)?.isDeleted
	)
}

export const getShelfDeletionRequestStatus = (id: string | EntityId) => {
	return createSelector(
		[
			(state: StateSchema) => state
		],
		(state) => getCupboardState.selectById(state, id)?.deletingRequestStatus ?? 'idle' as RequestStatusType
	)
}

