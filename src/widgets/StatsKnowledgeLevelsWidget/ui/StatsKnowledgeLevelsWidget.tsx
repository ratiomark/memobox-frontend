import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './StatsKnowledgeLevelsWidget.module.scss';

interface StatsKnowledgeLevelsWidgetProps {
	className?: string
}

export const StatsKnowledgeLevelsWidget = (props: StatsKnowledgeLevelsWidgetProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.statsKnowledgeLevelsWidget,
			className)}
		>

		</div>
	)
}