import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './PaidSubscriptionScreen.module.scss';
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { getAdvantages } from '../../model/selectors/getSubscriptionWidget';
import { Heading, MyText } from '@/shared/ui/Typography';
import { ReactNode } from 'react';

interface PaidSubscriptionScreenProps {
	className?: string
}

const AdvantageRow = ({ text }: { text: ReactNode }) => {
	return (
		<div className={cls.advantageRow}>
			<Icon
				className={cls.iconCheck}
				type='main'
				Svg={CheckIcon}
				width={16}
				height={16}
			/>
			{text}
		</div>
	)
}

export const PaidSubscriptionScreen = (props: PaidSubscriptionScreenProps) => {
	const {
		className
	} = props
	const advantageTextList = getAdvantages()
	const { t } = useTranslation('subscription')

	const headingBlock = (
		<div className={cls.headingBlock} >
			<Heading as='h1' fontWeight='600' size='m' title={t('subscription paid')} className={cls.headingTitle} />
		</div>
	)

	const advantagesRendered = (
		<div className={cls.advantagesBlockWrapper} >
			<div className={cls.advantagesBlock}>
				{advantageTextList.map(text => (
					<AdvantageRow key={text} text={<MyText text={t(text)} />} />
				))}
			</div>
		</div>
	)

	return (
		<div className={cls.paidSubscriptionScreen}>
			{headingBlock}
			{advantagesRendered}

		</div>
	)
}