import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { SmallDataLabel } from '@/shared/ui/DataLabels';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Heading } from '@/shared/ui/Typography';
import EyeIcon from '@/shared/assets/icons/eye2.svg'

import cls from './CommonShelfBoxes.module.scss';
import { useNavigate } from 'react-router-dom';
import { obtainRouteTraining, obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getCupboardCommonShelf } from '../../model/selectors/getCupboardShelfList';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { Button } from '@/shared/ui/Button';

interface CommonShelfBoxesProps {
	className?: string
}

export const CommonShelfBoxes = (props: CommonShelfBoxesProps) => {
	const {
		className
	} = props
	const navigate = useNavigate()
	const commonShelf = useSelector(getCupboardCommonShelf)

	const onNewCardsClick = () => {
		navigate(obtainRouteView('all', 'new'))
	}
	const onLearningCardsClick = () => {
		navigate(obtainRouteView('all', 'learning'))
	}
	const onLearntCardsClick = () => {
		navigate(obtainRouteView('all', 'learnt'))
	}
	const startTrainingNewCards = () => navigate(obtainRouteTraining('all', 'new'))
	const startTrainingLearningCards = () => navigate(obtainRouteTraining('all', 'learning'))
	const startTrainingLearntCards = () => navigate(obtainRouteTraining('all', 'learnt'))

	const { t } = useTranslation()
	return (
		<ul className={cls.CommonShelfBoxes} >

			<li className={clsx(cls.Box, [className])} >
				<div className={cls.boxInnerWrapper} >
					<Heading as='h5' className={cls.title} title={t('new cards')} />
					<SmallDataLabel
						className={cls.dataLabels}
						type='all'
						isLoading={false}
						cardsCount={commonShelf?.new.all}
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
				<Button onClick={startTrainingNewCards} variant='filledBox' disabled={commonShelf!.new.all < 1} className={cls.trainButton} >{t('train')}</Button>
			</li>	

			<li className={clsx(cls.Box, [className])} >
				<div className={cls.boxInnerWrapper} >
					<Heading as='h5' className={cls.title} title={t('learning cards')} />
					<CompleteSmallDataLabels
						className={cls.dataLabels}
						isLoading={false}
						data={commonShelf?.learning}
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
				<Button
					onClick={startTrainingLearningCards}
					variant='filledBox'
					disabled={commonShelf!.learning.train < 1}
					className={cls.trainButton}
				>
					{t('train')}
				</Button>
			</li>

			<li className={clsx(cls.Box, [className])} >
				<div className={cls.boxInnerWrapper} >
					<Heading as='h5' className={cls.title} title={t('learnt cards')} />
					<CompleteSmallDataLabels
						className={cls.dataLabels}
						isLoading={false}
						data={commonShelf?.learnt}
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
				<Button
					onClick={startTrainingLearntCards}
					variant='filledBox'
					disabled={commonShelf!.learnt.train < 1}
					className={cls.trainButton}
				>{
						t('train')}
				</Button>
			</li>

		</ul>
	)
}