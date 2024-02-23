import { useTranslation } from 'react-i18next';
import cls from './RestoreBoxModal.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { memo, useEffect, useMemo, useState } from 'react';
import { ListBox } from '@/shared/ui/Popup';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { getTrashPageIsRestoreBoxModalOpen, trashPageActions } from '@/features/TrashPageInitializer';
import { useGetTrashQuery } from '@/entities/Trash';
import { BoxesRendered } from './BoxesRendered/BoxesRendered';
import { MyText } from '@/shared/ui/Typography';
import { RestoreBoxModalContent } from './RestoreBoxModalContent/RestoreBoxModal';


export const RestoreBoxModal = memo(() => {

	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTrashPageIsRestoreBoxModalOpen) ?? false
	const onClose = () => dispatch(trashPageActions.setIsRestoreBoxModalOpen(false))
	// const boxId = useSelector(getTrashPageRestoreBoxModalBoxId)
	// const boxIndex = useSelector(getTrashPageRestoreBoxModalBoxIndex)

	// useEffect(() => {
	// 	if (shelvesAndBoxesData) {
	// 		const firstShelf = shelvesAndBoxesData[0]
	// 		console.log(firstShelf)
	// 		setActiveShelfId(firstShelf.id)
	// 		dispatch(trashPageActions.setRestoreBoxModalSelectedShelfId(firstShelf.id))
	// 		dispatch(trashPageActions.setRestoreBoxModalShelfTitle(firstShelf.title))
	// 	}
	// }, [shelvesAndBoxesData, dispatch])

	// const shelvesItems = shelvesAndBoxesData.map(shelf => ({ value: shelf.id, content: shelf.title }))

	// const onChangeShelfId = (shelfId: string) => {
	// 	setActiveShelfId(shelfId)
	// 	dispatch(trashPageActions.setRestoreBoxModalSelectedShelfId(shelfId))
	// 	dispatch(trashPageActions.setRestoreBoxModalShelfTitle(shelvesItems.find(shelf => shelf.value === shelfId)?.content ?? '???'))
	// }

	// const shelves = (
	// 	<div className={cls.listBoxWrapper}>
	// 		<ListBox
	// 			defaultValue={t('choose shelf from list')}
	// 			value={activeShelfId}
	// 			items={shelvesItems}
	// 			onChange={onChangeShelfId}
	// 			max
	// 			sameWidth
	// 		/>
	// 	</div>)

	// const boxes = <BoxesRendered boxes={shelvesAndBoxesData.find(shelf => shelf.id === activeShelfId)?.box ?? []} />

	return (
		<HDialogHeadless
			isOpen={isOpen}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onSubmit={() => { }}
			onClose={onClose}
			max
		>
			{/* <div style={{ margin: 'auto', width: '90%' }}> */}
			<RestoreBoxModalContent />
			{/* <MyText className={cls.modalTitle} text={t('Выберите полку на которую нужно восстановить коробку')} align='center' />
			{shelves}
			{boxes} */}
		</HDialogHeadless>
	)
})