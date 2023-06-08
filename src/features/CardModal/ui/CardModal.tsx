import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardModal.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ListBox } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useCallback, useState } from 'react';
import { ReducersList } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { useSelector } from 'react-redux';
import { getCardModal, getCardModalAnswer, getCardModalQuestion } from '../model/selectors/getCardModal';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cardModalActions } from '..';
import { CardModalNewCard } from './CardModalNewCard/CardModalNewCard';

interface CardModalBaseProps {
	className?: string
	shelfId?: string
	onClose: () => void
}

interface CardModalTypeNewCard extends CardModalBaseProps {
	type: 'newCard'
	// onAddNewCard: () => void
}
interface CardModalTypeEditCard extends CardModalBaseProps {
	type: 'editCard'
	isOpen: boolean
	onSaveEditedCard: () => void
}

type CardModalProps =
	| CardModalTypeNewCard
	| CardModalTypeEditCard

// const reducer: ReducersList = {}
export const CardModal = (props: CardModalProps) => {
	const {
		className,
		shelfId,
		// isOpen,
		onClose,
		type,
		// onAddNewCard,
		// onSaveEditedCard
	} = props

	switch (type) {
		case 'newCard':

			return (
				<CardModalNewCard
					// isOpen={isOpen}
					onClose={onClose}
					// shelfId={shelfId}
					className={className}
				/>)

		default:
			break;
	}

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={onClose}
		>
			<div
				className={cls.cardModal}
			>
				<VStack
					className={cls.mainContent}
					max
					align='left'
					gap='gap_32'
				>
					Что-то работает не так как задумано
				</VStack>
			</div>
		</Modal>
	)
}