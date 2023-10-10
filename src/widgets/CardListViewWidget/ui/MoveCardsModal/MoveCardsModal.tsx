import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MoveCardsModal.module.scss';
import {
	getViewPageBoxItemsMoveCardsModal,
	getViewPageMoveCardsModalIsOpen,
	getViewPageMoveCardsModalShelfIdChecked,
	// getViewPageMoveCardsModalBoxIdChecked,
	getViewPageMoveCardsModalBoxId,
	getViewPageSelectedCardIds,
	getViewPageShelfId,
	getViewPageShelfItems,
	getViewPageShelfItemsModal,
	getViewPageShelvesDataDictionary,
	viewPageActions,
	getViewPageMoveCardsModalShelfId,
} from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { memo, useEffect } from 'react';
import { Dropdown, ListBox } from '@/shared/ui/Popup';
import { ListBoxItem } from '@/shared/ui/Popup/ui/ListBox/ListBox';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId';


export const MoveCardsModal = memo(() => {

	const { t } = useTranslation()
	const isOpen = useSelector(getViewPageMoveCardsModalIsOpen) ?? false
	const dispatch = useAppDispatch()
	// const [shelvesItems, setShelvesItems] = useState<ListBoxItems<string>[]>([])
	// const [boxItems, setBoxItems] = useState<ListBoxItems<string>[]>([])
	// const shelfId = useSelector(getViewPageShelfId)
	const selectedCardIds = useSelector(getViewPageSelectedCardIds)
	const shelvesItems = useSelector(getViewPageShelfItemsModal) as ListBoxItem<string>[]
	const shelfId = useSelector(getViewPageMoveCardsModalShelfId)
	// const shelfId = useSelector(getViewPage)
	// const [currentShelfId, setCurrentShelfId] = useState('')
	const boxItems = useSelector(getViewPageBoxItemsMoveCardsModal)
	const boxId = useSelector(getViewPageMoveCardsModalBoxId)
	// const boxId = useSelector(getViewPageMoveCardsModalBoxId) ?? boxItems[0]?.value as string
	// const boxId = useSelector(getViewPageMoveCardsModalBoxIdChecked)
	// const [currentBoxId, setCurrentBoxId] = useState('')

	useEffect(() => {
		if (boxItems.length > 0) {
			dispatch(viewPageActions.setMoveCardsModalBoxId(boxItems[0].value as string))
		}
	}, [boxItems, dispatch])

	useEffect(() => {
		if (shelvesItems.length > 0) {
			dispatch(viewPageActions.setMoveCardsModalShelfId(shelvesItems[0].value as string))
		}
	}, [shelvesItems, dispatch])

	const onChangeShelfId = (shelfId: string) => {
		dispatch(viewPageActions.setMoveCardsModalShelfId(shelfId))
	}

	const onChangeBoxId = (boxId: string) => {
		dispatch(viewPageActions.setMoveCardsModalBoxId(boxId))
	}

	const onCloseMoveCards = () => {
		dispatch(viewPageActions.setMoveCardsModalIsOpen(false))
		document.body.blur()
	}

	const onMoveCards = () => {
		console.log(shelfId)
		console.log(boxId)
		console.log(selectedCardIds)
		const id = genRandomId()
		// dispatch(viewPageActions.setSelectedCardIsDeleted())
		dispatch(viewPageActions.setSelectedCardIsDeleted())
		dispatch(viewPageActions.addMultiSelectMoveIds(id))
		
		dispatch(viewPageActions.setMoveCardsModalIsOpen(false))
		dispatch(viewPageActions.cancelMultiSelect())
		// updateCardsMutation({
		// 	requestAction: 'moveCards',
		// 	cardIds: selectedCardIds!,
		// 	boxIndex: currentBoxId!,
		// 	shelfId: currentShelfId!,
		// })
		// dispatch(viewPageActions.setMultiSelectIsActive(false))
		// alert(`${selectedCardIds} перемещены на полку с id ${currentShelfId} в коробку ${currentBoxId}`)
	}

	// console.log(currentShelfId, shelfItems, shelvesData)
	// if (!shelfItems) return <div><Skeleton width={200} height={20} /></div>
	const shelves = (
		<div className={cls.listBoxWrapper}>
			<ListBox
				label={t('shelf')}
				// value={currentShelfId}
				value={shelfId}
				items={shelvesItems}
				onChange={onChangeShelfId}
				defaultValue={t('choose shelf from list')}
				max
				sameWidth
			/>
		</div>)
	const boxes = (
		<div className={cls.listBoxWrapper}>
			<ListBox
				label={t('box text')}
				value={boxId}
				// value={currentBoxId}
				items={boxItems}
				// onChange={setCurrentBoxId}
				onChange={onChangeBoxId}
				max
				sameWidth
			/>
		</div>)

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onSubmit={onMoveCards}
			onClose={onCloseMoveCards}
			max
			className={cls.MoveCardsModal}
		>
			<div className={cls.mainWrapper} >
				{shelves}
				{boxes}
			</div>
			<ModalButtons
				onClose={onCloseMoveCards}
				onSubmit={onMoveCards}
				textSubmitButton='move cards'
			/>
		</HDialogHeadless>
	)
})



// const [updateCardsMutation] = useUpdateCardsMutation()
// useEffect(() => {
// 	if (currentShelfId === '' && shelvesItems.length > 0) {
// 		setCurrentShelfId(shelvesItems[0].value as string)
// 	}
// }, [shelvesItems, currentShelfId])


// useEffect(() => {
// 	if (currentBoxId === '' && boxItems.length > 0) {
// 		setCurrentBoxId(boxItems[0].value as string)
// 	}
// }, [boxItems, currentBoxId])


// useEffect(() => {
// 	if (shelvesData) {
// 		const shelvesResult: ListBoxItems<string>[] = [];
// 		shelvesData?.forEach(shelfItem => {
// 			if (shelfId !== shelfItem.id) {
// 				shelvesResult.push({
// 					value: shelfItem.id,
// 					content: shelfItem.title
// 				})
// 			}
// 		})
// 		setShelvesItems(shelvesResult)
// 		setCurrentShelfId(shelvesResult?.[0]?.value.toString())
// 	}
// }, [shelvesData, shelfId])

// useEffect(() => {
// 	if (currentShelfId && shelvesData) {
// 		const currentShelf = shelvesData.find(shelf => shelf.id === currentShelfId)
// 		const itemsList = currentShelf!.boxesData.map(box => {
// 			let content;
// 			switch (box.specialType) {
// 				case 'none':
// 					content = `${t('box text')} ${box.index}`
// 					break;
// 				case 'new':
// 					content = t('new cards')
// 					break
// 				default:
// 					content = t('learnt cards')
// 					break;
// 			}
// 			return {
// 				value: box.index.toString(),
// 				// value: box.id,
// 				content,
// 			}
// 		})
// 		setBoxItems(itemsList)
// 		setCurrentBoxId(itemsList?.[0]?.value.toString())
// 	}
// }, [t, shelvesData, currentShelfId])