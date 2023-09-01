import { dropDownLocalTextSize } from '@/shared/const/fontSizes'
import { MyText } from '@/shared/ui/Typography'
import { DropdownLocalList } from '../Modals/BoxSettingsDropdownModal/DropdownLocalList'
import cls from './HiddenTemplatesStyles.module.scss'
import { useTranslation } from 'react-i18next'

export const DropdownLocalHiddenTemplate = () => {
	const { t } = useTranslation()
	return <div id='dropDownLocalTemplateHidden'
		className={cls.dropDownLocalTemplateHidden}
	>
		<DropdownLocalList
			items={[
				{
					content: <MyText
						// className='dropdownLocalItemText'
						style={{ fontSize: dropDownLocalTextSize }}
						// className={clsBoxSettings.dropdownLocalItemText}
						text={t('settingsItems.missed training')} />,
				},
				{
					content: <MyText
						// className='dropdownLocalItemText'
						style={{ fontSize: dropDownLocalTextSize }}
						// className={clsBoxSettings.dropdownLocalItemText}
						variant='error'
						text={t('remove box')} />,
				},
			]}
		/>
	</div>
}