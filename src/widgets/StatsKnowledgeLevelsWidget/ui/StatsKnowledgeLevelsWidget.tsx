import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './StatsKnowledgeLevelsWidget.module.scss';
import { StatsKnowledgeLevelItem } from './StatsKnowledgeLevelItem/StatsKnowledgeLevelItem';
import { StatsKnowledgeList } from './StatsKnowledgeList/StatsKnowledgeList';

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
			<StatsKnowledgeList/>
			{/* <StatsKnowledgeLevelItem isLoading={false} type='new' cardsCount={25} percentValue={100} /> */}
			{/* <StatsKnowledgeLevelItem isLoading={false} type='new' cardsCount={999} percentValue={100} /> */}
			{/* <StatsKnowledgeLevelItem isLoading={true} type='new' cardsCount={25} percentValue={33} /> */}
		</div>
	)
}