import cls from './TrainingWrapper.module.scss';
import { Training } from '@/features/Training';
import { useParams } from 'react-router-dom';


export const TrainingWrapper = () => {
	const { shelfId = 'all', boxId = 'all' } = useParams()

	return (
		<div className={cls.TrainingWrapper}>
			<Training
				boxId={boxId}
				shelfId={shelfId}
			/>
		</div>
	)
}