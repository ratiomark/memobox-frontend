import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TrainingWrapper.module.scss';
import { Training } from '@/features/Training';
import { useParams } from 'react-router-dom';

interface TrainingWrapperProps {
	className?: string
}

export const TrainingWrapper = (props: TrainingWrapperProps) => {
	const {
		className
	} = props
	const { shelfId = 'all', boxId = 'all' } = useParams()

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.TrainingWrapper,
			className)}
		>
			<Training
				boxId={boxId}
				shelfId={shelfId}
			/>
		</div>
	)
}