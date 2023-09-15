import clsx from 'clsx'
import { MyText } from '../../Typography'
import cls from './SmallDataLabel.module.scss'
import Spinner from '@/shared/assets/icons/spinner.svg'
import { DataLabelType } from '../types/DataLabelType';

interface SmallDataLabelProps {
	className?: string;
	type: DataLabelType
	cardsCount?: number | string
	isLoading: boolean
}

export const SmallDataLabel = (props: SmallDataLabelProps) => {
	const {
		className,
		type,
		cardsCount,
		isLoading,
		...otherProps
	} = props

	if (isLoading) {
		return (
			<div
				className={clsx(cls.SmallDataLabel, [className], cls[type])}
				{...otherProps}
			>
				<Spinner width={24} height={24} className={cls[type]} />
			</div>
		)

	}

	return (
		<div
			className={clsx(cls.SmallDataLabel, [className], cls[type])}
			{...otherProps}
		>
			<MyText drop text={cardsCount} className={cls.smallDataLabelText} />
		</div>
	)
}


