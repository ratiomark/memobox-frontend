import clsx from 'clsx'
import cls from './LanguageConfirmation.module.scss'
import { HDialog } from '@/shared/ui/HDialog';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';

import { useSelector } from 'react-redux';
import { MyRadioGroup } from '@/shared/ui/MyRadioGroup';
import { capitalizeFirstLetter } from '@/shared/lib/helpers/common/capitalizeFirstLetter';
import { RadioItem } from '@/shared/ui/MyRadioGroup/MyRadioGroup';
import { Langs } from '@/shared/types/languages';

// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { useCustomTranslate } from '@/features/LanguageSwitcher';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { MyText, Heading } from '@/shared/ui/Typography';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/shared/ui/Button';
import { LogoutComponent } from '../LogoutComponent/LogoutComponent';
import { HStack } from '@/shared/ui/Stack';

interface ChangeLanguageModalProps {
	onLanguageSelected: (lang: Langs) => void
	onSubmit: () => void
}

type RadioItemLangs = RadioItem<Langs>

const LanguageNameEngInstance = new Intl.DisplayNames(['en'], { type: 'language' });

export const LanguageConfirmation = (props: ChangeLanguageModalProps) => {
	const dispatch = useAppDispatch()

	const { currentLang, setLang, t, allLangs } = useCustomTranslate('profile')
	// const initialLang = useRef(null) as MutableRefObject<string | null>
	const [initLang, setInitLang] = useState<Langs>(currentLang)


	const langItems = useMemo(() => {
		const items: RadioItemLangs[] = []
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


	const [value, setValue] = useState<RadioItemLangs>(langItems.find(item => item.value === currentLang)!)

	const onLangChange = (radioItem: RadioItemLangs) => {
		setValue(radioItem)
		setLang(radioItem.value)
		props.onLanguageSelected(radioItem.value)
	}

	// const onSubmit = () => {
	// 	// dispatch(profilePageWidgetActions.setIsChangeLanguageModalOpen(false))
	// }

	const content = <MyRadioGroup
		items={langItems}
		value={value}
		onChange={onLangChange}
	/>

	return (

		<div className={clsx(
			cls.changeNameModal,
			// className
		)}
		>
			<Heading as='h2' className={cls.title} title='Select language' />

			<div className={cls.content} >
				{content}
			</div>
			<HStack justify='center' max>

				<Button
					onClick={props.onSubmit}
					variant='filled'
				>
					Далее
				</Button>
			</HStack>
			<LogoutComponent />
			{/* <ModalButtons
				onClose={onCloseHandle}
				onSubmit={onSubmit}
				justify='end'
				gap='gap_14'
			/> */}
		</div>


	)
}