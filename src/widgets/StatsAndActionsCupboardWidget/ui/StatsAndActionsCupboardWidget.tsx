import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import cls from './StatsAndActionsCupboardWidget.module.scss';
import { getCupboardIsLoading, getCupboardError, getCupboardData, cupboardShelfListActions } from '@/features/CupboardShelfList';
import { useSelector } from 'react-redux';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { useHotkeys } from 'react-hotkeys-hook';
import { CreateNewShelfModal } from '@/features/CreateNewShelfModal';


interface StatsAndActionsCupboardWidgetProps {
	className?: string
}

export const StatsAndActionsCupboardWidget = (props: StatsAndActionsCupboardWidgetProps) => {
	const {
		className
	} = props
	const [newShelfModalIsOpen, setNewShelfModalIsOpen] = useState(false)
	// const { data, isLoading } = useGetCupboardDataQuery()
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardData = useSelector(getCupboardData)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const onAddNewShelfClick = () => setNewShelfModalIsOpen(true)
	const onCloseNewShelfModal = () => setNewShelfModalIsOpen(false)

	const onAddNewCardClick = useCallback(() => {
		dispatch(cupboardShelfListActions.setCardModalIsOpen(true))
	}, [dispatch])

	useHotkeys('n', onAddNewCardClick, { keyup: true })

	return (
		<HStack
			max
			className={clsx(
				cls.statsAndActionsCupboardWidget,
				className)}
		>
			<CompleteBigDataLabels data={cupboardData} isLoading={cupboardIsLoading} />
			<ThemeSwitcher />
			<HStack gap='gap_14' className={cls.actions} >
				<Button onClick={onAddNewShelfClick} borderRadius='borderRadius_4'>{t('New shelf')}</Button>
				<Button onClick={onAddNewCardClick} borderRadius='borderRadius_4'>{t('Add card with hot key')}</Button>
				<Icon
					Svg={InfoIcon}
					width={26}
					height={26}
					className={cls.info}
				/>

			</HStack>
			<CreateNewShelfModal
				isOpen={newShelfModalIsOpen}
				onClose={onCloseNewShelfModal}
				onSubmit={() => console.log('Создаю новую полку с названием  ')}
				shelfNames={['math']}
			/>
		</HStack>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { HStack } from '@/shared/ui/Stack';
// import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
// import { Button } from '@/shared/ui/Button';
// import { Icon } from '@/shared/ui/Icon';
// import InfoIcon from '@/shared/assets/icons/infoIcon.svg'

// import cls from './StatsAndActionsCupboardWidget.module.scss';
// import { useGetCupboardDataQuery } from '@/features/GetCupboardData';



// interface StatsAndActionsCupboardWidgetProps {
// 	className?: string
// }


// const data = { wait: 40, all: 40, train: 33 }
// export const StatsAndActionsCupboardWidget = (props: StatsAndActionsCupboardWidgetProps) => {
// 	const {
// 		className
// 	} = props
// 	const { isSuccess, data, isLoading } = useGetCupboardDataQuery()
// 	const { t } = useTranslation()

// 	// if (isLoading) return <p>Загрузка</p>
// 	// if(!isSuccess) return <p>Неудача</p>

// 	return (
// 		<HStack
// 			max
// 			className={clsx(
// 				cls.statsAndActionsCupboardWidget,
// 				className)}
// 		>
// 			<CompleteBigDataLabels data={data ?? } />
// 			<HStack gap='gap_14' className={cls.actions} >
// 				<Button borderRadius='borderRadius_4'>{t('New shelf')}</Button>
// 				<Button borderRadius='borderRadius_4'>{t('Add card with hot key')}</Button>
// 				<Icon
// 					Svg={InfoIcon}
// 					width={26}
// 					height={26}
// 					className={cls.info}
// 				/>

// 			</HStack>
// 		</HStack>
// 	)
// }