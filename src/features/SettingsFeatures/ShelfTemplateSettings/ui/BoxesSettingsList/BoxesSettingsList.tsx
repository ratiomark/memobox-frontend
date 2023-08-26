import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsList.module.scss';
import { BoxSchema } from '@/entities/Box';
import { useCallback, useEffect, useMemo, useRef } from 'react';
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
		id: (Math.random() * Math.random()).toString(),
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
	const containerRef = useRef<HTMLDivElement>(null)

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
		const newBox = createBox(index)
		console.log(newBox)
		dispatch(settingsShelfTemplateActions.setTimingSetterModalBoxId(newBox.id.toString()))
		const updatedBoxesList: ExtendedTimingBlock[] = [];
		const boxListRelevant = currentShelfTemplate.slice(0, currentShelfTemplate.length)

		console.log(' INDEX   INDEX   ', index)
		if (index === 0) {
			// updatedBoxesList.push({ ...newBox, index })
			updatedBoxesList.push(newBox)
			console.log(updatedBoxesList)
			boxListRelevant.forEach(boxItem => {
				updatedBoxesList.push({ ...boxItem, index: boxItem.index! + 1 })
			})
			// console.log(updatedBoxesList)
			// console.log('КОНЕЦЦЦЦЦЦЦ')
		} else if (index === boxListRelevant.length) {
			// console.log('LAST LAST LAST LAST LAST LAST LAST LAST')
			boxListRelevant.forEach(boxItem => updatedBoxesList.push(boxItem))
			updatedBoxesList.push(newBox)
		} else {
			boxListRelevant.slice(0, index).forEach(boxItem => {
				updatedBoxesList.push(boxItem)
			})
			// console.log(updatedBoxesList)
			updatedBoxesList.push(newBox)
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
	}, [currentShelfTemplate, dispatch])

	useEffect(() => {
		if (containerRef.current) {
			if (containerRef.current.scrollWidth > containerRef.current.clientWidth) {
				dispatch(settingsShelfTemplateActions.setIsRightSideActive(true))
			}
		}
	}, [dispatch])


	const handleScroll = () => {
		if (containerRef.current) {
			const container = containerRef.current
			const scrollLeft = container.scrollLeft
			const scrollWidth = container.scrollWidth
			const clientWidth = container.clientWidth
			const percentScrolledLeft = Math.ceil((scrollLeft / (scrollWidth - clientWidth)) * 100)
			const percentScrolledRight = Math.ceil(100 - percentScrolledLeft)
			if (percentScrolledLeft > 0) {
				dispatch(settingsShelfTemplateActions.setIsLeftSideActive(true))
			} else {
				dispatch(settingsShelfTemplateActions.setIsLeftSideActive(false))
			}
			if (percentScrolledRight <= 0) {
				dispatch(settingsShelfTemplateActions.setIsRightSideActive(false))
			} else {
				dispatch(settingsShelfTemplateActions.setIsRightSideActive(true))
			}
			// console.log(`Scrolled Left: ${percentScrolledLeft}%`)
			// console.log(`Scrolled Right: ${percentScrolledRight}%`)
		}
	};

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

		<div className={cls.wrapper} onScroll={handleScroll} ref={containerRef}>

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
