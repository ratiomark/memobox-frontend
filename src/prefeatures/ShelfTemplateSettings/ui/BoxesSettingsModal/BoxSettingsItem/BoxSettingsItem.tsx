import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxSettingsItem.module.scss';
import { BoxSchema } from '@/entities/Box';
import { Heading } from '@/shared/ui/Typography';
import TimeIcon from '@/shared/assets/icons/timeIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { Button } from '@/shared/ui/Button';
import { TimingBlock } from '@/shared/types/DataBlock';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion'
import { ExtendedTimingBlock } from '../../../model/types/SettingsShelfTemplate';
import { useSelector } from 'react-redux';
import { getBoxIsTimeSetterOpen, getSettingsShelfTemplateMode } from '../../../model/selectors/settingsShelfTemplate';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { settingsShelfTemplateActions } from '../../../model/slice/shelfTemplateSlice';
import { delay } from '@reduxjs/toolkit/dist/utils';
import { AddBoxIcon } from './AddBoxIcon';
import { StateSchema } from '@/app/providers/StoreProvider';
import { DURATION_MILLISEC, DURATION_SEC, } from '@/shared/const/animationConsts';

interface BoxSettingsItemProps {
	className?: string
	boxItem: ExtendedTimingBlock
	onRemoveBox: (boxId: number) => void
	onAddBoxClick: (index: number) => void
}

const getTiming = (box: ExtendedTimingBlock) => {
	const { months, weeks, days, hours, minutes } = box
	const monthsStr = months === 0 ? '' : `${months}m. `
	const weeksStr = weeks === 0 ? '' : `${weeks}w. `
	const daysStr = days === 0 ? '' : `${days}d. `
	const hoursStr = hours === 0 ? '' : `${hours}h. `
	const minutesStr = minutes === 0 ? '' : `${minutes}min. `
	return monthsStr + weeksStr + daysStr + hoursStr + minutesStr
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
		// isAddBoxModeActive,
	} = props
	const dispatch = useAppDispatch()
	// const [isTimeSetterOpen, setIsTimeSetterOpen] = useState(false)
	const { isSaved: isBoxSaved, minutes, hours, days, weeks, months, id, index: boxIndex } = boxItem
	const isTimeSetterOpen = useSelector((state: StateSchema) => getBoxIsTimeSetterOpen(state, id))
	// console.log('time setter open: ', isTimeSetterOpen)
	const mode = useSelector(getSettingsShelfTemplateMode)
	const isAddBoxModeActive = mode === 'choosingBoxPlace'
	const [isRemoved, setIsRemoved] = useState(false)
	const { t } = useTranslation()

	const onCloseTimeSetter = useCallback(() => {
		if (isBoxSaved) dispatch(settingsShelfTemplateActions.closeTimeSetter(id))
		else setIsRemoved(true)

		setTimeout(() => {
			if (!isBoxSaved) {
				dispatch(settingsShelfTemplateActions.closeTimeSetter(id))
				dispatch(settingsShelfTemplateActions.removeAddedBox())
			}
		}, 500)
	}, [isBoxSaved, id, dispatch])

	const onAddNewBoxClickHandle = () => {
		onAddBoxClick(boxIndex! + 1)
	}

	const onOpenTimeSetter = () => {
		dispatch(settingsShelfTemplateActions.openTimeSetter(id))
	}

	const onSetNewBoxTime = useCallback((timeObject: TimingBlock) => {
		dispatch(settingsShelfTemplateActions.setTimeToBoxById({ boxId: id, timeObject }))
	}, [id, dispatch])

	const onRemoveClick = () => {
		setIsRemoved(true)
		setTimeout(() => {
			onRemoveBox(boxIndex!)
		}, DURATION_MILLISEC)
	}

	const title = (<Heading as='h5'
		className={cls.title}
		title={`${t('box text')} ${boxIndex! + 1}`} />
	)

	const timerIcon = (<Icon
		className={cls.icon}
		Svg={TimeIcon}
		clickable
		onClick={onOpenTimeSetter}
		width={20}
		height={20}
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

	const removeButton = <Button onClick={onRemoveClick}>remove</Button>

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

	const timeSetterJSX = useMemo(() => (<>
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { delay: 0, duration: 0.4 } }}
			transition={{ delay: isBoxSaved ? 0 : 0.6, duration: DURATION_SEC }}
			className={cls.timeSetter}
		>
			<TimeSetter
				overlay={false}
				minutes={minutes}
				hours={hours}
				days={days}
				weeks={weeks}
				months={months}
				onClose={onCloseTimeSetter}
				onSaveTime={onSetNewBoxTime}
				lockSelector='[data-testid="Page"]'
			/>
		</motion.div>
		<Overlay onClick={onCloseTimeSetter} transparent />
	</>), [minutes, hours, days, weeks, months, isBoxSaved, onSetNewBoxTime, onCloseTimeSetter])

	return (
		<AnimatePresence>
			{!isRemoved &&
				<>
					<motion.div
						// layout
						layoutId={id.toString()}
						key={id}
						initial={isBoxSaved ? false : {
							width: 0,
							// originY: 0,
							// scale: 0,
							marginRight: 0
						}}
						animate={{
							width: 'auto',
							// originX: 0.5,
							// originY: 0,
							// scale: 1, transformOrigin: 'center',
							marginRight: 20
						}}
						exit={{ width: 0, scale: 0, opacity: 0, marginRight: 0, }}
						transition={{ duration: DURATION_SEC }}
					// style={{ width: 'maxContent', display: 'flex'}}
					>
						<div className={clsx(
							cls.BoxSettingsItem,
							className)}
						>
							{title}
							{timerIconAnimated}
							{removeButtonAnimated}
							<p>{getTiming(boxItem)}</p>

							<AnimatePresence mode='wait'>
								{isTimeSetterOpen && timeSetterJSX}
							</AnimatePresence>
						</div>

					</motion.div>
					<AnimatePresence mode='wait'>
						{isAddBoxModeActive && <AddBoxIcon onClick={onAddNewBoxClickHandle} />}
					</AnimatePresence >
				</>
			}
		</AnimatePresence>
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