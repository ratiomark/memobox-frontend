import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './MoveCardsModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { getViewPageMoveCardsModalIsOpen, getViewPageSelectedCardIds, getViewPageShelfId, getViewPageShelvesDataDictionary, viewPageActions } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '@/features/CupboardShelfList';
import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { CardEditModal } from '../CardEditModal/CardEditModal';
import { Dropdown, ListBox } from '@/shared/ui/Popup';
import { ListBoxItems } from '@/shared/ui/Popup/ui/ListBox/ListBox';
import { useUpdateCardsMutation } from '@/entities/Card';


export const MoveCardsModal = memo(() => {

	const { t } = useTranslation()
	const isOpen = useSelector(getViewPageMoveCardsModalIsOpen) ?? false
	const dispatch = useAppDispatch()
	const [currentShelfId, setCurrentShelfId] = useState<string | undefined>()
	const [shelvesItems, setShelvesItems] = useState<ListBoxItems<string>[]>([])
	const [boxItems, setBoxItems] = useState<ListBoxItems<string>[]>([])
	const [currentBoxIndex, setCurrentBoxIndex] = useState<string | undefined>()
	const shelfId = useSelector(getViewPageShelfId)
	const selectedCardIds = useSelector(getViewPageSelectedCardIds)
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const [updateCardsMutation] = useUpdateCardsMutation()

	useEffect(() => {
		if (shelvesData) {
			const shelvesResult: ListBoxItems<string>[] = [];
			shelvesData?.forEach(shelfItem => {
				if (shelfId !== shelfItem.id) {
					shelvesResult.push({
						value: shelfItem.id,
						content: shelfItem.title
					})
				}
			})
			setShelvesItems(shelvesResult)
			setCurrentShelfId(shelvesResult?.[0]?.value.toString())
		}
	}, [shelvesData, shelfId])

	useEffect(() => {
		if (currentShelfId && shelvesData) {
			const currentShelf = shelvesData.find(shelf => shelf.id === currentShelfId)
			const itemsList = currentShelf!.boxesData.map(box => {
				let content;
				switch (box.specialType) {
					case 'none':
						content = `${t('box text')} ${box.index}`
						break;
					case 'new':
						content = t('new cards')
						break
					default:
						content = t('learnt cards')
						break;
				}
				return {
					value: box.index.toString(),
					// value: box._id,
					content,
				}
			})
			setBoxItems(itemsList)
			setCurrentBoxIndex(itemsList?.[0]?.value.toString())
		}
	}, [t, shelvesData, currentShelfId])

	const onCloseEditModal = () => {
		dispatch(viewPageActions.setMoveCardsModalIsOpen(false))
		document.body.blur()
	}

	const onMoveCards = () => {
		updateCardsMutation({
			requestAction: 'moveCards',
			cardIds: selectedCardIds!,
			boxIndex: currentBoxIndex!,
			shelfId: currentShelfId!,
		})
		dispatch(viewPageActions.setMoveCardsModalIsOpen(false))
		dispatch(viewPageActions.setMultiSelectIsActive(false))
		// alert(`${selectedCardIds} перемещены на полку с id ${currentShelfId} в коробку ${currentBoxIndex}`)
	}

	// console.log(currentShelfId, shelfItems, shelvesData)
	// if (!shelfItems) return <div><Skeleton width={200} height={20} /></div>
	const shelves = (
		<div className={cls.listBoxWrapper}>
			<ListBox
				label={t('shelf')}
				value={currentShelfId}
				items={shelvesItems}
				onChange={setCurrentShelfId}
				defaultValue={t('choose shelf from list')}
				max
			/>
		</div>)
	const boxes = (
		<div className={cls.listBoxWrapper}>
			<ListBox
				label={t('box text')}
				value={currentBoxIndex}
				items={boxItems}
				onChange={setCurrentBoxIndex}
				max
			/>
		</div>)

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseEditModal}
			max
			className={cls.MoveCardsModal}
		// lazy
		>
			<div className={cls.mainWrapper} >
				{shelves}
				{boxes}

			</div>
			<div className={cls.actions} >
				<Button onClick={onCloseEditModal}>{t('back button')}</Button>
				{/* <Button onClick={toggleData}>{t('Сравнить')}</Button> */}
				<Button variant='filled' onClick={onMoveCards}>{t('move cards')}</Button>
			</div>
		</HDialog>
	)
})
