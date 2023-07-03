import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsList.module.scss';
import { BoxSchema } from '@/entities/Box';
import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
import { BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { TimingBlock } from '@/shared/types/DataBlock';
import { ExtendedByIndexTimingBlock } from '../BoxesSettingsContent/BoxesSettingsContent';
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/shared/ui/Icon';
import PlusIcon from '@/shared/assets/icons/plusIcon2.svg'


interface BoxesSettingsListProps {
	className?: string
	isAddBoxModeActive: boolean
	boxesList: ExtendedByIndexTimingBlock[]
	setBoxesData: Dispatch<SetStateAction<ExtendedByIndexTimingBlock[]>>
	setIsAnyTimeSetterOpen: Dispatch<SetStateAction<boolean>>
	setIsAddBoxModeActive: Dispatch<SetStateAction<boolean>>
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
		boxesList,
		setBoxesData,
		setIsAnyTimeSetterOpen,
		isAddBoxModeActive,
		setIsAddBoxModeActive,
	} = props

	const { t } = useTranslation()

	const onRemoveBox = useCallback((boxIndex: number) => {
		// console.log('boxIndex = ', boxIndex)
		const start = boxesList.slice(0, boxIndex)
		const end = boxesList.slice(boxIndex + 1,)
		// console.log('start', start)
		// console.log('end', end)
		// console.log(boxesList)
		setBoxesData([...start, ...end])
	}, [boxesList, setBoxesData])

	const [addedBoxIndex, setAddedBoxIndex] = useState<number>()

	const boxesRendered = useMemo(() => {
		const boxListRelevant = boxesList.slice(1, boxesList.length - 1)
		if (typeof addedBoxIndex === 'number') {
			const box: ExtendedByIndexTimingBlock = {
				days: 0,
				hours: 0,
				weeks: 0,
				months: 0,
				index: addedBoxIndex,
				minutes: 0,
			}
			const updatedBoxesList: ExtendedByIndexTimingBlock[] = [];
			if (addedBoxIndex === 0) {
				console.log('Я нуль!')
				updatedBoxesList.push({ ...box, index: addedBoxIndex + 1 })
				boxListRelevant.forEach(boxItem => {
					const index = boxItem.index + 1
					updatedBoxesList.push({ ...boxItem, index })
				})
			}
			else if (addedBoxIndex === boxListRelevant.length) {
				console.log('А я чекаю пограничный:  ', addedBoxIndex)
				console.log('boxListRelevant: ', boxListRelevant)
				boxListRelevant.forEach(boxItem => {
					updatedBoxesList.push(boxItem)
				})
				console.log(updatedBoxesList)
				updatedBoxesList.push({ ...box, index: addedBoxIndex + 1 })
				console.log(updatedBoxesList)
			}
			else {
				console.log('Я обработка общего случая, индекс:  ', addedBoxIndex)
				// console.log(boxListRelevant.slice(0, addedBoxIndex))
				boxListRelevant.slice(0, addedBoxIndex).forEach(boxItem => {
					updatedBoxesList.push(boxItem)
				})
				// console.log(updatedBoxesList)
				updatedBoxesList.push({ ...box, index: addedBoxIndex + 1 })
				// console.log(updatedBoxesList)
				boxListRelevant.slice(addedBoxIndex,).forEach(boxItem => {
					const index = boxItem.index + 1
					updatedBoxesList.push({ ...boxItem, index })
				})
				// console.log(updatedBoxesList)
			}

			return updatedBoxesList.map(boxItem => {
				console.log('UPDATED  :  ', boxItem, boxItem.index)
				return (
					<BoxSettingsItem
						setIsAddBoxModeActive={setIsAddBoxModeActive}
						onRemoveBox={onRemoveBox}
						setIsAnyTimeSetterOpen={setIsAnyTimeSetterOpen}
						isAddBoxModeActive={isAddBoxModeActive}
						setAddedBoxIndex={setAddedBoxIndex}
						// setBoxesData={setBoxesData}
						boxItem={boxItem}
						key={boxItem.index}
					/>)
			})
		}
		return boxListRelevant.map(boxItem => {
			console.log('REG  :  ', boxItem, boxItem.index)
			return (
				<BoxSettingsItem
					setIsAddBoxModeActive={setIsAddBoxModeActive}
					onRemoveBox={onRemoveBox}
					setIsAnyTimeSetterOpen={setIsAnyTimeSetterOpen}
					isAddBoxModeActive={isAddBoxModeActive}
					setAddedBoxIndex={setAddedBoxIndex}
					// setBoxesData={setBoxesData}
					boxItem={boxItem}
					key={boxItem.index}
				/>)
		})
	}, [onRemoveBox, isAddBoxModeActive, boxesList, setIsAnyTimeSetterOpen, addedBoxIndex, setIsAddBoxModeActive])

	const firstIcon = (
		<AnimatePresence>
			{isAddBoxModeActive && (
				<motion.div
					layout
					variants={animation}
					initial='initial'
					animate='animate'
					exit='exit'
					onClick={() => {
						console.log('CLICKCKCKCKCK')
						setAddedBoxIndex(0)
					}}
				// initial={{ width: 0, marginRight: 0 }}
				// animate={{ width: 'auto', marginRight: 20 }}
				// exit={{ width: 0, opacity: 0, marginRight: 0 }}
				// style={{marginRight: 20}}
				>
					<Icon
						Svg={PlusIcon}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	)

	return (
		// <AnimatePresence >
		<div
			// layout
			// layoutRoot
			// initial={{ width: 0 }}
			// animate={{ width: 'auto' }}
			// transition={{ duration: 2 }}
			className={clsx(
				cls.BoxesSettingsList,
				className
			)}
		>
			<BoxSettingsSpecialBox type={'new'} />
			{firstIcon}
			{boxesRendered}
			<BoxSettingsSpecialBox type={'learnt'} />
		</div>
		// </AnimatePresence>
	)
}