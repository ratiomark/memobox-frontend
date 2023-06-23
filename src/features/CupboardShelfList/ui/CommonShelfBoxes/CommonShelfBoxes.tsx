import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { SmallDataLabel } from '@/shared/ui/DataLabels';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Heading } from '@/shared/ui/Typography';
import EyeIcon from '@/shared/assets/icons/eye2.svg'

import cls from './CommonShelfBoxes.module.scss';
import { useNavigate } from 'react-router-dom';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';

interface CommonShelfBoxesProps {
	className?: string
}

export const CommonShelfBoxes = (props: CommonShelfBoxesProps) => {
	const {
		className
	} = props
	const navigate = useNavigate()
	const onNewCardsClick = () => {
		navigate(obtainRouteView('all', 'new'))
	}
	const onLearningCardsClick = () => {
		navigate(obtainRouteView('all', 'learning'))
	}
	const onLearntCardsClick = () => {
		navigate(obtainRouteView('all', 'learnt'))
	}
	const { t } = useTranslation()
	return (
		<div className={cls.CommonShelfBoxes} >
			<div className={clsx(cls.Box, [className])} >
				<Heading as='h5' className={cls.title} title={t('new cards')} />
				<SmallDataLabel
					className={cls.dataLabels}
					type='all'
					isLoading={false}
					cardsCount={5}
				/>
				<HStack
					className={cls.buttonsBlock}
					gap='gap_8'>
					<Icon
						className={cls.icon}
						Svg={EyeIcon}
						clickable
						onClick={onNewCardsClick}
						width={20}
						height={20}
					/>
				</HStack>

			</div>
			<div className={clsx(cls.Box, [className])} >
				<Heading as='h5' className={cls.title} title={t('learning cards')} />
				<SmallDataLabel
					className={cls.dataLabels}
					type='all'
					isLoading={false}
					cardsCount={5}
				/>
				<HStack
					className={cls.buttonsBlock}
					gap='gap_8'>
					<Icon
						className={cls.icon}
						Svg={EyeIcon}
						clickable
						onClick={onLearningCardsClick}
						width={20}
						height={20}
					/>
				</HStack>

			</div>
			<div className={clsx(cls.Box, [className])} >
				<Heading as='h5' className={cls.title} title={t('learnt cards')} />
				<SmallDataLabel
					className={cls.dataLabels}
					type='all'
					isLoading={false}
					cardsCount={5}
				/>
				<HStack
					className={cls.buttonsBlock}
					gap='gap_8'>
					<Icon
						className={cls.icon}
						Svg={EyeIcon}
						clickable
						onClick={onLearntCardsClick}
						width={20}
						height={20}
					/>
				</HStack>

			</div>
		</div>
	)
}