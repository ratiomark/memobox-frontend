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


export const BoxesPresenter = () => {
	const { isLoading, data, isError } = useGetTrashQuery()

	const dispatch = useAppDispatch()

	const boxes = data?.boxes.map(box => <BoxItemTrash
		key={box.id}
		box={box}
		cards={box.card}
		cardsCount={box._count.card}
		showShelfTitle
		buttonsBlockProps={{
			isCollapsed: true,
			showCollapseArrow: box._count.card > 0,
			onRestore() {
				dispatch(trashPageActions.setRestoreBoxModalData({
					shelfId: box.shelf.id,
					boxId: box.id,
					boxIndex: box.index,
				}))
				dispatch(trashPageActions.setIsRestoreBoxModalOpen(true))
			},
		}}
	/>)

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
		</>
	)
}
// Мне нужно упорядочить коробки.Допустим у меня есть удаленные коробки из трех полок: a, b, c.
// Нужно вернуть массив коробок, так чтобы вначале шли все коробки полки а(или b\c), далее коробки следующей полки, далее следующей. 