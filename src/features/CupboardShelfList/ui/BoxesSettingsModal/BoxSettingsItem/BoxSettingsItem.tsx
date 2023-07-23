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
interface BoxSettingsItemProps {
	className?: string
	boxItem: BoxSchema
	// setBoxesData: Dispatch<SetStateAction<BoxSchema[]>>
	onRemoveBox: (boxId: number) => void
}

export const BoxSettingsItem = (props: BoxSettingsItemProps) => {
	const {
		className,
		boxItem,
		onRemoveBox,
		// setBoxesData
		// timing,
		// boxId,
		// boxIndex,
		// shelfId
	} = props
	const { specialType } = boxItem
	const [isTimeSetterOpen, setIsTimeSetterOpen] = useState(false)
	const { t } = useTranslation()
	const onClose = () => {
		setIsTimeSetterOpen(false)
	}
	const onRemoveClick = () => {
		onRemoveBox(boxItem.index)
	}
	// const onRemoveBox = 
	if (boxItem.specialType === 'new') return <p>Вернул новую коробку</p>

	const title = specialType === 'none'
		? <Heading as='h5' className={cls.title} title={`${t('box text')} ${boxItem.index}`} />
		: <Heading as='h5' className={cls.title} title={t('learnt cards')} />

	return (
		<div className={clsx(
			cls.BoxSettingsItem,
			className)}
		>
			{title}
			<Icon
				className={cls.icon}
				Svg={TimeIcon}
				clickable
				onClick={() => setIsTimeSetterOpen(true)}
				width={20}
				height={20}
			/>
			<Button
				onClick={onRemoveClick}
			>
				remove
			</Button>
			{/* {isTimeSetterOpen &&
				<div className={cls.timeSetter} >
					<TimeSetter
						minutes={boxItem.timing.minutes}
						hours={boxItem.timing.hours}
						days={boxItem.timing.days}
						weeks={boxItem.timing.weeks}
						months={boxItem.timing.months}
						onSaveTime={() => alert('тут должен быть колбек')}
						onClose={onClose}
					/>
				</div>
			} */}
			<p>Время</p>
		</div>
	)

}