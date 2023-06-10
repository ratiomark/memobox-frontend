import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { cardModalActions } from '@/features/CardModal';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useGetCupboardDataQuery } from '@/entities/Cupboard';

import cls from './StatsAndActionsCupboardWidget.module.scss';


interface StatsAndActionsCupboardWidgetProps {
	className?: string
}

export const StatsAndActionsCupboardWidget = (props: StatsAndActionsCupboardWidgetProps) => {
	const {
		className
	} = props

	const { data, isLoading } = useGetCupboardDataQuery()
	const { t } = useTranslation()

	const dispatch = useAppDispatch()

	const onAddNewCardClick = useCallback(() => {
		dispatch(cardModalActions.openModalNewCard())
	}, [dispatch])

	// const onCloseNewCardModal = useCallback(() => {
	// 	dispatch(cardModalActions.closeModalNewCard())
	// }, [dispatch])

	// if (isLoading) return <p>Загрузка</p>
	// if(!isSuccess) return <p>Неудача</p>

	return (
		<HStack
			max
			className={clsx(
				cls.statsAndActionsCupboardWidget,
				className)}
		>
			<CompleteBigDataLabels data={data} isLoading={isLoading} />
			<HStack gap='gap_14' className={cls.actions} >
				<Button borderRadius='borderRadius_4'>{t('New shelf')}</Button>
				<Button onClick={onAddNewCardClick} borderRadius='borderRadius_4'>{t('Add card with hot key')}</Button>
				<Icon
					Svg={InfoIcon}
					width={26}
					height={26}
					className={cls.info}
				/>

			</HStack>
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