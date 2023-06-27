import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsList.module.scss';
import { BoxSchema } from '@/entities/Box';
import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
import { BoxSettingsItemNewCardsBox, BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';
import { Dispatch, SetStateAction } from 'react';
import { TimingBlock } from '@/shared/types/DataBlock';
import { ExtendedByIndexTimingBlock } from '../BoxesSettingsContent/BoxesSettingsContent';


interface BoxesSettingsListProps {
	className?: string
	boxesList: ExtendedByIndexTimingBlock[]
	setBoxesData: Dispatch<SetStateAction<ExtendedByIndexTimingBlock[]>>
}

export const BoxesSettingsList = (props: BoxesSettingsListProps) => {
	const {
		className,
		boxesList,
		setBoxesData
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
		<div className={clsx(
			cls.BoxesSettingsList,
			className)}
		>
			<BoxSettingsSpecialBox type={'new'} />
			{boxesList.slice(1, boxesList.length - 1).map(boxItem => {
				return (
					<BoxSettingsItem
						onRemoveBox={onRemoveBox}
						// setBoxesData={setBoxesData}
						boxItem={boxItem}
						key={boxItem.index}
					/>)
			})}
			<BoxSettingsSpecialBox type={'learnt'} />
		</div>
	)
}