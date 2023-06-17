import clsx from 'clsx';
import { ShelfSchema } from '@/entities/Shelf';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsContent.module.scss';
import { BoxesSettingsList } from '../BoxesSettingsList/BoxesSettingsList';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';

interface BoxesSettingsContentProps {
	className?: string
	shelf: ShelfSchema
	// shelfId?: string
	// isOpen: boolean
	// onClose: () => void
}

export const BoxesSettingsContent = memo((props: BoxesSettingsContentProps) => {
	const {
		shelf
	} = props
	// отрисовать коробки на основе данных полки
	// кнопка "добавить коробку"
	// кнопки удаления коробок
	// кнопки установки времени
	// пройти map через весь список коробок возвращая boxSettingsItem
	// 
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [boxesData, setBoxesData] = useState([...shelf.boxesData])

	return (
		<VStack align='center' max>
			<Heading as='h2' title={shelf.title} />
			<BoxesSettingsList
				boxesList={boxesData}
				setBoxesData={setBoxesData}
			/>
			<Button onClick={() => console.log(boxesData)}>Consol</Button>
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