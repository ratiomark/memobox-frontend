import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListItem.module.scss';
import { CardSchema } from '@/entities/Card';
import { Card } from '@/shared/ui/Card';
import { MyText } from '@/shared/ui/Typography';
import TrashIcon from '@/shared/assets/icons/trashIcon.svg'
import ShareIcon from '@/shared/assets/icons/shareIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { getViewPageColumns } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
interface CardListItemProps {
	className?: string
	card: CardSchema
}
const formatDate = (ISODate: string) => {
	const date = new Date(ISODate)
	const day = date.getUTCDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const minutes = date.getUTCMinutes()
	const hours = date.getUTCHours()
	return `${day}.${month}.${year}\n${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}
export const CardListItem = (props: CardListItemProps) => {
	const {
		className,
		card,
	} = props
	const creationTime = formatDate(card.createdAt)
	const lastTrainingTime = formatDate(card.lastTraining)
	const columns = useSelector(getViewPageColumns)
	const { t } = useTranslation()

	return (
		<li className={clsx(
			cls.CardListItem,
			className)}
		>
			<MyText text={card.question} className={cls.mainContent} />
			<MyText text={card.answer} className={cls.mainContent} />
			{columns?.map(item => {
				if (item.value === 'createdAt' || item.value === 'lastTraining') {
					return <MyText key={item.index} saveOriginal text={formatDate(card[item.value])} size='s'  className={cls[item.value]} />
				}
				return <MyText key={item.index} text={card[item.value]} size='s' className={cls[item.value]}  />
			})}
			{/* <MyText text={card.shelf} size='s' /> */}
			{/* <MyText saveOriginal text={creationTime} size='s' /> */}
			{/* <MyText saveOriginal text={lastTrainingTime} size='s' /> */}
			<div className={cls.icons} >
				{/* <Icon
					Svg={ShareIcon}
					width={25}
					height={25}
				/> */}
				<Icon
					// width={28}
					// height={28}
					Svg={TrashIcon}
					// type='cancel'
					className={cls.trashIcon}
				/>
			</div>
		</li>
	)
}