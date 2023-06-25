import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SortControllerViewPageWidget.module.scss';
import { getViewPageIsMounted, getViewPageIsLoading, getViewPageSortItemsList } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { MyText } from '@/shared/ui/Typography';

interface SortControllerViewPageWidgetProps {
	className?: string
	// columns: SortColumnObject[]
}

export const SortControllerViewPageWidget = (props: SortControllerViewPageWidgetProps) => {
	const {
		className
	} = props
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	// const sortItemsList = useSelector(getViewPageSortItemsList)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)
	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.sortControllerViewPageWidget,
			className)}
		>
			{/* <MyText text='question' className={cls.mainContent} /> */}
			{/* <MyText text='answer' className={cls.mainContent} /> */}
			{/* {sortItemsList.map(item => <MyText key={item} text={item} />)} */}
		</div>
	)
}