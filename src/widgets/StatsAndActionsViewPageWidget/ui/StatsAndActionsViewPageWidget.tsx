import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { useRef, } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { CardSchema } from '@/entities/Card';
import { getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { ShelfRepresentedByBoxes } from '@/entities/Box';
import { useNavigate } from 'react-router-dom';
import cls from './StatsAndActionsViewPageWidget.module.scss';

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
	// const [data, setData] = useState<any>()
	// const [isLoading, setIsLoading] = useState(true)
	// const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId) ?? '1'
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const shelfDataSaved = useSelector(getViewPageSavedShelf(shelfId ?? '1'))
	const boxId = useSelector(getViewPageSavedShelf(shelfId ?? '1'))?.lastBoxId
	// const navigate = useNavigate()


	const { t } = useTranslation()

	if (!viewPageIsMounted || shelfDataSaved?.isLoading) {
		return (
			<HStack
				max
				className={clsx(
					cls.statsAndActionsViewPageWidget,
					className)}
			>
				<CompleteBigDataLabels data={undefined} isLoading={true} />
			</HStack>
		)
	}

	const data = getStatsFromBoxIdAndData(boxId, shelfDataSaved?.data)

	return (
		<HStack
			max
			className={clsx(
				cls.statsAndActionsViewPageWidget,
				className)}
		>
			<CompleteBigDataLabels data={data} isLoading={false} />
			{/* <HStack gap='gap_14' className={cls.actions} >
				<Button borderRadius='borderRadius_4'>{t('New shelf')}</Button>
				<Button onClick={onAddNewCardClick} borderRadius='borderRadius_4'>{t('Add card with hot key')}</Button>
				<Icon
					Svg={InfoIcon}
					width={26}
					height={26}
					className={cls.info}
				/>

			</HStack> */}
		</HStack>
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
