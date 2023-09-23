import clsx from 'clsx'
import cls from './ChangeLanguageModal.module.scss'
import { HDialog } from '@/shared/ui/HDialog';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { profilePageWidgetActions } from '../../../model/slice/profilePageWidgetSlice';
import { Input } from '@/shared/ui/Input/Input';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { MutableRefObject, useEffect, useMemo,  useState } from 'react';
import { Langs, useCustomTranslate } from '@/features/LanguageSwitcher';
import { getIsChangeLanguageModalOpen } from '../../../model/selectors/getProfilePageModals';
import { useSelector } from 'react-redux';
import { MyRadioGroup } from '@/shared/ui/MyRadioGroup';
import { capitalizeFirstLetter } from '@/shared/lib/helpers/common/capitalizeFirstLetter';
import { RadioItem } from '@/shared/ui/MyRadioGroup/MyRadioGroup';

interface ChangeLanguageModalProps {
	className?: string;
}

const LanguageNameEngInstance = new Intl.DisplayNames(['en'], { type: 'language' });

export const ChangeLanguageModal = (props: ChangeLanguageModalProps) => {
	const {
		className,
	} = props
	const isOpen = useSelector(getIsChangeLanguageModalOpen)
	const dispatch = useAppDispatch()

	const { currentLang, setLang, t, allLangs } = useCustomTranslate('profile')
	// const initialLang = useRef(null) as MutableRefObject<string | null>
	const [initLang, setInitLang] = useState<string | null>(null)

	useEffect(() => {
		if (initLang === null && isOpen) {
			setInitLang(currentLang)
		} else if (!isOpen) {
			setInitLang(null)
		}
	}, [currentLang, isOpen, initLang])

	const onCloseHandle = () => {
		setLang(initLang as Langs)
		setValue(langItems.find(item => item.value === initLang)!)
		dispatch(profilePageWidgetActions.setIsChangeLanguageModalOpen(false))
	}

	const langItems = useMemo(() => {
		const items: RadioItem[] = []
		allLangs.forEach(lang => {
			if (lang === 'en') {
				items.push({ value: lang, content: 'English' })
			} else {
				const LanguageNameCurrentInstance = new Intl.DisplayNames([lang], { type: 'language' });
				const languageNameCurrentText = `${capitalizeFirstLetter(LanguageNameCurrentInstance.of(lang)!)}`
				const languageNameEngText = LanguageNameEngInstance.of(lang)
				const content = <MyText text={`${languageNameCurrentText} (${languageNameEngText})`} />
				items.push({ value: lang, content })
			}
		})
		return items
	}, [allLangs])


	const [value, setValue] = useState(langItems.find(item => item.value === currentLang)!)

	const onLangChange = (radioItem: RadioItem) => {
		setValue(radioItem)
		setLang(radioItem.value as Langs)
	}

	const onSubmit = () => {
		dispatch(profilePageWidgetActions.setIsChangeLanguageModalOpen(false))
	}

	const content = <MyRadioGroup
		items={langItems}
		value={value}
		onChange={onLangChange}
	/>

	return (
		<HDialog

			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmit}
		>
			<div className={clsx(
				cls.changeNameModal,
				className)}
			>
				<Heading as='h2' className={cls.title} title='Select language' />

				<div className={cls.content} >
					{content}
				</div>

				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={onSubmit}
					justify='end'
					gap='gap_14'
				/>
			</div>

		</HDialog>

	)
}