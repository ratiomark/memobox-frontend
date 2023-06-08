// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './CardModal.module.scss';
// import { Modal } from '@/shared/ui/Modal/Modal';
// import { ListBox } from '@/shared/ui/Popup';
// import { HStack, VStack } from '@/shared/ui/Stack';
// import { MyText, TextArea } from '@/shared/ui/Typography';
// import { Button } from '@/shared/ui/Button';
// import { useCallback, useState } from 'react';
// import { useGetShelvesQuery } from '@/features/GetCupboardData';
// import { ReducersList } from '@/shared/lib/helpers/hooks/useAsyncReducer';
// import { useSelector } from 'react-redux';
// import { getCardModal, getCardModalAnswer, getCardModalQuestion } from '../model/selectors/getCardModal';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { cardModalActions } from '..';

// interface CardModalProps {
// 	className?: string
// 	shelfId?: string
// 	isOpen: boolean
// 	onClose: () => void
// }
// const shelfItems = [
// 	{
// 		value: '1',
// 		content: 'bossShelf',
// 	},
// 	{
// 		value: '2',
// 		content: 'английский',
// 	},
// ]

// const reducer: ReducersList = {}
// export const CardModal = (props: CardModalProps) => {
// 	const {
// 		className,
// 		shelfId,
// 		isOpen,
// 		onClose
// 	} = props
// 	const { data: shelvesData, isLoading: isShelvesLoading, isSuccess } = useGetShelvesQuery()
// 	const dispatch = useAppDispatch()
// 	const { answerText = '', questionText = '', shelfId: shelfIdFromStore } = useSelector(getCardModal)
// 	// const questionText = useSelector(getCardModalQuestion)
// 	// const shelfIdFromStore = useSelector(getCardModal).shelfId
// 	// const answerText = useSelector(getCardModalAnswer)
// 	// const [shelfValue, setShelfValue] = useState('DAO')

// 	// const [isOpen, setIsOpen] = useState(true)
// 	const items = shelvesData?.map(shelfItem => {
// 		return {
// 			value: shelfItem._id,
// 			content: shelfItem.title
// 		}
// 	})
// 	// сравнивать выбранную полку с прошлой полкой
// 	// диспатчит выбранную полку

// 	const onChangeQuestion = useCallback((value: string) => {
// 		dispatch(cardModalActions.setQuestionText(value))
// 	}, [dispatch])

// 	const onChangeAnswer = useCallback((value: string) => {
// 		dispatch(cardModalActions.setAnswerText(value))
// 	}, [dispatch])

// 	const onChangeShelf = useCallback((value: string) => {
// 		dispatch(cardModalActions.setShelf(value))
// 	}, [dispatch])

// 	// const onChangeShelf = (value: string) => setShelfValue(value)

// 	const { t } = useTranslation()

// 	return (
// 		<Modal
// 			isOpen={isOpen}
// 			onClose={onClose}
// 		>
// 			<div
// 				className={cls.cardModal}
// 			// max
// 			// align='left'
// 			// gap='gap_32'
// 			>
// 				<VStack
// 					className={cls.mainContent}
// 					max
// 					align='left'
// 					gap='gap_32'
// 				>
// 					<HStack
// 						className={cls.gap50}
// 						max
// 					// justify='between'
// 					>
// 						<div className={cls.grid} >
// 							<ListBox
// 								label='shelf'
// 								value={shelfId ?? shelfIdFromStore ?? items?.[0]?.value}
// 								items={items}
// 								onChange={onChangeShelf}
// 							/>
// 							<ListBox
// 								label='box'
// 								value={'1'}
// 								items={shelfItems}
// 								onChange={() => { null }}
// 							/>
// 						</div>
// 					</HStack>
// 					<div>
// 						<MyText text={'question'} />
// 						<TextArea
// 							rows={5}
// 							value={questionText}
// 							onChangeString={onChangeQuestion}
// 						/>
// 					</div>
// 					<div>
// 						<MyText text={'answer'} />
// 						<TextArea
// 							rows={5}
// 							value={answerText}
// 							onChangeString={onChangeAnswer}
// 						/>
// 					</div>

// 				</VStack>
// 				<div className={cls.actions} >
// 					<Button>{t('Назад')}</Button>
// 					<Button>{t('Сохранить')}</Button>
// 				</div>
// 			</div>
// 		</Modal>
// 	)
// }