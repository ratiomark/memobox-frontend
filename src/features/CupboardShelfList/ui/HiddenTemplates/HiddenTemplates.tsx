import { dropDownLocalTextSize } from '@/shared/const/fontSizes'
import { MyText } from '@/shared/ui/Typography'
import { DropdownLocalList } from '../Modals/BoxSettingsDropdownModal/DropdownLocalList'
import cls from './HiddenTemplatesStyles.module.scss'
import { useTranslation } from 'react-i18next'
import { TimeSetter } from '@/shared/ui/TimeSetter'
import { missedTrainingDropdownLocalKey, removeBoxDropdownLocalKey } from '@/shared/const/translationKeys'
import { idDropDownLocalTemplateHidden, idTimeSetterHidden } from '@/shared/const/ids'

export const HiddenTemplates = () => {
	const { t } = useTranslation()
	return (
		<>
			<div className={cls.timeSetterTemplateHidden} >
				<TimeSetter
					id={idTimeSetterHidden}
					onClose={() => null}
					onSaveTime={() => null}
				/>
			</div>

			<div id={idDropDownLocalTemplateHidden} className={cls.dropDownLocalTemplateHidden}>
				<DropdownLocalList
					items={[
						{
							content: <MyText
								style={{ fontSize: dropDownLocalTextSize }}
								text={t(missedTrainingDropdownLocalKey)} />,
						},
						{
							content: <MyText
								style={{ fontSize: dropDownLocalTextSize }}
								variant='error'
								text={t(removeBoxDropdownLocalKey)} />,
						},
					]}
				/>
			</div>
		</>)
}