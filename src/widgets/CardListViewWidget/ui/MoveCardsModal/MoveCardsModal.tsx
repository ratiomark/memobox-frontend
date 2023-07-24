import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MyText, TextArea } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './MoveCardsModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { getViewPageCurrentData, getViewPageEditModalIsOpen, getViewPageEditedData, getViewPageMoveCardsModalIsOpen, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '@/features/CupboardShelfList';
import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { CardEditModal } from '../CardEditModal/CardEditModal';
import { Dropdown, ListBox } from '@/shared/ui/Popup';


interface CardEditModalProps {
	className?: string
}

export const MoveCardsModal = memo((props: CardEditModalProps) => {
	const {
		className,
	} = props

	const { t } = useTranslation()
	const isOpen = useSelector(getViewPageMoveCardsModalIsOpen) ?? false
	const dispatch = useAppDispatch()
	const [currentShelfId, setCurrentShelfId] = useState<string | undefined>()
	const shelfId = useSelector(getViewPageShelfId)
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()

	const shelfItems = useMemo(() => {
		if (isShelvesLoading) return []
		const result = [];
		shelvesData?.forEach(shelfItem => {
			if (shelfId !== shelfItem.id) {
				result.push({
					value: shelfItem.id,
					content: shelfItem.title
				})
			}
		})
		return result
	}, [shelvesData, isShelvesLoading, shelfId])

	useEffect(() => {
		if (shelfItems) {
			setCurrentShelfId(shelfItems[0]?.value)
		}
	}, [shelfItems])


	const onCloseEditModal = () => {
		dispatch(viewPageActions.setMoveCardsModalIsOpen(false))
		document.body.blur()
	}

	console.log(currentShelfId, shelfItems, shelvesData)
	if (!shelfItems) return
	const shelves = (
		<div className={cls.grid} key='shelvesAndBoxes' >
			<ListBox
				label='shelf'
				value={currentShelfId}
				items={shelfItems}
				onChange={setCurrentShelfId}
				max
				sameWidth
			/>
		</div>)


	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseEditModal}
			max
		// lazy
		>
			<div
				className={cls.cardModal}
			>
				{/* <Dropdown
				items={}
				/> */}
				{shelves}
				<div className={cls.actions} >
					<Button>{t('Назад')}</Button>
					{/* <Button onClick={toggleData}>{t('Сравнить')}</Button> */}
					<Button>{t('Сохранить')}</Button>
				</div>
			</div>
		</HDialog>
	)
})
