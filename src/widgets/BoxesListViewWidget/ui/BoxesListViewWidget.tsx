import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesListViewWidget.module.scss';
// import { useSelector } from 'react-redux';
// import { getViewPage } from '@/features/ViewPageInitializer/model/selectors/getViewPageInitializer';

interface BoxesListViewWidgetProps {
	className?: string
}

export const BoxesListViewWidget = (props: BoxesListViewWidgetProps) => {
	const {
		className
	} = props

	// const boxId = useSelector(getViewPage)?.boxId
	
	// useGetBoxesByShelfIdQuery
	// useGetBoxByShelfAndBoxIdQuery
	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.boxesListViewWidget,
			className)}
		>

		</div>
	)
}