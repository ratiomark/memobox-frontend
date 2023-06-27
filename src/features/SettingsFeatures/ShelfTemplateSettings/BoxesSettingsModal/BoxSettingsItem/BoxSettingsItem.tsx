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

interface BoxSettingsItemProps {
	className?: string
	boxItem: ExtendedByIndexTimingBlock
	// setBoxesData: Dispatch<SetStateAction<BoxSchema[]>>
	onRemoveBox: (boxId: number) => void
}

export const BoxSettingsItem = (props: BoxSettingsItemProps) => {
	const {
		className,
		boxItem,
		onRemoveBox,
	} = props

	const [isTimeSetterOpen, setIsTimeSetterOpen] = useState(false)
	const { t } = useTranslation()
	const onClose = () => {
		setIsTimeSetterOpen(false)
	}
	const onRemoveClick = () => {
		onRemoveBox(boxItem.index)
	}


	const title = (<Heading as='h5' className={cls.title} title={`${t('box text')} ${boxItem.index}`} />)

	return (
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
				onClick={() => setIsTimeSetterOpen(true)}
				width={20}
				height={20}
			/>
			<Button
				onClick={onRemoveClick}
			>
				remove
			</Button>
			{isTimeSetterOpen &&
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
			}
			<p>Время</p>
		</div>
	)

}