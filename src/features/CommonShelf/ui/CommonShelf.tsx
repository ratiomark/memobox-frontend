import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CommonShelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from './CommonShelfButtons/CommonShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';


interface ShelfProps {
	data?: {
		all: number
		train: number
		wait: number
	}
	isLoading: boolean
	// id?: string | number
	// title?: string
	// position?: number
	className?: string
}

export const CommonShelf = (props: ShelfProps) => {
	const {
		className,
		data, 
		isLoading
	} = props

	// const { isSuccess, isLoading, data } = useGetCupboardDataQuery()
	const { t } = useTranslation()

	// if (isLoading) return <p>Загрузка</p>
	// if (!isSuccess) return <p>Неудача</p>


	return (
		<div className={clsx(
			cls.shelf,
			[className])}
		>
			<div className={cls.topShelfPart}>
				<VStack align='start' gap='gap_8'>
					<Heading as='h3' size='s' title={t('common shelf name')} />
					<CompleteSmallDataLabels data={data} isLoading={isLoading} />
				</VStack>
				<ShelfButtons/>
			</div>
		</div>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './CommonShelf.module.scss';
// import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
// import { ShelfButtons } from './ShelfButtons/ShelfButtons';
// import { Heading, MyText } from '@/shared/ui/Typography';
// import { VStack } from '@/shared/ui/Stack';
// import { useGetCupboardDataQuery } from '@/features/GetCupboardData';


// interface ShelfProps {
// 	// data: {
// 	// 	all: number
// 	// 	train: number
// 	// 	wait: number
// 	// }
// 	// id?: string | number
// 	// title?: string
// 	// position?: number
// 	className?: string
// }

// export const CommonShelf = (props: ShelfProps) => {
// 	const {
// 		className,
// 	} = props

// 	const { isSuccess, isLoading, data } = useGetCupboardDataQuery()
// 	const { t } = useTranslation()

// 	// if (isLoading) return <p>Загрузка</p>
// 	// if (!isSuccess) return <p>Неудача</p>


// 	return (
// 		<div className={clsx(
// 			cls.shelf,
// 			[className])}
// 		>
// 			<div className={cls.topShelfPart}>
// 				<VStack align='start' gap='gap_8'>
// 					<Heading as='h3' size='s' title={t('common shelf name')} />
// 					<CompleteSmallDataLabels data={data} isLoading={isLoading} />
// 				</VStack>
// 				<ShelfButtons/>
// 			</div>
// 		</div>
// 	)
// }