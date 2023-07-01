import clsx from 'clsx'
import cls from './Box.module.scss'
import { Card } from '@/shared/ui/Card';
import { Heading, MyText } from '@/shared/ui/Typography';
import { DataBlock, TimingBlock } from '@/shared/types/DataBlock';
import { SmallDataLabel } from '@/shared/ui/DataLabels';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { Icon } from '@/shared/ui/Icon';
import PlusIcon from '@/shared/assets/icons/addIcon.svg'
import TimeIcon from '@/shared/assets/icons/timeIcon.svg'
// import PlusIcon from '@/shared/assets/icons/plusIcon2.svg'
import SettingsIcon from '@/shared/assets/icons/settingsIcon2.svg'
// import SettingsIcon from '@/shared/assets/icons/settingsIcon.svg'
import EyeIcon from '@/shared/assets/icons/eye2.svg'
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { useCallback, useState } from 'react';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { BoxSchema } from '../model/types/BoxSchema';
import { AnimatePresence, motion } from 'framer-motion';

// interface BoxPropsBase {
// 	className?: string
// 	// boxId: string
// 	boxItem: BoxSchema
// 	// index: number
// 	shelfId: string
// 	onAddNewCard: (shelfId: string, boxIndex: number) => void
// 	onBoxViewClick: (boxIndex: number) => void
// 	onTimerClick?: () => void
// 	specialType: 'new' | 'none' | 'learnt'
// 	data: DataBlock | { all: number }
// }

interface BoxPropsBase {
	className?: string
	// boxId: string
	boxItem: BoxSchema
	// index: number
	shelfId: string
	onAddNewCard: (shelfId: string, boxIndex: number) => void
	onBoxViewClick: (shelfId: string, boxIndex: number | string) => void
}


interface BoxPropsNewBox extends BoxPropsBase {
	specialType: 'new',
	data: {
		all: number,
	},
}

interface BoxPropsNoneAndLearntBox extends BoxPropsBase {
	// onTimerClick?: () => void
	specialType: 'none' | 'learnt'
	data: DataBlock
	// timing: TimingBlock
}

const timeSetterAnimation = {
	hidden: {
		opacity: 0,
		// height: 0,
		scale: 0.5,
	},
	visible: {
		opacity: 1,
		// height: 'auto',
		scale: 1,
		// from: 'center',
		transition: { duration: 0.2 }
	},
	exit: {
		opacity: 0,
		scale: 0.5,
		transition: { duration: 0.2 }
	}

}
export const Box = (props: BoxPropsBase) => {
	// export const Box = (props: BoxPropsNewBox | BoxPropsLearntBox | BoxPropsLearningBox) => {
	const {
		className,
		// specialType,
		boxItem,
		shelfId,
		onAddNewCard,
		onBoxViewClick,
		// onTimerClick,
		// allCards,
		// waitCards,
		// trainCards,
	} = props
	const { data, specialType } = boxItem
	const [isTimeSetterOpen, setIsTimeSetterOpen] = useState(false)
	const { t } = useTranslation()

	const onBoxViewClickHandle = useCallback(() => {
		let boxId: string | number;
		if (boxItem.specialType === 'none') {
			boxId = boxItem.index
		} else if (boxItem.specialType === 'learnt') {
			boxId = 'learnt'
		} else {
			boxId = 'new'
		}
		onBoxViewClick(shelfId, boxId)
	}, [onBoxViewClick, shelfId, boxItem.index, boxItem.specialType])

	const onAddNewCardHandle = useCallback(() => {
		onAddNewCard(shelfId, boxItem.index)
	}, [onAddNewCard, shelfId, boxItem.index])

	const timing = '1ч 20м'
	const minutes = 4
	const hours = 2
	const days = 0
	const weeks = 0
	const months = 0

	if (specialType === 'none' || specialType === 'learnt') {
		const title = specialType === 'none'
			? <Heading as='h5' className={cls.title} title={`${t('box text')} ${boxItem.index}`} />
			: <Heading as='h5' className={cls.title} title={t('learnt cards')} />

		const completeSmallDataLabels = <CompleteSmallDataLabels
			className={cls.dataLabels}
			isLoading={false}
			data={data}
		/>

		const onClose = () => {
			setIsTimeSetterOpen(false)
		}
		const buttons = (
			<HStack
				className={cls.buttonsBlock}
				gap='gap_10'>
				<Icon
					className={cls.icon}
					Svg={PlusIcon}
					clickable
					onClick={onAddNewCardHandle}
					width={20}
					height={20}
				/>
				<Icon
					className={cls.icon}
					Svg={EyeIcon}
					clickable
					onClick={onBoxViewClickHandle}
					width={20}
					height={20}
				/>
				<Icon
					className={cls.icon}
					Svg={TimeIcon}
					clickable
					onClick={() => setIsTimeSetterOpen(true)}
					// onClick={onTimerClick}
					width={20}
					height={20}
				/>
				<Icon
					className={cls.icon}
					Svg={SettingsIcon}
					clickable
					onClick={() => { }}
					width={20}
					height={20}
				/>
			</HStack>
		)
		return (
			<div className={clsx(cls.Box, [className])} >
				{title}
				{completeSmallDataLabels}
				{buttons}
				<AnimatePresence mode="wait">
					{isTimeSetterOpen &&
						<motion.div
							// key='key'
							variants={timeSetterAnimation}
							initial='hidden'
							animate='visible'
							// animate={
							// 	{ from: 'center' }
							// }
							exit='exit'
							style={{ overflow: 'hidden' }}
							// initial={{ opacity: 0 }}
							// animate={{ opacity: 1 }}
							// exit={{ opacity: 0 }}
							className={cls.timeSetter}
						>
							{/* <div className={cls.timeSetter}> */}
							<TimeSetter
								minutes={minutes}
								hours={hours}
								days={days}
								weeks={weeks}
								months={months}
								onClose={onClose}
							/>
							{/* </div> */}
						</motion.div>
					}
				</AnimatePresence>

				{/* <MyText className={cls.timing} text={timing} /> */}
			</div>
		)
	}

	const title = <Heading as='h5' className={cls.title} title={t('new cards')} />
	return (
		<div className={clsx(cls.Box, [className])} >
			{title}
			<SmallDataLabel
				className={cls.dataLabels}
				type='all'
				isLoading={false}
				cardsCount={data.all}
			/>
			<HStack
				className={cls.buttonsBlock}
				gap='gap_8'>
				<Icon
					className={cls.icon}
					Svg={PlusIcon}
					clickable
					onClick={onAddNewCardHandle}
					width={20}
					height={20}
				/>
				<Icon
					className={cls.icon}
					Svg={EyeIcon}
					clickable
					onClick={onBoxViewClickHandle}
					width={20}
					height={20}
				/>
			</HStack>

		</div>
	)
}