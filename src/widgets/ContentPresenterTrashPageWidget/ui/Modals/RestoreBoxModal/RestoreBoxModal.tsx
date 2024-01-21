import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './RestoreBoxModal.module.scss';
import {
	getViewPageBoxItemsMoveCardsModal,
	getViewPageMoveCardsModalIsOpen,
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
import { memo, useEffect, useState } from 'react';
import { Dropdown, ListBox } from '@/shared/ui/Popup';
import { ListBoxItem } from '@/shared/ui/Popup/ui/ListBox/ListBox';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId';
import { getTrashPageIsRestoreBoxModalOpen, getTrashPageRestoreBoxModalShelfId, getTrashPageRestoreBoxModalBoxId, getTrashPageRestoreBoxModalBoxIndex, trashPageActions } from '@/features/TrashPageInitializer';
import { useGetTrashQuery } from '@/entities/Trash';
import { BoxesRendered } from './BoxesRendered';
import { max } from 'lodash';
import { MyText } from '@/shared/ui/Typography';


export const RestoreBoxModal = memo(() => {
	const { isLoading, data, isError } = useGetTrashQuery()
	const shelvesAndBoxesData = data?.shelvesAndBoxesData ?? []

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [activeShelfId, setActiveShelfId] = useState(shelvesAndBoxesData[0].id ?? '')

	const isOpen = useSelector(getTrashPageIsRestoreBoxModalOpen) ?? false
	const shelfId = useSelector(getTrashPageRestoreBoxModalShelfId)
	const boxId = useSelector(getTrashPageRestoreBoxModalBoxId)
	const boxIndex = useSelector(getTrashPageRestoreBoxModalBoxIndex)



	if (!shelvesAndBoxesData || shelvesAndBoxesData.length === 0) return null
	const shelvesItems = shelvesAndBoxesData.map(shelf => ({ value: shelf.id, content: shelf.title }))
	// const shelvesItems = useSelector(getViewPageShelfItemsModal) as ListBoxItem<string>[]


	const onChangeShelfId = (shelfId: string) => {
		setActiveShelfId(shelfId)
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
	// const boxes = (
	// 	<div className={cls.listBoxWrapper}>
	// 		<ListBox
	// 			// label={t('box text')}
	// 			value={boxId}
	// 			// value={currentBoxId}
	// 			items={boxItems}
	// 			// onChange={setCurrentBoxId}
	// 			onChange={onChangeBoxId}
	// 			max
	// 			sameWidth
	// 		/>
	// 	</div>)

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
			{/* </div> */}
			{boxes}
			{/* <BoxesRendered boxes={shelvesAndBoxesData[0].box} /> */}
			{/* <div className={cls.mainWrapper} >
				{shelves}
				{boxes}
			</div>
			<ModalButtons
				onClose={onCloseMoveCards}
				onSubmit={onMoveCards}
				textSubmitButton='move cards'
			/> */}
		</HDialogHeadless>
	)
})