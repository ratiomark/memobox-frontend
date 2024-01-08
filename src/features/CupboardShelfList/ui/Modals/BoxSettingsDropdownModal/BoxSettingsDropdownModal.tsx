import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../..';
import {
	getBoxSettingsDropdownModalIsOpen,
	getBoxSettingsDropdownCoordinates,
	getBoxSettingsDropdownBoxId,
	getBoxSettingsDropdownIsLearntBox,
} from '../../../model/selectors/getBoxSettingDropdownModal'
import { MyText } from '@/shared/ui/Typography';
import { dropDownLocalTextSize } from '@/shared/const/fontSizes';
import { missedTrainingDropdownLocalKey, removeBoxDropdownLocalKey } from '@/shared/const/translationKeys';
import { DropdownLocalList } from './DropdownLocalList';
import { idCupboardShelfList, idDropDownLocalTemplateHidden } from '@/shared/const/idsAndDataAttributes';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { useRef, useState, useEffect, useCallback } from 'react';
import { deleteBoxThunk } from '../../../model/services/deleteBoxThunk';

export const BoxSettingsDropdownModal = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getBoxSettingsDropdownModalIsOpen)
	const coordinates = useSelector(getBoxSettingsDropdownCoordinates)
	const boxId = useSelector(getBoxSettingsDropdownBoxId)
	const isLearntBox = useSelector(getBoxSettingsDropdownIsLearntBox)
	const headerHeight = useRef(0)
	const cupboardShelfListRects = useRef({ x: 0, y: 0, width: 0 })
	const dropdownHiddenSizes = useRef({ height: 0, width: 0 })
	const [coordinatesChecked, setCoordinatesChecked] = useState({ x: 0, y: 0 })
	const [checked, setChecked] = useState(false)

	// VAR: Тут нужно рефакторить в кастомные хуки
	useEffect(() => {
		setTimeout(() => {
			const header = document.querySelector('header') as HTMLDivElement
			headerHeight.current = header.clientHeight
			const dropdownHidden = document.querySelector(`#${idDropDownLocalTemplateHidden}`) as HTMLDivElement
			const dropdownHiddenRect = dropdownHidden.getBoundingClientRect()
			dropdownHiddenSizes.current.height = dropdownHiddenRect.height
			dropdownHiddenSizes.current.width = dropdownHiddenRect.width
			// console.log(dropdownHiddenSizes)
			const cupboardShelfList = document.querySelector(`#${idCupboardShelfList}`) as HTMLDivElement
			const cupboardShelfListSizes = cupboardShelfList.getBoundingClientRect()
			cupboardShelfListRects.current.x = cupboardShelfListSizes.x
			cupboardShelfListRects.current.y = cupboardShelfListSizes.y
			cupboardShelfListRects.current.width = cupboardShelfListSizes.width
			// checked.current = true
		}, 200)
	}, [])

	useEffect(() => {
		const coordinatesHeightCorrection = dropdownHiddenSizes.current.height / 2
		const coordinatesWidthCorrection = dropdownHiddenSizes.current.width / 2
		const viewPortHeight = window.innerHeight
		let actualX = coordinates.x - coordinatesWidthCorrection
		// let actualX = coordinates.x 
		const containerEdge = cupboardShelfListRects.current.x + cupboardShelfListRects.current.width
		if (actualX + dropdownHiddenSizes.current.width > containerEdge) {
			actualX = (containerEdge - dropdownHiddenSizes.current.width)
		} else if (actualX < cupboardShelfListRects.current.x) {
			actualX = cupboardShelfListRects.current.x
		}

		// let actualY = coordinates.y - coordinatesHeightCorrection
		let actualY = coordinates.y
		if (actualY < headerHeight.current) {
			actualY = headerHeight.current
		} else if (actualY + dropdownHiddenSizes.current.height > viewPortHeight) {
			actualY = viewPortHeight - dropdownHiddenSizes.current.height
		}
		setCoordinatesChecked({ y: actualY, x: actualX })
		setChecked(true)
	}, [coordinates])


	const onCloseHandle = () => {
		dispatch(cupboardShelfListActions.setBoxSettingsModalIsOpen(false))
		setChecked(false)
		// alert('ЗАКРЫЛ')
		// dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
	}

	const onSaveTime = () => {
		dispatch(cupboardShelfListActions.setBoxSettingsModalIsOpen(false))
		setChecked(false)
		// if (!boxId) {
		// 	// console.log(value.value)
		// 	updateShelfMutation({ id: shelfId, missedTrainingValue: value.value as MissedTrainingValue })
		// 	onCloseHandle()
		// }
	}

	// const onMissedTraining
	const onMissedTrainingClick = useCallback(() => {
		// dispatch(cupboardShelfListActions.setMissedTrainingShelfId())
		dispatch(cupboardShelfListActions.setBoxSettingsModalIsOpen(false))
		dispatch(cupboardShelfListActions.setMissedTrainingModalIsOpen(true))
	}, [dispatch])

	const onDeleteBoxClick = useCallback(() => {
		// написать тесты для бекенда по удалению коробки
		// убедиться, что тесты проходят
		// ДАЛЕЕ
		// переключить состояние коробки у полки на isDeleting
		// добавить такую же логику как удаление полки
		// добавить анимацию удаления коробки
		// dispatch(cupboardShelfListActions.setMissedTrainingShelfId())
		dispatch(cupboardShelfListActions.setBoxSettingsModalIsOpen(false))
		dispatch(deleteBoxThunk())
		// dispatch(cupboardShelfListActions.setMissedTrainingModalIsOpen(true))
	}, [dispatch])

	// const dropDownLocal = <DropdownLocalList
	// 	items={[
	// 		{
	// 			content: (
	// 				<MyText
	// 					style={{ fontSize: dropDownLocalTextSize }}
	// 					text={t(missedTrainingDropdownLocalKey)} />
	// 			),
	// 			onClick: onMissedTrainingClick
	// 		},
	// 		{
	// 			content: (
	// 				<MyText
	// 					style={{ fontSize: dropDownLocalTextSize }}
	// 					variant='error'
	// 					text={t(removeBoxDropdownLocalKey)} />
	// 			),
	// 			onClick: onDeleteBoxClick
	// 		},
	// 	]}
	// />
	const dropDownItems = []
	if (isLearntBox) {
		dropDownItems.push({
			content: (
				<MyText
					style={{ fontSize: dropDownLocalTextSize }}
					text={t(missedTrainingDropdownLocalKey)}
				/>
			),
			onClick: onMissedTrainingClick
		})
	} else {
		dropDownItems.push(
			{
				content: (
					<MyText
						style={{ fontSize: dropDownLocalTextSize }}
						text={t(missedTrainingDropdownLocalKey)}
					/>
				),
				onClick: onMissedTrainingClick
			},
			{
				content: (
					<MyText
						style={{ fontSize: dropDownLocalTextSize }}
						variant='error'
						text={t(removeBoxDropdownLocalKey)}
					/>
				),
				onClick: onDeleteBoxClick
			},
		)
	}



	const dropDownLocal = <DropdownLocalList items={dropDownItems} />;
	return (
		<HDialogHeadless
			isOpen={(isOpen && checked)}
			onSubmit={() => alert('Сохраняю настройки для коробки')}
			onClose={onCloseHandle}
			panelAbsolute
			panelWithMainPadding={false}
			transparent
			styles={{ left: coordinatesChecked.x, top: coordinatesChecked.y }}
		>
			{dropDownLocal}
		</HDialogHeadless >
	)
}