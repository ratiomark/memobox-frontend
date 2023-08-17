import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SubscriptionWidget.module.scss';
import { NoSubscriptionScreen } from './NoSubscriptionScreen/NoSubscriptionScreen';
import { PaidSubscriptionScreen } from './PaidSubscriptionScreen/PaidSubscriptionScreen';

interface SubscriptionWidgetProps {
	className?: string
}

export const SubscriptionWidget = (props: SubscriptionWidgetProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.subscriptionWidget,
			className)}
		>
			<PaidSubscriptionScreen/>
			<NoSubscriptionScreen/>
		</div>
	)
}