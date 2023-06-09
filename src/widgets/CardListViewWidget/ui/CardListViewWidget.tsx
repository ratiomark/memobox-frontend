import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListViewWidget.module.scss';
import { getViewPage, getViewPageSavedShelf } from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CardSchema } from '@/entities/Card';

interface CardListViewWidgetProps {
	className?: string
}

export const CardListViewWidget = (props: CardListViewWidgetProps) => {
	const {
		className
	} = props
	const shelfId = useSelector(getViewPage)?.shelfId
	const boxId = useSelector(getViewPage)?.boxId
	const shelfDataSaved = useSelector(getViewPageSavedShelf(shelfId ?? '1'))
	const { t } = useTranslation()

	if (!shelfDataSaved) return <Skeleton width={1000} height={100} />

	let content;
	if (boxId === 'all') {
		const allCards: CardSchema[] = []
		for (const key in shelfDataSaved) {
			allCards.push(...shelfDataSaved[key])
		}
		content = allCards.map(item => <p key={item._id}>{item.index}</p>)
	} else {
		content = shelfDataSaved[boxId ?? '1'].map(item => <p key={item._id}>{item.index}</p>)
	}

	return (
		<div className={clsx(
			cls.cardListViewWidget,
			className)}
		>
			{content}
		</div>
	)
}