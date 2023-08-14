import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './LanguageDataBlock.module.scss';
import { ReactNode, useEffect } from 'react';
import { Button } from '@/shared/ui/Button';
import { ProfileRowData } from '../ProfileRowData/ProfileRowData';
import { useSelector } from 'react-redux';
import {
	getUserEmail,
	getUserEmailVerified,
	getUserName
} from '@/entities/User';
import { MyText } from '@/shared/ui/Typography';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { profilePageWidgetActions } from '../..';
import { HStack } from '@/shared/ui/Stack';
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { useCustomTranslate } from '@/features/LanguageSwitcher';
import { capitalizeFirstLetter } from '@/shared/lib/helpers/common/capitalizeFirstLetter';
import i18n from '@/shared/config/i18n/i18n';
import { LangSwitcher } from '@/widgets/Sidebar/ui/LangSwitcher/LangSwitcher';

interface LanguageDataBlockProps {
	className?: string
}

const LanguageNameEngInstance = new Intl.DisplayNames(['en'], { type: 'language' });

export const LanguageDataBlock = (props: LanguageDataBlockProps) => {
	const {
		className
	} = props

	const { currentLang } = useCustomTranslate()/*  */
	const dispatch = useAppDispatch()

	let content;
	if (currentLang === 'en') {
		content = <MyText text={LanguageNameEngInstance.of(currentLang)} />
	} else {
		const LanguageNameCurrentInstance = new Intl.DisplayNames([currentLang], { type: 'language' });
		const languageNameCurrentText = `(${capitalizeFirstLetter(LanguageNameCurrentInstance.of(currentLang)!)})`
		const languageNameEngText = LanguageNameEngInstance.of(currentLang)
		content = (<HStack gap='gap_10'>
			<MyText text={languageNameEngText} />
			<MyText variant='hint' size='s' text={languageNameCurrentText} />
		</HStack>
		)
	}

	const onLanguageChangeClick = () => dispatch(profilePageWidgetActions.setIsChangeLanguageModalOpen(true))

	return (
		<>
			<div className={cls.UserDataBlock}>
				<ProfileRowData
					title='Language'
					content={content}
					buttons={<Button className={cls.button} onClick={onLanguageChangeClick}>Change</Button>}
				/>
			</div>
			{/* <LangSwitcher /> */}
		</>
	)
}