import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsList.module.scss';
import { BoxSchema } from '@/entities/Box';
import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
import { BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';
import { Dispatch, SetStateAction } from 'react';
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
	} = props

	const { t } = useTranslation()

	const onRemoveBox = (boxIndex: number) => {
		// console.log('boxIndex = ', boxIndex)
		const start = boxesList.slice(0, boxIndex)
		const end = boxesList.slice(boxIndex + 1,)
		// console.log('start', start)
		// console.log('end', end)
		// console.log(boxesList)
		setBoxesData([...start, ...end])
	}

	// console.log('boxesSlice', boxesList.slice(1, boxesList.length - 1))
	// console.log('boxesList', boxesList)

	return (
		<motion.div
			layout
			layoutRoot
			className={clsx(
				cls.BoxesSettingsList,
				className
			)}
		>
			<BoxSettingsSpecialBox type={'new'} />
			<AnimatePresence>
				{isAddBoxModeActive && (
					<motion.div
						variants={animation}
						initial='initial'
						animate='animate'
						exit='exit'
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
			{boxesList.slice(1, boxesList.length - 1).map(boxItem => {
				return (
					<BoxSettingsItem
						onRemoveBox={onRemoveBox}
						setIsAnyTimeSetterOpen={setIsAnyTimeSetterOpen}
						isAddBoxModeActive={isAddBoxModeActive}
						// setBoxesData={setBoxesData}
						boxItem={boxItem}
						key={boxItem.index}
					/>)
			})}
			<BoxSettingsSpecialBox type={'learnt'} />
		</motion.div>
	)
}