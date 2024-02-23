import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesPresenter.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { BoxItemTrash } from './BoxItemTrash/BoxItemTrash';
import { ContentPresenterWrapper } from '../ContentPresenterWrapper/ContentPresenterWrapper';
import { MyText } from '@/shared/ui/Typography';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { trashPageActions } from '@/features/TrashPageInitializer';
import { RestoreBoxModal } from '../Modals/RestoreBoxModal/RestoreBoxModal';
import { BoxItemTrashNew } from './BoxItemTrash/BoxItemTrashNew';
import { BoxItemTrashLearnt } from './BoxItemTrash/BoxItemTrashLearnt';
import { RestoreNewOrLearntCardsModal } from '../Modals/RestoreNewOrLearntCardsModal/RestoreNewOrLearntCardsModal';


export const BoxesPresenter = () => {
	const { isLoading, data, isError } = useGetTrashQuery()

	const dispatch = useAppDispatch()
	const boxes = data?.boxes.map(box => {
		const propsObject = {
			box: box,
			cards: box.card,
			cardsCount: box._count.card,
			showShelfTitle: true,
		}
		const buttonsBlockProps = {
			isCollapsed: true,
			showCollapseArrow: box._count.card > 0,
			showRemoveButton: box._count.card > 0,
			showRestoreButton: box._count.card > 0,
		}
		switch (box.specialType) {
			case 'none':
				return <BoxItemTrash
					key={box.id}
					{...propsObject}
					buttonsBlockProps={{
						...buttonsBlockProps,
						showRemoveButton: true,
						showRestoreButton: true,
						onRestore() {
							dispatch(trashPageActions.setRestoreBoxModalData({
								originalShelfId: box.shelf.id,
								boxId: box.id,
								boxIndex: box.index,
								shelfTitle: box.shelf.title,
							}))
							dispatch(trashPageActions.setIsRestoreBoxModalOpen(true))
						},
					}}
				/>
			case 'new':
				return <BoxItemTrashNew
					key={box.id}
					{...propsObject}
					buttonsBlockProps={{
						...buttonsBlockProps,
						onRestore() {
							dispatch(trashPageActions.setRestoreNewOrLearnModalData({
								shelfId: box.shelf.id,
								boxId: box.id,
								boxType: 'new',
								shelfTitle: box.shelf.title,
							}))
							dispatch(trashPageActions.setIsRestoreNewOrLearnModalOpen(true))
						},
					}}
				/>
			case 'learnt':
				return <BoxItemTrashLearnt
					key={box.id}
					{...propsObject}
					buttonsBlockProps={{
						...buttonsBlockProps,
						onRestore() {
							dispatch(trashPageActions.setRestoreNewOrLearnModalData({
								shelfId: box.shelf.id,
								boxId: box.id,
								boxType: 'learnt',
								shelfTitle: box.shelf.title,
							}))
							dispatch(trashPageActions.setIsRestoreNewOrLearnModalOpen(true))
						},
					}}
				/>
		}

	})
	// const boxes = data?.boxes.map(box => <BoxItemTrash
	// 	key={box.id}
	// 	box={box}
	// 	cards={box.card}
	// 	cardsCount={box._count.card}
	// 	showShelfTitle
	// 	buttonsBlockProps={{
	// 		isCollapsed: true,
	// 		showCollapseArrow: box._count.card > 0,
	// 		onRestore() {
	// 			dispatch(trashPageActions.setRestoreBoxModalData({
	// 				shelfId: box.shelf.id,
	// 				boxId: box.id,
	// 				boxIndex: box.index,
	// 				shelfTitle: box.shelf.title,
	// 			}))
	// 			dispatch(trashPageActions.setIsRestoreBoxModalOpen(true))
	// 		},
	// 	}}
	// />)

	const labelsList = (
		<MyText text='label' />
	)

	return (
		<>
			<ContentPresenterWrapper
				labelsList={null}
				contentList={boxes}
			/>
			<RestoreBoxModal />
			<RestoreNewOrLearntCardsModal />
			{/* <RemoveNewOrLearntCardsModal /> */}
		</>
	)
}