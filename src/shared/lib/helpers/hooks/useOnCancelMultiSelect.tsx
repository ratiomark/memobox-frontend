import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { getViewPageMultiSelectIsActive, getViewPageMoveCardsModalIsOpen, viewPageActions } from '@/features/ViewPageInitializer';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';


// interface useDeleteWithCountdownProps {
// 	deletionFn: () => void
// 	startCondition: boolean
// 	duration: number
// }

export const useOnCancelMultiSelect = () => {
	// export const useOnCancelMultiSelect = (props: useDeleteWithCountdownProps) => {
	const dispatch = useAppDispatch()
	// const isMultiSelectActive = useSelector(getViewPageMultiSelectIsActive)
	// const isMoveCardsModalOpen = useSelector(getViewPageMoveCardsModalIsOpen)

	const onCancelMultiSelect = useCallback(() => {
		dispatch(viewPageActions.cancelMultiSelect())
	}, [dispatch])

	// useHotkeys('esc', onCancelMultiSelect, { enabled: isMultiSelectActive && !isMoveCardsModalOpen })

	return onCancelMultiSelect
}