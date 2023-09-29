import clsx from 'clsx'
import cls from './Box.module.scss'
// import { Card } from '@/shared/ui/Card';
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
import { MouseEvent, useCallback, useState } from 'react';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { BoxCoordinates, BoxSchema } from '../model/types/BoxSchema';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button';
import { obtainRouteTraining } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { boxIconSize } from '@/shared/const/iconSizes';
import getBoxTimingStringRepresentation from '../utils/getTiming';

interface BoxPropsBase {
	className?: string
	boxItem: BoxSchema
	shelfId: string
	onAddNewCard: (shelfId: string, boxIndex: number) => void
	onBoxViewClick: (shelfId: string, boxIndex: number | string) => void
	onOpenTimeSetter: (coordinates: BoxCoordinates, timingData: TimingBlock, boxId: string, shelfId: string) => void
	onOpenBoxSettings: (coordinates: BoxCoordinates, boxId: string, shelfId: string) => void
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
	const {
		className,
		boxItem,
		shelfId,
		onAddNewCard,
		onBoxViewClick,
		onOpenTimeSetter,
		onOpenBoxSettings,
	} = props
	const { data, specialType } = boxItem
	const { t } = useTranslation()
	const navigate = useNavigate()

	const onBoxViewClickHandle = useCallback(() => {
		// VAR: Это нужно переделать!!! boxId должен быть id бокса, а тут нунжо использвать specti
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

	const startTraining = () => {
		navigate(obtainRouteTraining(shelfId, boxItem._id))
	}

	if (specialType === 'none' || specialType === 'learnt') {
		const title = specialType === 'none'
			? <Heading as='h5' className={cls.title} title={`${t('box text')} ${boxItem.index}`} />
			: <Heading as='h5' className={cls.title} title={t('learnt cards')} />

		const completeSmallDataLabels = <CompleteSmallDataLabels
			className={cls.dataLabels}
			isLoading={false}
			data={data}
		/>

		// const onClose = () => setIsTimeSetterOpen(false)
		const onOpenTimeSetterHandle = (e: MouseEvent) => {
			const { x, y, width, height } = e.currentTarget.getBoundingClientRect()
			// передаю координаты центра элемента по которому призошел клик
			const coordinates = {
				x: x + width / 2,
				y: y + height / 2
			}
			onOpenTimeSetter(coordinates, boxItem.timing, boxItem._id, shelfId)
		}

		const onOpenBoxSettingsHandle = (e: MouseEvent) => {
			const { x, y, width, height } = e.currentTarget.getBoundingClientRect()
			const coordinates = {
				x: x + width / 2,
				y: y + height
			}
			onOpenBoxSettings(coordinates, boxItem._id, shelfId)
		}

		const buttons = (
			<HStack
				className={cls.buttonsBlock}
				gap='gap_10'
				align='center'
			>
				<Icon
					className={cls.icon}
					Svg={PlusIcon}
					clickable
					onClick={onAddNewCardHandle}
					width={boxIconSize}
					height={boxIconSize}
				/>
				<Icon
					className={cls.icon}
					Svg={EyeIcon}
					clickable
					onClick={onBoxViewClickHandle}
					width={boxIconSize}
					height={boxIconSize}
				/>
				<Icon
					className={cls.icon}
					Svg={TimeIcon}
					clickable
					onClick={onOpenTimeSetterHandle}
					// onClick={onTimerClick}
					width={boxIconSize}
					height={boxIconSize}
				/>
				<Icon
					className={cls.icon}
					Svg={SettingsIcon}
					clickable
					onClick={onOpenBoxSettingsHandle}
					width={boxIconSize}
					height={boxIconSize}
				/>
			</HStack>
		)

		return (
			<li className={clsx(cls.Box, [className])} >
				<div className={cls.boxInnerWrapper} >
					{title}
					{completeSmallDataLabels}
					{buttons}

					<MyText className={cls.timing} text={getBoxTimingStringRepresentation(boxItem) ?? 'ERROR'} />
				</div>
				<Button onClick={startTraining} variant='filledBox' disabled={data.train < 1} className={cls.trainButton} >{t('train')}</Button>
			</li>
		)
	}

	const title = <Heading as='h5' className={cls.title} title={t('new cards')} />
	return (
		<li className={clsx(cls.Box, [className])} >
			<div className={cls.boxInnerWrapper} >
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
			<div className={cls.timingLayout} />
			<Button onClick={startTraining} variant='filledBox' disabled={data.all < 1} className={cls.trainButton} >{t('train')}</Button>
		</li>
	)
}



// <AnimatePresence mode="wait">
// 	{isTimeSetterOpen &&
// 		<motion.div
// 			// key='key'
// 			variants={timeSetterAnimation}
// 			initial='hidden'
// 			animate='visible'
// 			// animate={
// 			// 	{ from: 'center' }
// 			// }
// 			exit='exit'
// 			style={{ overflow: 'hidden' }}
// 			// initial={{ opacity: 0 }}
// 			// animate={{ opacity: 1 }}
// 			// exit={{ opacity: 0 }}
// 			className={cls.timeSetter}
// 		>
// 			{/* <div className={cls.timeSetter}> */}
// 			<TimeSetter
// 				minutes={minutes}
// 				hours={hours}
// 				days={days}
// 				weeks={weeks}
// 				months={months}
// 				onClose={onClose}
// 				onSaveTime={() => { }}
// 			// VAR: тут нужен колбек на сохранение времени у коробки
// 			/>
// 			{/* </div> */}
// 		</motion.div>
// 	}
// </AnimatePresence>