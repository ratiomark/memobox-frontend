import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsList.module.scss';
import { BoxSchema } from '@/entities/Box';
import { useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/shared/ui/Icon';
import PlusIcon from '@/shared/assets/icons/plusIcon2.svg'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { settingsShelfTemplateActions } from '../../model/slice/shelfTemplateSlice';
import { getSettingsCurrentShelfTemplate, getSettingsShelfTemplateMode } from '../../model/selectors/settingsShelfTemplate';
import { useSelector } from 'react-redux';
import { AddBoxIcon } from '../AddBoxIcon/AddBoxIcon';
import { ExtendedTimingBlock } from '@/shared/types/DataBlock';
import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
import { BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';

const createBox = (index: number): ExtendedTimingBlock => {
	return {
		days: 0,
		hours: 0,
		weeks: 0,
		months: 0,
		index,
		minutes: 0,
		keyId: 'unsaved',
		isSaved: false,
		id: Math.random() * Math.random(),
		isOpen: true,
	}
}

interface BoxesSettingsListProps {
	className?: string
}

const animation = {
	initial: { width: 0, marginRight: 0, opacity: 0 },
	animate: { width: 'auto', marginRight: 20, opacity: 1 },
	exit: {
		width: 0, opacity: 0, marginRight: 0,
		transition: {
			// opacity: { duration: 0.1 }
		}
	}

}


export const BoxesSettingsList = (props: BoxesSettingsListProps) => {
	const {
		className,
	} = props

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const mode = useSelector(getSettingsShelfTemplateMode)
	const currentShelfTemplate = useSelector(getSettingsCurrentShelfTemplate)

	const onRemoveBox = useCallback((boxIndex: number) => {
		if (!currentShelfTemplate) return
		const start = currentShelfTemplate.slice(0, boxIndex)
		const end = currentShelfTemplate.slice(boxIndex + 1,)
		// console.log('start', start)
		// console.log('end', end)
		// console.log(boxesList)
		dispatch(settingsShelfTemplateActions.setCurrentTemplate([...start, ...end]))
	}, [currentShelfTemplate, dispatch])

	const onAddBoxClick = useCallback((index: number) => {
		if (!currentShelfTemplate?.length) return
		// dispatch(settingsShelfTemplateActions.setMode('settingTimeToNewBox'))
		const box = createBox(index)
		const updatedBoxesList: ExtendedTimingBlock[] = [];
		const boxListRelevant = currentShelfTemplate.slice(0, currentShelfTemplate.length)

		console.log(' INDEX   INDEX   ', index)
		if (index === 0) {
			// updatedBoxesList.push({ ...box, index })
			updatedBoxesList.push(box)
			console.log(updatedBoxesList)
			boxListRelevant.forEach(boxItem => {
				updatedBoxesList.push({ ...boxItem, index: boxItem.index! + 1 })
			})
			console.log(updatedBoxesList)
			console.log('КОНЕЦЦЦЦЦЦЦ')
		} else if (index === boxListRelevant.length) {
			console.log('LAST LAST LAST LAST LAST LAST LAST LAST')
			boxListRelevant.forEach(boxItem => updatedBoxesList.push(boxItem))
			updatedBoxesList.push(box)
		} else {
			boxListRelevant.slice(0, index).forEach(boxItem => {
				updatedBoxesList.push(boxItem)
			})
			// console.log(updatedBoxesList)
			updatedBoxesList.push({ ...box })
			// console.log(updatedBoxesList)
			currentShelfTemplate.slice(index,).forEach(boxItem => {
				updatedBoxesList.push({ ...boxItem, index: boxItem.index! + 1 })
			})
		}
		// setTimeout(() => {
		// 	dispatch(settingsShelfTemplateActions.setCurrentTemplate(updatedBoxesList))
		// }, 700)
		// вот тут нужно изменить isOpen у только что добавленнной коробки, через таймаут
		// dispatch(settingsShelfTemplateActions.setChanged(true))
		dispatch(settingsShelfTemplateActions.setMode('settingTimeToNewBox'))

		setTimeout(() => {
			dispatch(settingsShelfTemplateActions.setCurrentTemplate(updatedBoxesList))
		}, 500)
		// dispatch(settingsShelfTemplateActions.setCurrentTemplate(updatedBoxesList))
		// dispatch(settingsShelfTemplateActions.setMode('settingTimeToNewBox'))
	}, [currentShelfTemplate, dispatch])


	const boxesRendered = useMemo(() => {
		const boxesCount = currentShelfTemplate?.length
		if (!boxesCount) return []

		return currentShelfTemplate.map((boxItem, index) => {
			// const onOpenTimeSetter = (e: MouseEvent) => {

			// dispatch(settingsShelfTemplateActions.openTimeSetter(boxItem.id))
			// }
			// console.log('REG  :  ', boxItem.index, boxItem.isSaved, boxItem.keyId)
			return (
				<BoxSettingsItem
					onRemoveBox={onRemoveBox}
					onAddBoxClick={onAddBoxClick}
					boxItem={boxItem}
					key={boxItem.id}
					isLastBox={index === boxesCount - 1}
				/>)
		})
		// const learntCardBox = <BoxSettingsItem onRemoveBox={onRemoveBox} onAddBoxClick={onAddBoxClick} boxItem={boxItem}
	}, [onRemoveBox, currentShelfTemplate, onAddBoxClick])

	const firstIcon = (
		<AnimatePresence>
			{mode === 'choosingBoxPlace' &&
				<AddBoxIcon onClick={() => onAddBoxClick(0)} />
			}
		</AnimatePresence>
	)

	return (

		<div className={cls.wrapper} >

			<motion.div
				layout
				// layoutRoot
				className={clsx(
					cls.BoxesSettingsList,
					className
				)}
			>
				<BoxSettingsSpecialBox type={'new'} />
				{firstIcon}
				{boxesRendered}
				{/* <BoxSettingsSpecialBox type={'learnt'} /> */}
				{/* </AnimatePresence> */}
			</motion.div>
		</div>
	)
}
// 	return (
// 		<motion.div
// 			layout
// 		>
// 			<div className={cls.wrapper} >

// 				<motion.div
// 					layout
// 					// layoutRoot
// 					className={clsx(
// 						cls.BoxesSettingsList,
// 						className
// 					)}
// 				>
// 					<BoxSettingsSpecialBox type={'new'} />
// 					{firstIcon}
// 					{boxesRendered}
// 					{/* <BoxSettingsSpecialBox type={'learnt'} /> */}
// 					{/* </AnimatePresence> */}
// 				</motion.div>
// 			</div>
// 		</motion.div>
// 	)
// }
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './BoxesSettingsList.module.scss';
// import { BoxSchema } from '@/entities/Box';
// import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
// import { BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';
// import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
// import { TimingBlock } from '@/shared/types/DataBlock';
// import { ExtendedByIndexTimingBlock } from '../BoxesSettingsContent/BoxesSettingsContent';
// import { AnimatePresence, motion } from 'framer-motion'
// import { Icon } from '@/shared/ui/Icon';
// import PlusIcon from '@/shared/assets/icons/plusIcon2.svg'
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { settingsShelfTemplateActions } from '../../../model/slice/shelfTemplateSlice';


// interface BoxesSettingsListProps {
// 	className?: string
// 	isAddBoxModeActive: boolean
// 	boxesList: ExtendedByIndexTimingBlock[]
// 	setBoxesData: Dispatch<SetStateAction<ExtendedByIndexTimingBlock[]>>
// 	setIsAnyTimeSetterOpen: Dispatch<SetStateAction<boolean>>
// 	setIsAddBoxModeActive: Dispatch<SetStateAction<boolean>>
// }

// const animation = {
// 	initial: { width: 0, marginRight: 0, opacity: 0 },
// 	animate: { width: 'auto', marginRight: 20, opacity: 1 },
// 	exit: {
// 		width: 0, opacity: 0, marginRight: 0,
// 		transition: {
// 			// opacity: { duration: 0.1 }
// 		}
// 	}

// }


// export const BoxesSettingsList = (props: BoxesSettingsListProps) => {
// 	const {
// 		className,
// 		boxesList,
// 		setBoxesData,
// 		setIsAnyTimeSetterOpen,
// 		isAddBoxModeActive,
// 		setIsAddBoxModeActive,
// 	} = props

// 	const { t } = useTranslation()
// 	const dispatch = useAppDispatch()

// 	const onRemoveBox = useCallback((boxIndex: number) => {
// 		// console.log('boxIndex = ', boxIndex)
// 		const start = boxesList.slice(0, boxIndex)
// 		const end = boxesList.slice(boxIndex + 1,)
// 		// console.log('start', start)
// 		// console.log('end', end)
// 		// console.log(boxesList)
// 		dispatch(settingsShelfTemplateActions.setCurrentTemplate([...start, ...end]))
// 		setBoxesData([...start, ...end])
// 	}, [boxesList, setBoxesData, dispatch])

// 	const [addedBoxIndex, setAddedBoxIndex] = useState<number>()

// 	const boxesRendered = useMemo(() => {
// 		const boxListRelevant = boxesList.slice(1, boxesList.length - 1)
// 		if (typeof addedBoxIndex === 'number') {
// 			const box: ExtendedByIndexTimingBlock = {
// 				days: 0,
// 				hours: 0,
// 				weeks: 0,
// 				months: 0,
// 				index: addedBoxIndex,
// 				minutes: 0,
// 			}
// 			const updatedBoxesList: ExtendedByIndexTimingBlock[] = [];
// 			if (addedBoxIndex === 0) {
// 				console.log('Я нуль!')
// 				updatedBoxesList.push({ ...box, index: addedBoxIndex + 1 })
// 				boxListRelevant.forEach(boxItem => {
// 					const index = boxItem.index + 1
// 					updatedBoxesList.push({ ...boxItem, index })
// 				})
// 			}
// 			else if (addedBoxIndex === boxListRelevant.length) {
// 				console.log('А я чекаю пограничный:  ', addedBoxIndex)
// 				console.log('boxListRelevant: ', boxListRelevant)
// 				boxListRelevant.forEach(boxItem => {
// 					updatedBoxesList.push(boxItem)
// 				})
// 				console.log(updatedBoxesList)
// 				updatedBoxesList.push({ ...box, index: addedBoxIndex + 1 })
// 				console.log(updatedBoxesList)
// 			}
// 			else {
// 				console.log('Я обработка общего случая, индекс:  ', addedBoxIndex)
// 				// console.log(boxListRelevant.slice(0, addedBoxIndex))
// 				boxListRelevant.slice(0, addedBoxIndex).forEach(boxItem => {
// 					updatedBoxesList.push(boxItem)
// 				})
// 				// console.log(updatedBoxesList)
// 				updatedBoxesList.push({ ...box, index: addedBoxIndex + 1 })
// 				// console.log(updatedBoxesList)
// 				boxListRelevant.slice(addedBoxIndex,).forEach(boxItem => {
// 					const index = boxItem.index + 1
// 					updatedBoxesList.push({ ...boxItem, index })
// 				})
// 				// console.log(updatedBoxesList)
// 			}

// 			return updatedBoxesList.map(boxItem => {
// 				console.log('UPDATED  :  ', boxItem, boxItem.index)
// 				return (
// 					<BoxSettingsItem
// 						setIsAddBoxModeActive={setIsAddBoxModeActive}
// 						onRemoveBox={onRemoveBox}
// 						setIsAnyTimeSetterOpen={setIsAnyTimeSetterOpen}
// 						isAddBoxModeActive={isAddBoxModeActive}
// 						setAddedBoxIndex={setAddedBoxIndex}
// 						// setBoxesData={setBoxesData}
// 						boxItem={boxItem}
// 						key={boxItem.index}
// 					/>)
// 			})
// 		}
// 		return boxListRelevant.map(boxItem => {
// 			console.log('REG  :  ', boxItem, boxItem.index)
// 			return (
// 				<BoxSettingsItem
// 					setIsAddBoxModeActive={setIsAddBoxModeActive}
// 					onRemoveBox={onRemoveBox}
// 					setIsAnyTimeSetterOpen={setIsAnyTimeSetterOpen}
// 					isAddBoxModeActive={isAddBoxModeActive}
// 					setAddedBoxIndex={setAddedBoxIndex}
// 					// setBoxesData={setBoxesData}
// 					boxItem={boxItem}
// 					key={boxItem.index}
// 				/>)
// 		})
// 	}, [onRemoveBox, isAddBoxModeActive, boxesList, setIsAnyTimeSetterOpen, addedBoxIndex, setIsAddBoxModeActive])

// 	const firstIcon = (
// 		<AnimatePresence>
// 			{isAddBoxModeActive && (
// 				<motion.div
// 					layout
// 					variants={animation}
// 					initial='initial'
// 					animate='animate'
// 					exit='exit'
// 					onClick={() => {
// 						console.log('CLICKCKCKCKCK')
// 						setAddedBoxIndex(0)
// 					}}
// 				// initial={{ width: 0, marginRight: 0 }}
// 				// animate={{ width: 'auto', marginRight: 20 }}
// 				// exit={{ width: 0, opacity: 0, marginRight: 0 }}
// 				// style={{marginRight: 20}}
// 				>
// 					<Icon
// 						Svg={PlusIcon}
// 					/>
// 				</motion.div>
// 			)}
// 		</AnimatePresence>
// 	)

// 	return (
// 		// <AnimatePresence >
// 		<div
// 			// layout
// 			// layoutRoot
// 			// initial={{ width: 0 }}
// 			// animate={{ width: 'auto' }}
// 			// transition={{ duration: 2 }}
// 			className={clsx(
// 				cls.BoxesSettingsList,
// 				className
// 			)}
// 		>
// 			<BoxSettingsSpecialBox type={'new'} />
// 			{firstIcon}
// 			{boxesRendered}
// 			<BoxSettingsSpecialBox type={'learnt'} />
// 		</div>
// 		// </AnimatePresence>
// 	)
// }