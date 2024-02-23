import cls from './BoxesSettingsContent.module.scss';
import { useTranslation } from 'react-i18next';
import { BoxesSettingsList } from '../BoxesSettingsList/BoxesSettingsList';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { BoxesRenderedProps } from '../BoxesRendered/BoxesRendered';


export const BoxesSettingsContent = (props: BoxesRenderedProps) => {

	const { t } = useTranslation()

	return (
		<VStack
			align='center'
			max
			gap='gap_12'
			className={cls.mainWrapper}
		>
			<Heading
				className={cls.title}
				as='h3'
				title={t('Нажмите + чтобы ВОССТАНОВИТЬ коробку на указанную позицию')}
			/>
			<BoxesSettingsList {...props} />
		</VStack>
	)
}