import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import cls from './RestoreCardModal.module.scss';

import { useGetTrashQuery } from '@/entities/Trash';
import {
	getTrashPageIsRestoreCardModalOpen,
	getTrashPageRestoreCardModalBoxId,
	getTrashPageRestoreCardModalCardId,
	getTrashPageRestoreCardModalShelfId,
	restoreCardThunk,
	trashPageActions} from '@/features/TrashPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { mapBoxesToListItems } from '@/shared/lib/helpers/mappers/mapBoxesToListItems';
import { mapShelvesToListItems } from '@/shared/lib/helpers/mappers/mapShelves';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { ListBox } from '@/shared/ui/Popup';
import { MyText } from '@/shared/ui/Typography';

export const RestoreCardModal = memo(() => {
	const { isLoading, data, isError } = useGetTrashQuery()

	const shelvesAndBoxesData = useMemo(() => {
		if (data?.shelvesAndBoxesData) return data.shelvesAndBoxesData
		return []
	}, [data?.shelvesAndBoxesData])

	const { t: tMain } = useTranslation()
	const { t } = useTranslation('trash-page')
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTrashPageIsRestoreCardModalOpen)
	const shelfId = useSelector(getTrashPageRestoreCardModalShelfId)
	const boxId = useSelector(getTrashPageRestoreCardModalBoxId)
	const cardId = useSelector(getTrashPageRestoreCardModalCardId)
	const boxes = shelvesAndBoxesData?.find(shelf => shelf.id === shelfId)?.box

	useEffect(() => {
		if (shelvesAndBoxesData.length > 0) {
			// setActiveShelfId(shelvesAndBoxesData[0].id)
			dispatch(trashPageActions.setRestoreCardModalShelfId(shelvesAndBoxesData[0].id))
		}
	}, [shelvesAndBoxesData, dispatch])

	useEffect(() => {
		if (boxes) {
			dispatch(trashPageActions.setRestoreCardModalBoxId(boxes[0].id))
		}
	}, [boxes, dispatch])


	const boxItems = mapBoxesToListItems(boxes)


	// let modalTitle;
	// let modalDescription;
	// if (boxType === 'new') {
	// 	modalTitle = t('restore all new cards title')
	// 	modalDescription = t('restore all new cards description')
	// } else {
	// 	modalTitle = t('restore all learnt cards title')
	// 	modalDescription = t('restore all learnt cards description')
	// }

	if (!shelvesAndBoxesData || shelvesAndBoxesData.length === 0) return null
	const shelvesItems = mapShelvesToListItems(shelvesAndBoxesData)

	const onChangeShelfId = (shelfId: string) => {
		dispatch(trashPageActions.setRestoreCardModalShelfId(shelfId))
		dispatch(trashPageActions.setRestoreBoxModalShelfTitle(shelvesItems.find(shelf => shelf.value === shelfId)?.content ?? '???'))
	}

	const onChangeBoxId = (boxId: string) => {
		dispatch(trashPageActions.setRestoreCardModalBoxId(boxId))
	}

	const onRestoreCards = () => {
		// if (!boxIdToRestore || !activeBoxId) return
		dispatch(restoreCardThunk({ boxId, shelfId, cardId }))
		dispatch(trashPageActions.setIsRestoreCardModalOpen(false))
	}
	// if (!shelfId || !boxId) return null

	const shelvesList = (
		<div className={cls.listBoxWrapper}>
			<ListBox
				label={tMain('shelf text')}
				value={shelfId}
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
				value={boxId}
				items={boxItems}
				onChange={onChangeBoxId}
				max
				sameWidth
			/>
		</div>)


	return (
		<HDialogHeadless
			isOpen={isOpen}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onSubmit={() => { }}
			onClose={() => dispatch(trashPageActions.setIsRestoreCardModalOpen(false))}
		// max
		>
			{/* <div style={{ margin: 'auto', width: '90%' }}> */}
			<MyText className={cls.modalTitle} text={'modalTitle'} align='center' />

			{shelvesList}
			{boxesList}
			<MyText className={cls.modalDescription} text={'modalDescription'} align='center' />

			<ModalButtons
				// isSubmitDisabled={!boxId || !activeBoxId}
				onSubmit={onRestoreCards}
				onClose={() => dispatch(trashPageActions.setIsRestoreCardModalOpen(false))}
				textSubmitButton={t('restore')}
				textCloseButton={tMain('cancel')}
			/>
		</HDialogHeadless>
	)
})