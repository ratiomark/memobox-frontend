import clsx from 'clsx';
import { ShelfSchema } from '@/entities/Shelf';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsContent.module.scss';
import { BoxesSettingsList } from '../BoxesSettingsList/BoxesSettingsList';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { TimingBlock } from '@/shared/types/DataBlock';
import { Overlay } from '@/shared/ui/Overlay/Overlay';


export interface ExtendedByIndexTimingBlock extends TimingBlock {
	index: number
}

interface BoxesSettingsContentProps {
	className?: string
	shelfTemplate: TimingBlock[]
	setIsAnyTimeSetterOpen: Dispatch<SetStateAction<boolean>>
}

export const BoxesSettingsContent = memo((props: BoxesSettingsContentProps) => {
	const {
		shelfTemplate,
		setIsAnyTimeSetterOpen,
	} = props
	// отрисовать коробки на основе данных полки
	// кнопка "добавить коробку"
	// кнопки удаления коробок
	// кнопки установки времени
	// пройти map через весь список коробок возвращая boxSettingsItem
	// 
	// const [isAnyTimeSetterOpen, setIsAnyTimeSetterOpen] = useState(false)
	const [isAddBoxModeActive, setIsAddBoxModeActive] = useState(false)

	const { t } = useTranslation()
	const [boxesData, setBoxesData] = useState<ExtendedByIndexTimingBlock[]>(
		[
			...shelfTemplate.map((timingBlock, index) => ({ ...timingBlock, index }))
		]
	)

	return (
		<VStack align='center' max>
			{/* {isAnyTimeSetterOpen && <Overlay /> &} */}
			{/* <Heading as='h2' title={shelf.title} /> */}
			<BoxesSettingsList
				isAddBoxModeActive={isAddBoxModeActive}
				boxesList={boxesData}
				setBoxesData={setBoxesData}
				setIsAnyTimeSetterOpen={setIsAnyTimeSetterOpen}
			/>
			{/* <Button onClick={() => console.log(boxesData)}>Consol</Button> */}

			{isAddBoxModeActive
				? <Button onClick={() => setIsAddBoxModeActive(false)}>Cancel</Button>
				: <Button onClick={() => setIsAddBoxModeActive(true)}>Add</Button>
			}
		</VStack>
	)
	// const timeSetter = (
	// 	<div className={clsx(cls.Box,)} >
	// 		{isTimeSetterOpen &&
	// 			<div className={cls.timeSetter} >
	// 				<TimeSetter
	// 					minutes={minutes}
	// 					hours={hours}
	// 					days={days}
	// 					weeks={weeks}
	// 					months={months}
	// 					onClose={onClose}
	// 				/>
	// 			</div>
	// 		}
	// 		<MyText className={cls.timing} text={timing} />
	// 	</div>
	// )
	// return <p>sfjldf</p>
})
BoxesSettingsContent.displayName = 'BoxesSettingsContent'