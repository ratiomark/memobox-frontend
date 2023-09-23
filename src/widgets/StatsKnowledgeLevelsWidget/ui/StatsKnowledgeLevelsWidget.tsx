import clsx from 'clsx';
import cls from './StatsKnowledgeLevelsWidget.module.scss';
import { StatsKnowledgeList } from './StatsKnowledgeList/StatsKnowledgeList';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import { infoIconSize } from '@/shared/const/iconSizes';
import { Icon } from '@/shared/ui/Icon';

export const StatsKnowledgeLevelsWidget = () => {
	return (
		<div className={clsx(cls.statsKnowledgeLevelsWidget, 'blockWithDivider')}>
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