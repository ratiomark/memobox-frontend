import clsx from 'clsx';
import cls from './BoxSettingsItem.module.scss';
import TimeIcon from '@/shared/assets/icons/timeIcon2.svg'
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import { useTranslation } from 'react-i18next';
import { Heading } from '@/shared/ui/Typography';
import { Icon } from '@/shared/ui/Icon';
import { ExtendedTimingBlock } from '@/shared/types/DataBlock';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { AddBoxIcon } from '../AddBoxIcon/AddBoxIcon';
import { DURATION_MILLISEC, DURATION_SEC, } from '@/shared/const/animation';
import { HStack } from '@/shared/ui/Stack';
import { getTiming } from '@/shared/lib/helpers/common/formaters';
import { getBoxesTemplateModalMode } from '../../../model/selectors/getShelfBoxesTemplateModal';
import { shelfBoxesTemplateSettingsActions } from '../../../model/slice/shelfBoxesTemplateSlice';
import { MouseEvent, useRef } from 'react';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

interface BoxSettingsItemProps {
	className?: string
	boxItem: ExtendedTimingBlock
	onRemoveBox: (boxId: number) => void
	onAddBoxClick: (index: number) => void
	isLastBox: boolean
}


const animateIconsAndDataOnBox = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } },
	exit: { opacity: 0, transition: { duration: 0.4 } },
}


export const BoxSettingsItem = (props: BoxSettingsItemProps) => {
	const {
		className,
		boxItem,
		onRemoveBox,
		onAddBoxClick,
		isLastBox = false,
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const timer = useRef<TimeoutId>()
	const { isSaved: isBoxSaved, minutes, hours, days, weeks, months, id, index: boxIndex, isRemoved } = boxItem
	const mode = useSelector(getBoxesTemplateModalMode)
	const isAddBoxModeActive = mode === 'choosingBoxPlace'


	const onAddNewBoxClickHandle = (e: MouseEvent<HTMLDivElement>) => {
		const addNewBoxToPosition = boxIndex + 1
		onAddBoxClick(addNewBoxToPosition)
		const { x, y, width, height } = e.currentTarget.getBoundingClientRect()
		const coordinates = {
			x: x + width / 2,
			y: y + height / 2
		}
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterBoxCoordinates(coordinates))
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalIsOpen(true))
	}

	const onOpenTimeSetterHandle = (e: MouseEvent<HTMLDivElement>) => {
		const { x, y, width, height } = e.currentTarget.getBoundingClientRect()
		const coordinates = {
			x: x + width / 2,
			y: y + height / 2
		}
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterBoxCoordinates(coordinates))
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalBoxData(boxItem))
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterBoxTimingData({ minutes, hours, days, weeks, months }))
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalIsOpen(true))
	}

	const onRemoveClick = () => {
		dispatch(shelfBoxesTemplateSettingsActions.switchBoxToRemovedState(boxIndex))
		timer.current = setTimeout(() => {
			onRemoveBox(boxIndex)
			clearTimeout(timer.current)
		}, DURATION_MILLISEC)
	}

	const title = isLastBox
		? (
			<Heading as='h5'
				className={cls.title}
				title={t('learnt cards')}
			/>)
		: (
			<Heading as='h5'
				className={cls.title}
				// title={`${t('box text')} ${boxIndex}`}
				title={`${t('box text')} ${boxIndex! + 1}`}
			/>)

	const timerIcon = (<Icon
		Svg={TimeIcon}
		withFill={false}
		clickable
		onClick={onOpenTimeSetterHandle}
		width={20}
		height={20}
		buttonSameSize={false}
		className={clsx(cls.icon, cls.timerIcon)}
	/>)

	const timerIconAnimated = (<AnimatePresence mode='wait'>
		{!isAddBoxModeActive &&
			<motion.div
				variants={animateIconsAndDataOnBox}
				initial='initial'
				animate='animate'
				exit='exit'
			>
				{timerIcon}
			</motion.div>
		}
	</AnimatePresence>)

	const removeButton = (
		<Icon
			Svg={TrashIcon}
			type='cancel'
			clickable
			withFill={false}
			width={22}
			height={22}
			onClick={onRemoveClick}
			buttonSameSize={false}
			className={clsx(cls.icon, cls.removeIcon)}
		/>)

	const removeButtonAnimated = (<AnimatePresence mode='wait'>
		{!isAddBoxModeActive &&
			<motion.div
				variants={animateIconsAndDataOnBox}
				initial='initial'
				animate='animate'
				exit='exit'
			>
				{removeButton}
			</motion.div>
		}
	</AnimatePresence>)

	return (
		<AnimatePresence>
			{!isRemoved &&
				// {!isRemoved &&
				<>
					<motion.div
						layout
						// layoutScroll
						layoutId={id}
						key={id}
						initial={isBoxSaved
							? false
							: {
								width: 0,
								marginRight: 0,
								scaleX: 0,
							}
						}
						animate={{
							width: 'auto',
							scaleX: 1,
							marginRight: 20,
							originX: 0.5,
						}}
						exit={{
							width: 0,
							scale: 0,
							opacity: 0,
							marginRight: 0,
							originX: 0.5,
							// transition: { delay: isBoxSaved ? 0 : 2 }
						}}
						transition={{ duration: DURATION_SEC }}
						style={{ flexShrink: 0 }}
					>
						<div className={clsx(
							cls.BoxSettingsItem,
							className)}
						>
							{title}
							<HStack max justify='center' gap='gap_4'>
								{timerIconAnimated}
								{!isLastBox && removeButtonAnimated}
							</HStack>
							<div style={{ height: 24 }}>
								<p>{getTiming(boxItem)}</p>
							</div>
						</div>

					</motion.div>
					<AnimatePresence mode='wait'>
						{isAddBoxModeActive && !isLastBox && <AddBoxIcon onClick={onAddNewBoxClickHandle} />}
					</AnimatePresence >
				</>
			}
		</AnimatePresence >
	)
}
// {
// 	boxItem.isSaved
// 	? boxItem.isOpen && timeSetterJSX
// 	: (
// 		<AnimatePresence>
// 			{boxItem.isOpen &&
// 				<motion.div
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					transition={{ delay: 0.7, duration: 1 }}
// 				>
// 					{timeSetterJSX}
// 				</motion.div>
// 			}
// 		</AnimatePresence>
// 	)
// }
{/* {isAddBoxModeActive && (
					<motion.div
						initial={{
							width: 0, height: 0, marginRight: 0,
							opacity: 0
						}}
						animate={{
							width: 30, height: 30, marginRight: 20, opacity: 1,
							transition: { opacity: { delay: 0.42 }, duration: 0.4 }
						}}
						exit={{
							width: 0, height: 0, opacity: 0, marginRight: 0, marginLeft: 0,
							transition: {
								opacity: { duration: 0.2, },
								width: { delay: 0.235, duration: 0.4 },
								height: { delay: 0.235, duration: 0.4 },
								marginRight: { delay: 0.235, duration: 0.4 },
							}
						}}
						className={cls.circle}
						onClick={e => {
							console.log(e)
							console.log(boxItem)
							onAddNewBoxClickHandle()
						}}
					>
						<motion.div className={cls.lineX} />
						<motion.div className={cls.lineY} />
					</motion.div>
					// </motion.div >
				)} */}








// <AnimatePresence mode='wait'>
// 	{isAddBoxModeActive && (
// 		<motion.div
// 			initial={{ width: 0, marginRight: 0, opacity: 0 }}
// 			animate={{
// 				width: 'auto', marginRight: 20, opacity: 1,
// 				transition: { opacity: { delay: 0.15 } }
// 			}}
// 			exit={{ width: 0, opacity: 0, marginRight: 0, transition: { opacity: { duration: 0.4 } } }}
// 		// onClick={() => {
// 		// 	// isAddBoxModeActive(false)
// 		// 	setAddedBoxIndex(boxItem.index)
// 		// 	setIsAddBoxModeActive(false)
// 		// }
// 		// }
// 		>

// 			new box
// 		</motion.div>
// 	)}
// </AnimatePresence>
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './BoxSettingsItem.module.scss';
// import { BoxSchema } from '@/entities/Box';
// import { Heading } from '@/shared/ui/Typography';
// import TimeIcon from '@/shared/assets/icons/timeIcon.svg'
// import { Icon } from '@/shared/ui/Icon';
// import { Dispatch, SetStateAction, useState } from 'react';
// import { TimeSetter } from '@/shared/ui/TimeSetter';
// import { Button } from '@/shared/ui/Button';
// import { TimingBlock } from '@/shared/types/DataBlock';
// import { ExtendedByIndexTimingBlock } from '../BoxesSettingsContent/BoxesSettingsContent';
// import { Overlay } from '@/shared/ui/Overlay/Overlay';
// import { AnimatePresence } from 'framer-motion';
// import { motion } from 'framer-motion'

// interface BoxSettingsItemProps {
// 	className?: string
// 	boxItem: ExtendedByIndexTimingBlock
// 	// setBoxesData: Dispatch<SetStateAction<BoxSchema[]>>
// 	onRemoveBox: (boxId: number) => void
// 	setIsAnyTimeSetterOpen: Dispatch<SetStateAction<boolean>>
// 	isAddBoxModeActive: boolean
// 	setAddedBoxIndex: Dispatch<SetStateAction<number | undefined>>
// 	setIsAddBoxModeActive: Dispatch<SetStateAction<boolean>>
// }

// const getTiming = (box: ExtendedByIndexTimingBlock) => {
// 	const { months, weeks, days, hours, minutes } = box
// 	const monthsStr = months === 0 ? '' : `${months}m. `
// 	const weeksStr = weeks === 0 ? '' : `${weeks}w. `
// 	const daysStr = days === 0 ? '' : `${days}d. `
// 	const hoursStr = hours === 0 ? '' : `${hours}h. `
// 	const minutesStr = minutes === 0 ? '' : `${minutes}min. `
// 	return monthsStr + weeksStr + daysStr + hoursStr + minutesStr
// }
// export const BoxSettingsItem = (props: BoxSettingsItemProps) => {
// 	const {
// 		className,
// 		boxItem,
// 		onRemoveBox,
// 		setIsAnyTimeSetterOpen,
// 		isAddBoxModeActive,
// 		setAddedBoxIndex,
// 		setIsAddBoxModeActive,
// 	} = props

// 	const [isTimeSetterOpen, setIsTimeSetterOpen] = useState(false)
// 	const { t } = useTranslation()
// 	const onClose = () => {
// 		setIsTimeSetterOpen(false)
// 		setIsAnyTimeSetterOpen(false)
// 	}
// 	const onOpenTimeSetter = () => {
// 		setIsAnyTimeSetterOpen(true)
// 		setIsTimeSetterOpen(true)
// 	}
// 	const onRemoveClick = () => {
// 		onRemoveBox(boxItem.index)
// 	}

// 	const title = (<Heading as='h5'
// 		className={cls.title}
// 		title={`${t('box text')} ${boxItem.index}`} />
// 	)

// 	const timerIcon = <Icon
// 		className={cls.icon}
// 		Svg={TimeIcon}
// 		clickable
// 		onClick={onOpenTimeSetter}
// 		width={20}
// 		height={20}
// 	/>
// 	const removeButton = <Button onClick={onRemoveClick}>remove</Button>

// 	return (
// 		<>
// 			<motion.div
// 				layout
// 				key={'initial'}
// 				// key={boxItem.index}
// 				initial={{ scale: 0 }}
// 				// initial={{ width: 0 }}
// 				animate={{ scale: 1 }}
// 				// animate={{ width: 'auto' }}
// 				transition={{ duration: 2 }}
// 			>
// 				<div className={clsx(
// 					cls.BoxSettingsItem,
// 					className)}
// 				>
// 					{title}
// 					{timerIcon}
// 					{removeButton}
// 					{isTimeSetterOpen &&
// 						<>
// 							<div className={cls.timeSetter} >
// 								<TimeSetter
// 									overlay={false}
// 									minutes={boxItem.minutes}
// 									hours={boxItem.hours}
// 									days={boxItem.days}
// 									weeks={boxItem.weeks}
// 									months={boxItem.months}
// 									onClose={onClose}
// 									lockSelector='[data-testid="Page"]'
// 								/>
// 							</div>
// 							<Overlay onClick={onClose} transparent />
// 						</>
// 					}
// 					{/* <p>Время</p> */}
// 					<p>{getTiming(boxItem)}</p>

// 				</div>
// 			</motion.div>
// 			<AnimatePresence mode='wait'>
// 				{isAddBoxModeActive && (
// 					<motion.div
// 						initial={{ width: 0, marginRight: 0, opacity: 0 }}
// 						animate={{
// 							width: 'auto', marginRight: 20, opacity: 1,
// 							transition: { opacity: { delay: 0.15 } }
// 						}}
// 						exit={{ width: 0, opacity: 0, marginRight: 0, transition: { opacity: { duration: 0.4 } } }}
// 						onClick={() => {
// 							// isAddBoxModeActive(false)
// 							setAddedBoxIndex(boxItem.index)
// 							setIsAddBoxModeActive(false)
// 						}
// 						}
// 					>
// 						new box
// 					</motion.div>
// 				)}
// 			</AnimatePresence>
// 		</>
// 	)

// }