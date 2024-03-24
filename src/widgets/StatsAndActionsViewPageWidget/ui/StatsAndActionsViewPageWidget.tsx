import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { CardSchema } from '@/entities/Card';
import {
	getViewPageIsLoading,
	getViewPageIsMounted,
	viewPageActions
} from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { ShelfRepresentedByBoxes } from '@/entities/Box';
import cls from './StatsAndActionsViewPageWidget.module.scss';
import { Button } from '@/shared/ui/Button';
import { motion } from 'framer-motion'
import { TableSettingModal } from './TableSettingModal/TableSettingModal';
import { getViewPageCardsFactor } from '@/features/ViewPageInitializer';
interface StatsData {
	all: number
	train: number
	wait: number
}

const replaceCardsWithStatsData = (cards?: CardSchema[]) => {
	const statsData = { all: cards?.length ?? 0, train: 0, wait: 0 }
	cards?.forEach(card => statsData[card.state] += 1)
	return statsData
}

const replaceShelfWithStatsData = (shelfDataObject: ShelfRepresentedByBoxes) => {
	const statsData = { all: 0, train: 0, wait: 0 }
	for (const key in shelfDataObject) {
		const box = shelfDataObject[key]
		statsData.all += box.length
		box.forEach(card => statsData[card.state] += 1)
	}
	return statsData
}

const getStatsFromBoxIdAndData = (boxId: string | undefined, shelfDataSaved: ShelfRepresentedByBoxes | undefined) => {
	switch (true) {
		case boxId === 'all':
			return replaceShelfWithStatsData(shelfDataSaved!)
		case boxId === 'new':
		case boxId === 'learnt':
			return { all: 0, train: 0, wait: 0 }
		case Boolean(boxId):
			return replaceCardsWithStatsData(shelfDataSaved?.[boxId!])
	}
}

interface StatsAndActionsViewPageWidgetProps {
	className?: string
}

// useEffect(() => {
// 	if (shelfDataSaved && boxId) {
// 		calculatedData.current = getStatsFromBoxIdAndData(boxId, shelfDataSaved)
// 	}
// }, [shelfDataSaved, boxId])

export const StatsAndActionsViewPageWidget = (props: StatsAndActionsViewPageWidgetProps) => {
	const {
		className
	} = props
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)
	// const shelfId = useSelector(getViewPageShelfId) ?? '1'
	const cards = useSelector(getViewPageCardsFactor)
	// const cards = useSelector(getViewPageCardsFiltered)
	const dispatch = useAppDispatch()
	const onOpenColumnSettingsModal = () => {
		dispatch(viewPageActions.setColumnSettingsIsOpen(true))
	}

	// useEffect(() => {

	// }, [])
	// const shelfDataSaved = useSelector(getViewPageSavedShelf(shelfId ?? '1'))
	// const boxId = useSelector(getViewPageSavedShelf(shelfId ?? '1'))?.lastBoxId
	// const navigate = useNavigate()


	const { t } = useTranslation()

	// if (!viewPageIsMounted || viewPageIsLoading) {
	// 	return (
	// 		<HStack
	// 			max
	// 			className={clsx(
	// 				cls.statsAndActionsViewPageWidget,
	// 				className)}
	// 		>
	// 			<CompleteBigDataLabels data={undefined} isLoading={true} />
	// 		</HStack>
	// 	)
	// }

	// const data = getStatsFromBoxIdAndData(boxId, shelfDataSaved?.data)
	const data = replaceCardsWithStatsData(cards)

	return (
		<>
			<motion.div
			// initial={{ x: -50 }}
			// animate={{ x: 0 }}
			>
				<HStack
					max
					className={clsx(
						cls.statsAndActionsViewPageWidget,
						className)}
				>
					<CompleteBigDataLabels
						data={
							viewPageIsLoading
								? undefined
								: data
						}
						isLoading={viewPageIsLoading ?? true}
					/>
					<div className={cls.actions} >
						<Button
							onClick={onOpenColumnSettingsModal}
						>
							{t('table settings')}
						</Button>
					</div>
				</HStack>
			</motion.div>
			<TableSettingModal />
		</>
	)
}


// useEffect(() => {
// 	if (!isBoxChecked.current) {
// 		switch (true) {
// 			case boxId === 'all':
// 				setData(replaceShelfWithStatsData(shelfDataSaved!))
// 				setIsLoading(false)
// 				isBoxChecked.current = true
// 				break;
// 			case boxId === 'new':
// 			case boxId === 'learnt':
// 				setData(undefined)
// 				isBoxChecked.current = true
// 				break;
// 			case Boolean(boxId):
// 				setData(replaceCardsWithStatsData(shelfDataSaved?.[boxId!]))
// 				setIsLoading(false)
// 				isBoxChecked.current = true
// 				break;
// 		}
// 	}
// }, [data, isLoading, boxId, shelfDataSaved]);

// if (boxId === 'all') {
// } else if (boxId) {
// 	data = replaceCardsWithStatsData(shelfDataSaved?.[boxId])
// }
// else if (boxId === 'new') {
// 	null
// } else if (boxId) {
// 	data = replaceCardsWithStatsData(shelfDataSaved?.[boxId])
// }

// const onAddNewCardClick = useCallback(() => {
// 	dispatch(cardModalActions.openModalNewCard())
// }, [dispatch])

// console.log(data)
// const onCloseNewCardModal = useCallback(() => {
// 	dispatch(cardModalActions.closeModalNewCard())
// }, [dispatch])

// if (isLoading) return <p>Загрузка</p>
// if(!isSuccess) return <p>Неудача</p>
