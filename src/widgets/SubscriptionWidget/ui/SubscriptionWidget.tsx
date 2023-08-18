import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SubscriptionWidget.module.scss';
import { NoSubscriptionScreen } from './NoSubscriptionScreen/NoSubscriptionScreen';
import { PaidSubscriptionScreen } from './PaidSubscriptionScreen/PaidSubscriptionScreen';
import { getUserSubscriptionType, getUserSubscriptionExpiresAt } from '@/entities/User';
import { useSelector } from 'react-redux';

interface SubscriptionWidgetProps {
	className?: string
}

export const SubscriptionWidget = (props: SubscriptionWidgetProps) => {
	const {
		className
	} = props
	
	const subscriptionType = useSelector(getUserSubscriptionType)
	const subscriptionExpiresAt = useSelector(getUserSubscriptionExpiresAt)
	const { t } = useTranslation()

	return (
		// <div className={clsx(
		// 	cls.subscriptionWidget,
		// 	className)}
		// >
		<>
			{subscriptionType === 'paid'
				? <PaidSubscriptionScreen />
				: <NoSubscriptionScreen />
			}
		</>
		// </div>
	)
}