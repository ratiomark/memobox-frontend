import cls from './ComparisonRow.module.scss';
import { ReactNode } from 'react';
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { MyText } from '@/shared/ui/Typography';

interface ComparisonRowProps {
	title: ReactNode
	subscriptionContent: string | ReactNode
	noSubscriptionContent: string | number | ReactNode
	withCheck?: boolean
}

export const ComparisonRow = (props: ComparisonRowProps) => {
	const {
		title,
		subscriptionContent,
		noSubscriptionContent,
		withCheck = true,
	} = props

	let subscriptionContentChecked;
	if (withCheck) {
		subscriptionContentChecked = (
			<div className={cls.subscriptionContent} >
				<Icon
					className={cls.iconCheck}
					type='main'
					Svg={CheckIcon}
					width={16}
					height={16}
				/>
				{subscriptionContent}
			</div>
		)
	} else {
		subscriptionContentChecked = subscriptionContent
	}

	return (
		<>
			{title}
			{subscriptionContentChecked}
			{noSubscriptionContent}
		</>
	)
}