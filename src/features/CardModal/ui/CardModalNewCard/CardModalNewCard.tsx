import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardModalNewCard.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ListBox } from '@/shared/ui/Popup';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useCallback, useState } from 'react';
import { ReducersList } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { useSelector } from 'react-redux';
import { getCardModal } from '../../model/selectors/getCardModal';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cardModalActions } from '../../model/slice/cardModalSlice';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { Skeleton } from '@/shared/ui/Skeleton';

interface CardModalNewCardProps {
	className?: string
	// shelfId?: string
	// isOpen: boolean
	onClose: () => void
}

export const CardModalNewCard = (props: CardModalNewCardProps) => {
	const {
		className,
		// shelfId,
		// isOpen,
		onClose
	} = props
	const { t } = useTranslation()
	const { data: shelvesData, isLoading: isShelvesLoading, isSuccess } = useGetShelvesQuery()
	const {
		answerText = '',
		questionText = '',
		shelfId: shelfIdFromStore,
		isOpen = false } = useSelector(getCardModal)
	const dispatch = useAppDispatch()

	const shelfId = shelfIdFromStore ?? shelvesData?.[0]._id
	const items = shelvesData?.map(shelfItem => {
		return {
			value: shelfItem._id,
			content: shelfItem.title
		}
	})

	const onChangeQuestion = useCallback((text: string) => {
		dispatch(cardModalActions.setQuestionText(text))
	}, [dispatch])

	const onChangeAnswer = useCallback((text: string) => {
		dispatch(cardModalActions.setAnswerText(text))
	}, [dispatch])

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(cardModalActions.setShelf(shelfId))
	}, [dispatch])

	let shelvesAndBoxes;
	if (isShelvesLoading) {
		shelvesAndBoxes = (<div className={cls.grid} >
			<Skeleton width={200} height={67} />
			<Skeleton width={200} height={67} />
			{/* <ListBox
								label='box'
								value={'1'}
								items={shelfItems}
								onChange={() => { null }}
							/> */}
		</div>)
	} else {
		shelvesAndBoxes = (<div className={cls.grid} >
			<ListBox
				label='shelf'
				value={shelfId}
				items={items}
				onChange={onChangeShelf}
			/>
			{/* <ListBox
								label='box'
								value={'1'}
								items={shelfItems}
								onChange={() => { null }}
							/> */}
		</div>)
	}


	return (
		<Modal
			lazy
			isOpen={isOpen}
			onClose={onClose}
		>
			<div
				className={cls.cardModal}
			// max
			// align='left'
			// gap='gap_32'
			>
				<VStack
					className={cls.mainContent}
					max
					align='left'
					gap='gap_32'
				>
					<HStack
						className={cls.gap50}
						max
					// justify='between'
					>
						{shelvesAndBoxes}
					</HStack>
					<div>
						<MyText text={'question'} />
						<TextArea
							rows={5}
							value={questionText}
							onChangeString={onChangeQuestion}
						/>
					</div>
					<div>
						<MyText text={'answer'} />
						<TextArea
							rows={5}
							value={answerText}
							onChangeString={onChangeAnswer}
						/>
					</div>

				</VStack>
				<div className={cls.actions} >
					<Button>{t('Назад')}</Button>
					<Button>{t('Сохранить')}</Button>
				</div>
			</div>
		</Modal>
	)
}