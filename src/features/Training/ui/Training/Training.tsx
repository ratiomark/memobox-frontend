import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Training.module.scss';
import { useGetTrainingCardsQuery } from '@/entities/Card';
import { TrainingContentSkeleton } from '../TrainingContent/TrainingContentSkeleton';
import { TrainingContent } from '../TrainingContent/TrainingContent';
import { obtainRouteMain } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { trainingReducer } from '../../model/slice/trainingSlice';

interface TrainingProps {
	className?: string
	shelfId: string
	boxId?: string
}

const reducers: ReducersList = {
	trainingPage: trainingReducer
}

export const Training = (props: TrainingProps) => {
	const {
		className,
		shelfId = 'all',
		boxId = 'all'
	} = props
	useAsyncReducer({reducers, removeAfterUnmount: false})
	// const { isLoading, data, isError } = useGetCardsByShelfIdQuery(shelfId)
	const { isLoading, data, isError } = useGetTrainingCardsQuery({ shelfId, boxId })
	console.log(data)
	const { t } = useTranslation()
	const navigate = useNavigate()
	if (isLoading) return <TrainingContentSkeleton />
	if (isError) return <p> {t('Some error in training')}</p>
	if (data && data.length === 0) {
		alert('No cards you redirected to main page')
		navigate(obtainRouteMain())
	}
	
	if (data) return <TrainingContent data={data} />

	return (
		<div className={clsx(
			cls.training,
			className)}
		>

		</div>
	)
}