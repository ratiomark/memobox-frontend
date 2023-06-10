import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListViewWidget.module.scss';
import { getViewPage, getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId } from '@/features/ViewPageInitializer'
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
	const shelfId = useSelector(getViewPageShelfId) ?? '1'
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const shelfDataSaved = useSelector(getViewPageSavedShelf(shelfId ?? '1'))
	const boxId = useSelector(getViewPageSavedShelf(shelfId ?? '1'))?.lastBoxId
	const { t } = useTranslation()

	if (!viewPageIsMounted || shelfDataSaved?.isLoading) return <Skeleton width={1000} height={100} />

	let content;
	// if (boxId === 'all') {
	// 	const allCards: CardSchema[] = []
	// 	for (const key in shelfDataSaved) {
	// 		allCards.push(...shelfDataSaved[key])
	// 	}
	// 	// content = <p>заглушка</p>
	// 	content = allCards.map(item => <p key={item._id}>{item.index}</p>)
	// } else {
	// 	// content = <p>заглушка</p>
	// 	content = shelfDataSaved[boxId ?? '1'].map(item => <p key={item._id}>{item.index}</p>)
	// }

	return (
		<div className={clsx(
			cls.cardListViewWidget,
			className)}
		>
			<p>Полка {shelfId}</p>
			<p>Коробка {boxId}</p>
			{content}
		</div>
	)
}