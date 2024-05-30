import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SubscriptionDataBlock.module.scss';
import { ReactNode } from 'react';
import { Button } from '@/shared/ui/Button';
import { ProfileRowData } from '../ProfileRowData/ProfileRowData';
import { useSelector } from 'react-redux';
import { MyText } from '@/shared/ui/Typography';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { getUserSubscriptionExpiresAt, getUserSubscriptionType } from '@/entities/User';

interface SubscriptionDataBlockProps {
	className?: string
}

export const SubscriptionDataBlock = (props: SubscriptionDataBlockProps) => {
	const {
		className
	} = props
	// 'none' | 'trial' | 'paid' | 'canceled'
	const dispatch = useAppDispatch()
	const subscriptionType = useSelector(getUserSubscriptionType)
	const subscriptionExpiresAt = useSelector(getUserSubscriptionExpiresAt)
	const { t } = useTranslation('profile')

	let content;
	let buttons;
	switch (subscriptionType) {
		case 'none':
			content = <MyText text={t('no subscription')} />
			buttons = <Button className={cls.button} variant='filled' onClick={() => { }}>{t('subscribe')}</Button>
			break;
		case 'paid':
			content = (
				<HStack gap='gap_10'>
					<MyText variant='accent' text={t('paid subscription')} />
					<Icon
						className={cls.iconCheck}
						type='main'
						Svg={CheckIcon}
					/>
				</HStack>)
			buttons = <Button className={cls.button} onClick={() => { }}>{t('more details')}</Button>
			break
		case 'trial':
			content = (<HStack gap='gap_10'>

				<MyText text={t('trial subscription')} />
				<MyText size='s' variant='accent' text={`(${t('subscription expires at')} ${subscriptionExpiresAt})`}/>
			</HStack>)
			// buttons = <Button className={cls.button} variant='filled' onClick={() => { }}>{t('subscribe')}</Button>
			break
		case 'canceled':
			content = <MyText text={t('canceled subscription')} />
			buttons = <Button className={cls.button} variant='filled' onClick={() => { }}>{t('subscribe')}</Button>
			break
	}

	return (
		<>
			<div className={cls.SubscriptionDataBlock}>
				<ProfileRowData
					title={t('subscription')}
					content={content}
					buttons={buttons}
				/>
			</div>
			{/* <Button>CLICK</Button> */}
		</>
	)
}