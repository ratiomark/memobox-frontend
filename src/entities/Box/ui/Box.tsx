import clsx from 'clsx'
import cls from './Box.module.scss'
import { Card } from '@/shared/ui/Card';
import { MyText } from '@/shared/ui/Typography';

interface BoxPropsBase {
	className?: string;
	allCards?: number
}

interface BoxPropsNewBox extends BoxPropsBase {
	type?: 'new'
}

interface BoxPropsLearntBox extends BoxPropsBase {
	type?: 'learnt'
}

interface BoxPropsLearningBox extends BoxPropsBase {
	type?: 'learning'
	waitCards?: number
	trainCards?: number
}

export const Box = (props: BoxPropsNewBox | BoxPropsLearntBox | BoxPropsLearningBox) => {
	const {
		className,
		type,
		allCards,
		waitCards,
		trainCards,
	} = props

	if (type === 'learning') {
		return (
			<Card className={clsx(cls.Box, [className])}>
				
			</Card>
		)
	}

	return (
		<Card className={clsx(cls.Box, [className])} >

		</Card>
	)
}