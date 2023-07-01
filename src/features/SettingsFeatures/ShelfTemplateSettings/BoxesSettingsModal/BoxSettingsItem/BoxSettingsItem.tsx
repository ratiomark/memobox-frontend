import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxSettingsItem.module.scss';
import { BoxSchema } from '@/entities/Box';
import { Heading } from '@/shared/ui/Typography';
import TimeIcon from '@/shared/assets/icons/timeIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { Dispatch, SetStateAction, useState } from 'react';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { Button } from '@/shared/ui/Button';
import { TimingBlock } from '@/shared/types/DataBlock';
import { ExtendedByIndexTimingBlock } from '../BoxesSettingsContent/BoxesSettingsContent';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion'

interface BoxSettingsItemProps {
	className?: string
	boxItem: ExtendedByIndexTimingBlock
	// setBoxesData: Dispatch<SetStateAction<BoxSchema[]>>
	onRemoveBox: (boxId: number) => void
	setIsAnyTimeSetterOpen: Dispatch<SetStateAction<boolean>>
	isAddBoxModeActive: boolean
}

export const BoxSettingsItem = (props: BoxSettingsItemProps) => {
	const {
		className,
		boxItem,
		onRemoveBox,
		setIsAnyTimeSetterOpen,
		isAddBoxModeActive,
	} = props

	const [isTimeSetterOpen, setIsTimeSetterOpen] = useState(false)
	const { t } = useTranslation()
	const onClose = () => {
		setIsTimeSetterOpen(false)
		setIsAnyTimeSetterOpen(false)
	}
	const onOpenTimeSetter = () => {
		setIsAnyTimeSetterOpen(true)
		setIsTimeSetterOpen(true)
	}
	const onRemoveClick = () => {
		onRemoveBox(boxItem.index)
	}


	const title = (<Heading as='h5' className={cls.title} title={`${t('box text')} ${boxItem.index}`} />)

	return (
		<>
			<div className={clsx(
				cls.BoxSettingsItem,
				className)}
			>
				<Heading
					className={cls.title}
					as='h5'
					title={`${t('box text')} ${boxItem.index}`}
				/>
				<Icon
					className={cls.icon}
					Svg={TimeIcon}
					clickable
					onClick={onOpenTimeSetter}
					width={20}
					height={20}
				/>
				{/* <Button
				onClick={onRemoveClick}
			>
				remove
			</Button> */}
				{isTimeSetterOpen &&
					<>
						<div className={cls.timeSetter} >
							<TimeSetter
								overlay={false}
								minutes={boxItem.minutes}
								hours={boxItem.hours}
								days={boxItem.days}
								weeks={boxItem.weeks}
								months={boxItem.months}
								onClose={onClose}
								lockSelector='[data-testid="Page"]'
							/>
						</div>
						<Overlay onClick={onClose} transparent />
					</>
				}
				<p>Время</p>
			</div>
			<AnimatePresence>
				{isAddBoxModeActive && (
					<motion.div
						initial={{ width: 0, marginRight: 0 , opacity: 0}}
						animate={{
							width: 'auto', marginRight: 20, opacity: 1,
							transition: { opacity: { delay: 0.15} }
						}}
						exit={{ width: 0, opacity: 0, marginRight: 0, transition: { opacity: { duration: 0.1 } } }}
					>
						kasjfoiwfj
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)

}