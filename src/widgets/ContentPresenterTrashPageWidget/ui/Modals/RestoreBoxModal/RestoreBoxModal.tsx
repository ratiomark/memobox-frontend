import { useTranslation } from 'react-i18next';
import cls from './RestoreBoxModal.module.scss';
import {
	viewPageActions,
} from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { memo, useState } from 'react';
import { ListBox } from '@/shared/ui/Popup';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { getTrashPageIsRestoreBoxModalOpen, trashPageActions } from '@/features/TrashPageInitializer';
import { useGetTrashQuery } from '@/entities/Trash';
import { BoxesRendered } from './BoxesRendered';
import { MyText } from '@/shared/ui/Typography';


export const RestoreBoxModal = memo(() => {
	const { isLoading, data, isError } = useGetTrashQuery()
	const shelvesAndBoxesData = data?.shelvesAndBoxesData ?? []

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [activeShelfId, setActiveShelfId] = useState(shelvesAndBoxesData[0].id ?? '')

	const isOpen = useSelector(getTrashPageIsRestoreBoxModalOpen) ?? false
	// const shelfId = useSelector(getTrashPageRestoreBoxModalShelfId)
	// const boxId = useSelector(getTrashPageRestoreBoxModalBoxId)
	// const boxIndex = useSelector(getTrashPageRestoreBoxModalBoxIndex)



	if (!shelvesAndBoxesData || shelvesAndBoxesData.length === 0) return null
	const shelvesItems = shelvesAndBoxesData.map(shelf => ({ value: shelf.id, content: shelf.title }))
	// const shelvesItems = useSelector(getViewPageShelfItemsModal) as ListBoxItem<string>[]


	const onChangeShelfId = (shelfId: string) => {
		setActiveShelfId(shelfId)
		dispatch(trashPageActions.setRestoreBoxModalShelfId(shelfId))
		dispatch(trashPageActions.setRestoreBoxModalShelfTitle(shelvesItems.find(shelf => shelf.value === shelfId)?.content ?? '???'))
	}

	const onChangeBoxId = (boxId: string) => {
		dispatch(viewPageActions.setMoveCardsModalBoxId(boxId))
	}

	const onCloseMoveCards = () => {
		dispatch(viewPageActions.setMoveCardsModalIsOpen(false))
		document.body.blur()
	}

	const shelves = (
		<div className={cls.listBoxWrapper}>
			{/* <MyText text={t('Выберите полку на которую нужно восстановить коробку')} align='center' /> */}
			<ListBox
				// label={t('Выберите полку на которую нужно восстановить коробку')}
				// value={currentShelfId}
				value={activeShelfId}
				items={shelvesItems}
				onChange={onChangeShelfId}
				defaultValue={t('choose shelf from list')}
				max
				sameWidth
			/>
		</div>)

	const boxes = <BoxesRendered boxes={shelvesAndBoxesData.find(shelf => shelf.id === activeShelfId)!.box} />

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onSubmit={() => { }}
			onClose={() => dispatch(trashPageActions.setIsRestoreBoxModalOpen(false))}
			max
		// className={cls.MoveCardsModal}
		>
			{/* <div style={{ margin: 'auto', width: '90%' }}> */}
			<MyText className={cls.modalTitle} text={t('Выберите полку на которую нужно восстановить коробку')} align='center' />
			{shelves}
			{boxes}
		</HDialogHeadless>
	)
})