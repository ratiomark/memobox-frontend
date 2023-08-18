import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './NoSubscriptionScreen.module.scss';
import { getComparisonRowsData } from '../../model/selectors/getSubscriptionWidget';
import { ComparisonRow } from '../ComparisonRow/ComparisonRow';
import { Heading, MyText } from '@/shared/ui/Typography';
import { subscriptionPrice } from '@/shared/const/subscriptionPrice';
import { Button } from '@/shared/ui/Button';
import { getUserSubscriptionType, getUserSubscriptionExpiresAt } from '@/entities/User';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

interface NoSubscriptionScreenProps {
	className?: string
}

const NoteComponent = ({ title, content }: { title: ReactNode, content: ReactNode }) => {
	return (
		<div className={cls.note} >
			{title}
			{content}
		</div>
	)
}


export const NoSubscriptionScreen = (props: NoSubscriptionScreenProps) => {
	const {
		className
	} = props
	const comparisonRowsData = getComparisonRowsData()

	const subscriptionType = useSelector(getUserSubscriptionType)
	const subscriptionExpiresAt = useSelector(getUserSubscriptionExpiresAt)

	const { t } = useTranslation('subscription')
	const comparisonRowsRendered = comparisonRowsData.map((rowData) => (
		<ComparisonRow
			key={rowData.title}
			title={<MyText variant='hint' text={t(rowData.title)} className={cls.title} />}
			subscriptionContent={<MyText text={t(rowData.subscriptionText)} className={cls.subscriptionContent} />}
			noSubscriptionContent={
				typeof rowData.noSubscriptionText !== 'number'
					? <MyText text={t(rowData.noSubscriptionText)} className={cls.noSubscriptionContent} />
					: <MyText text={rowData.noSubscriptionText} className={cls.noSubscriptionContent} />
			}
		/>))

	const tableHeader = (
		<>
			<div />
			<Heading fontWeight='600' title='Memobox Premium' className={cls.headingPremium} />
			<Heading fontWeight='600' title='Memobox Standard' className={cls.headingStandard} />
		</>
	)

	const subscribeButton = (
		<>
			<div />
			<Button className={cls.button} variant='filled'>{t('subscribe')}</Button>
			<div />
		</>
	)
	const moreInfoButton = (
		<>
			<div />
			<Button className={cls.button}>{t('more info')}</Button>
			<div />
		</>
	)


	let noteAboutTrial;
	if (subscriptionType === 'trial') {
		const title = <Heading as={'h2'} fontWeight='500'  variant='accent' className={cls.noteTitle}  title={t('your have trial')} />
		const content = (
			<div className={cls.warning} >
				<MyText className={cls.warningText} saveOriginal text={'В данный момент вы используете бесплатный пробный период, который заканчивается '} />
				<MyText variant='accent' className={cls.warningText} saveOriginal text={`${subscriptionExpiresAt}.`} />
			</div>
		)
		noteAboutTrial = (
			<NoteComponent
				title={title}
				content={content}
			/>
		)
	}

	return (
		<div className={clsx(
			cls.NoSubscriptionScreen,
			className)}
		>
			<div className={cls.subscriptionGrid} >
				{tableHeader}
				{comparisonRowsRendered}
				<ComparisonRow
					withCheck={false}
					title={<MyText variant='hint' text={t('price')} className={cls.title} />}
					subscriptionContent={<MyText variant='accent' fontWeight='600' text={`$ ${subscriptionPrice} / ${t('month')}`} className={cls.subscriptionPrice} />}
					noSubscriptionContent={<MyText variant='hint' text={t('price free')} className={cls.noSubscriptionContent} />}
				/>
			</div>
			<div className={cls.buttonsGrid} >
				{subscribeButton}
				{moreInfoButton}

			</div>
			{noteAboutTrial}
		</div>
	)
}