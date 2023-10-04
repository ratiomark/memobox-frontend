import clsx from 'clsx'
import cls from './useHotKeysCardsWidget.module.scss'
import { getViewPageMultiSelectIsActive, getViewPageMoveCardsModalIsOpen, viewPageActions } from '@/features/ViewPageInitializer';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback } from 'react';
import { MultiSelectScreen } from './MultiSelectScreen';

interface useHotKeysCardsWidgetProps {
	className?: string;
}

export const useHotKeysCardsWidget = () => {
	const dispatch = useAppDispatch()
	const isMultiSelectActive = useSelector(getViewPageMultiSelectIsActive)
	const isMoveCardsModalOpen = useSelector(getViewPageMoveCardsModalIsOpen)

	const onCancelMultiSelect = useCallback(() => {
		dispatch(viewPageActions.cancelMultiSelect())
	}, [dispatch])

	const onSelectAllCards = () => {
		// dispatch(viewPageActions.selectAllCards([...cards.map(card => card.id)]))
	}

	const onRemoveCards = useCallback(() => {
		const id = genRandomId()
		dispatch(viewPageActions.setSelectedCardIsDeleted())
		dispatch(viewPageActions.addMultiSelectDeleteIds(id))
		dispatch(viewPageActions.cancelMultiSelect())
	}, [dispatch])


	const onMoveCardsClick = useCallback(() => {
		dispatch(viewPageActions.setMoveCardsModalIsOpen(true))
	}, [dispatch])
	useHotkeys('esc', onCancelMultiSelect, { enabled: isMultiSelectActive && !isMoveCardsModalOpen })
	useHotkeys('a', onSelectAllCards, { enabled: isMultiSelectActive })
	useHotkeys('r', onRemoveCards, { enabled: isMultiSelectActive })
	useHotkeys('m', onMoveCardsClick, { enabled: isMultiSelectActive })

	return (<MultiSelectScreen
		onCancelMultiSelect={onCancelMultiSelect}
		onSelectAllCards={onSelectAllCards}
		onMoveCardsClick={onMoveCardsClick}
		onRemoveCards={onRemoveCards}
	/>)
}