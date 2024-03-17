import clsx from 'clsx'
import { MyText } from '../../Typography'
import cls from './SmallDataLabel.module.scss'
import Spinner from '@/shared/assets/icons/spinner.svg'
import { DataLabelType } from '../types/DataLabelType';
import { TEST_ENTITY_NAMES } from '@/shared/const/testConsts';

interface SmallDataLabelProps {
	className?: string;
	type: DataLabelType
	cardsCount?: number | string
	isLoading: boolean
	'data-testid'?: string
}

export const SmallDataLabel = (props: SmallDataLabelProps) => {
	const {
		className,
		type,
		cardsCount,
		isLoading,
		'data-testid': dataTestId = TEST_ENTITY_NAMES.labels.allLabel,
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
			<MyText data-testid={dataTestId}   drop text={cardsCount} className={cls.smallDataLabelText} />
		</div>
	)
}


