import clsx from 'clsx'
import cls from './Box.module.scss'
import { Heading, MyText } from '@/shared/ui/Typography';
import { TimingBlock } from '@/shared/types/DataBlock';
import { SmallDataLabel } from '@/shared/ui/DataLabels';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { Icon } from '@/shared/ui/Icon';
import PlusIcon from '@/shared/assets/icons/addIcon.svg'
import TimeIcon from '@/shared/assets/icons/timeIcon.svg'
// import PlusIcon from '@/shared/assets/icons/plusIcon2.svg'
import SettingsIcon from '@/shared/assets/icons/settingsIcon2.svg'
// import SettingsIcon from '@/shared/assets/icons/settingsIcon.svg'
import EyeIcon from '@/shared/assets/icons/eye2.svg'
import { HStack } from '@/shared/ui/Stack';
import { MouseEvent, useCallback, useState } from 'react';
import { BoxCoordinates, BoxSchema } from '../model/types/BoxSchema';
import { Button } from '@/shared/ui/Button';
import { obtainRouteTraining } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { iconSizeBox } from '@/shared/const/iconSizes';
import getBoxTimingStringRepresentation from '../utils/getTiming';
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { useCustomTranslate } from '@/features/LanguageSwitcher';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES } from '@/shared/const/testConsts';

export interface BoxPropsBase {
	className?: string
	boxItem: BoxSchema
	shelfId: string
	// onAddNewCard: (shelfId: string, boxId: string) => void
	onAddNewCard: (shelfId: string, boxIndex: number) => void
	onBoxViewClick: (shelfId: string, boxIndex: number | string) => void
	onOpenTimeSetter: (coordinates: BoxCoordinates, timingData: TimingBlock, boxId: string, shelfId: string) => void
	onOpenBoxSettings: (coordinates: BoxCoordinates, boxId: string, shelfId: string) => void
	isRefetchingSelectorFn: (state: StateSchema) => boolean
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
		isRefetchingSelectorFn
	} = props
	const { data, specialType } = boxItem
	const isRefetching = useSelector(isRefetchingSelectorFn)
	const { t, currentLang: lang } = useCustomTranslate()
	const navigate = useNavigate()

	const onBoxViewClickHandle = useCallback(() => {
		let boxSpecialId: string | number;
		if (specialType === 'none') {
			boxSpecialId = boxItem.index
		} else if (specialType === 'learnt') {
			boxSpecialId = 'learnt'
		} else {
			boxSpecialId = 'new'
		}
		onBoxViewClick(shelfId, boxSpecialId)
	}, [onBoxViewClick, shelfId, boxItem.index, specialType])

	let boxDataTestId: string;
	if (specialType === 'none') {
		boxDataTestId = TEST_ENTITY_NAMES.boxItem
	} else if (specialType === 'learnt') {
		boxDataTestId = TEST_ENTITY_NAMES.boxes.learnt
	} else {
		boxDataTestId = TEST_ENTITY_NAMES.boxes.new
	}

	// const onAddNewCardHandle = useCallback(() => {
	// 	onAddNewCard(shelfId, boxItem.id)
	// }, [onAddNewCard, shelfId, boxItem.id])
	const onAddNewCardHandle = useCallback(() => {
		onAddNewCard(shelfId, boxItem.index)
	}, [onAddNewCard, shelfId, boxItem.index])

	const startTraining = () => {
		navigate(obtainRouteTraining(shelfId, boxItem.id))
	}

	if (specialType === 'none' || specialType === 'learnt') {
		const title = specialType === 'none'
			? <Heading as='h5' className={cls.title} title={`${t('box text')} ${boxItem.index}`} />
			: <Heading as='h5' className={cls.title} title={t('learnt cards')} />

		const completeSmallDataLabels = <CompleteSmallDataLabels
			className={cls.dataLabels}
			isLoading={isRefetching}
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
			onOpenTimeSetter(coordinates, boxItem.timing, boxItem.id, shelfId)
		}

		const onOpenBoxSettingsHandle = (e: MouseEvent) => {
			const { x, y, width, height } = e.currentTarget.getBoundingClientRect()
			const coordinates = {
				x: x + width / 2,
				y: y + height
			}
			onOpenBoxSettings(coordinates, boxItem.id, shelfId)
		}
		const isButtonDisabled = data.train < 1 || isRefetching
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
					width={iconSizeBox}
					height={iconSizeBox}
				/>
				<Icon
					className={cls.icon}
					Svg={EyeIcon}
					clickable
					onClick={onBoxViewClickHandle}
					width={iconSizeBox}
					height={iconSizeBox}
				/>
				<Icon
					className={cls.icon}
					Svg={TimeIcon}
					clickable
					onClick={onOpenTimeSetterHandle}
					width={iconSizeBox}
					height={iconSizeBox}
				/>
				<Icon
					className={cls.icon}
					Svg={SettingsIcon}
					clickable
					onClick={onOpenBoxSettingsHandle}
					width={iconSizeBox}
					height={iconSizeBox}
				/>
			</HStack>
		)

		return (
			<li
				className={clsx(cls.Box, [className])}
				data-testid={boxDataTestId}
			>
				<div className={cls.boxInnerWrapper} >
					{title}
					{completeSmallDataLabels}
					{buttons}
					<MyText
						className={cls.timing}
						text={getBoxTimingStringRepresentation(boxItem.timing, lang) ?? 'ERROR'}
					/>
				</div>
				<Button
					className={cls.trainButton}
					onClick={startTraining}
					variant='filledBox'
					disabled={isButtonDisabled}
					data-testid={TEST_BUTTONS_IDS.shelf.trainButton}
				>
					{t('train')}
				</Button>
			</li>
		)
	}
	
	const isButtonDisabled = data.all < 1 || isRefetching
	const title = <Heading as='h5' className={cls.title} title={t('new cards')} />
	return (
		<li
			className={clsx(cls.Box, [className])}
			data-testid={boxDataTestId}
		>
			<div className={cls.boxInnerWrapper} >
				{title}
				<SmallDataLabel
					className={cls.dataLabels}
					type='all'
					isLoading={isRefetching}
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
			<Button
				onClick={startTraining}
				variant='filledBox'
				disabled={isButtonDisabled}
				className={cls.trainButton}
				data-testid={TEST_BUTTONS_IDS.shelf.trainButton}
			>
				{t('train')}
			</Button>
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