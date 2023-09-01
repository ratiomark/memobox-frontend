import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './StatsKnowledgeLevelsWidget.module.scss';
import { StatsKnowledgeLevelItem } from './StatsKnowledgeLevelItem/StatsKnowledgeLevelItem';
import { StatsKnowledgeList } from './StatsKnowledgeList/StatsKnowledgeList';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { infoIconSize } from '@/shared/const/iconSizes';
import { Icon } from '@/shared/ui/Icon';
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
			'blockWithDivider',
			className)}
		>
			<StatsKnowledgeList />

			<Icon
				Svg={InfoIcon}
				width={infoIconSize}
				height={infoIconSize}
				clickable
				onClick={() => { }}
			/>
		</div>
	)
}