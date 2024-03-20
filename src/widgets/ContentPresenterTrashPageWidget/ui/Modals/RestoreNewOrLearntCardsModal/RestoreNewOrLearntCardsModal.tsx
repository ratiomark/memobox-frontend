import { useTranslation } from 'react-i18next';
import cls from './RestoreNewOrLearntCardsModal.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { memo, useEffect, useMemo, useState } from 'react';
import { ListBox } from '@/shared/ui/Popup';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { getTrashPageIsRestoreNewOrLearntModalOpen, getTrashPageRestoreNewOrLearntModalBoxId, getTrashPageRestoreNewOrLearntModalBoxType, getTrashPageRestoreNewOrLearntModalShelfId, restoreNewOrLearntBoxThunk, trashPageActions } from '@/features/TrashPageInitializer';
import { useGetTrashQuery } from '@/entities/Trash';
import { MyText } from '@/shared/ui/Typography';
import { getTiming } from '@/entities/Box';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { mapBoxesToListItems } from '@/shared/lib/helpers/mappers/mapBoxesToListItems';
import { mapShelvesToListItems } from '@/shared/lib/helpers/mappers/mapShelves';

export const RestoreNewOrLearntCardsModal = memo(() => {
	const { isLoading, data, isError } = useGetTrashQuery()

	const shelvesAndBoxesData = useMemo(() => {
		if (data?.shelvesAndBoxesData) return data.shelvesAndBoxesData
		return []
	}, [data?.shelvesAndBoxesData])

	const { t: tMain } = useTranslation()
	const { t } = useTranslation('trash-page')
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTrashPageIsRestoreNewOrLearntModalOpen)
	const shelfId = useSelector(getTrashPageRestoreNewOrLearntModalShelfId)
	const [activeShelfId, setActiveShelfId] = useState(shelfId ?? shelvesAndBoxesData[0]?.id ?? '')
	const boxIdToRestore = useSelector(getTrashPageRestoreNewOrLearntModalBoxId)
	const boxType = useSelector(getTrashPageRestoreNewOrLearntModalBoxType)
	const boxes = shelvesAndBoxesData?.find(shelf => shelf.id === activeShelfId)?.box
	const [activeBoxId, setActiveBoxId] = useState(boxes?.[0].id)
	const boxItems = mapBoxesToListItems(boxes)
	// const boxItems = boxes?.map(box => {
	// 	let content;
	// 	switch (box.specialType) {
	// 		case 'none':
	// 			content = `${t('box text')} ${box.index} - ${getTiming(box.timing)}`
	// 			break
	// 		case 'new':
	// 			content = t('new cards')
	// 			break
	// 		case 'learnt':
	// 			content = `${t('learnt cards')} - ${getTiming(box.timing)}`
	// 			break
	// 	}
	// 	return { value: box.id, content }
	// })


	useEffect(() => {
		if (shelvesAndBoxesData) {
			setActiveShelfId(shelvesAndBoxesData[0].id)
		}
	}, [shelvesAndBoxesData])

	useEffect(() => {
		if (boxes) {
			if (boxType === 'new') setActiveBoxId(boxes[0].id)
			else setActiveBoxId(boxes[boxes.length - 1].id)
		}
	}, [boxes, boxType])


	let modalTitle;
	let modalDescription;
	if (boxType === 'new') {
		modalTitle = t('restore all new cards title')
		modalDescription = t('restore all new cards description')
	} else {
		modalTitle = t('restore all learnt cards title')
		modalDescription = t('restore all learnt cards description')
	}

	if (!shelvesAndBoxesData || shelvesAndBoxesData.length === 0) return null
	const shelvesItems = mapShelvesToListItems(shelvesAndBoxesData)
	// const shelvesItems = useSelector(getViewPageShelfItemsModal) as ListBoxItem<string>[]


	const onChangeShelfId = (shelfId: string) => {
		setActiveShelfId(shelfId)
		dispatch(trashPageActions.setRestoreBoxModalSelectedShelfId(shelfId))
		dispatch(trashPageActions.setRestoreBoxModalShelfTitle(shelvesItems.find(shelf => shelf.value === shelfId)?.content ?? '???'))
	}

	const onChangeBoxId = (boxId: string) => {
		setActiveBoxId(boxId)
	}

	const onRestoreCards = () => {
		if (!boxIdToRestore || !activeBoxId) return
		dispatch(restoreNewOrLearntBoxThunk({ boxIdToRestore, activeBoxId, toShelfId: activeShelfId }))
		dispatch(trashPageActions.setIsRestoreNewOrLearnModalOpen(false))
	}

	const shelvesList = (
		<div className={cls.listBoxWrapper}>
			<ListBox
				label={tMain('shelf text')}
				value={activeShelfId}
				items={shelvesItems}
				onChange={onChangeShelfId}
				defaultValue={t('choose shelf from list')}
				max
				sameWidth
			/>
		</div>)
	const boxesList = (
		<div className={cls.listBoxWrapper}>
			<ListBox
				label={tMain('box text')}
				value={activeBoxId}
				items={boxItems}
				onChange={setActiveBoxId}
				max
				sameWidth
			/>
		</div>)


	return (
		<HDialogHeadless
			isOpen={isOpen}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onSubmit={() => { }}
			onClose={() => dispatch(trashPageActions.setIsRestoreNewOrLearnModalOpen(false))}
		// max
		>
			{/* <div style={{ margin: 'auto', width: '90%' }}> */}
			<MyText className={cls.modalTitle} text={modalTitle} align='center' />

			{shelvesList}
			{boxesList}
			<MyText className={cls.modalDescription} text={modalDescription} align='center' />

			<ModalButtons
				isSubmitDisabled={!boxIdToRestore || !activeBoxId}
				onSubmit={onRestoreCards}
				onClose={() => dispatch(trashPageActions.setIsRestoreNewOrLearnModalOpen(false))}
				textSubmitButton={t('restore')}
				textCloseButton={tMain('cancel')}
			/>
		</HDialogHeadless>
	)
})