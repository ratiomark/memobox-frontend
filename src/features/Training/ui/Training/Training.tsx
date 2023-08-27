import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Training.module.scss';
import { useGetCardsByShelfIdQuery } from '@/entities/Card';
import { TrainingContentSkeleton } from '../TrainingContent/TrainingContentSkeleton';
import { TrainingContent } from '../TrainingContent/TrainingContent';
import { useGetAllCardsQuery } from '@/entities/Card';

interface TrainingProps {
	className?: string
	shelfId: string
	boxId?: string
}

export const Training = (props: TrainingProps) => {
	const {
		className,
		shelfId = 'all',
		boxId = 'all'
	} = props
	// const { isLoading, data, isError } = useGetCardsByShelfIdQuery(shelfId)
	const { isLoading, data, isError } = useGetAllCardsQuery()
	console.log(data)
	const { t } = useTranslation()

	if (isLoading) return <TrainingContentSkeleton />
	if (isError) return <p> Some error in training</p>
	if (data) return <TrainingContent data={data.cards} />

	return (
		<div className={clsx(
			cls.training,
			className)}
		>

		</div>
	)
}