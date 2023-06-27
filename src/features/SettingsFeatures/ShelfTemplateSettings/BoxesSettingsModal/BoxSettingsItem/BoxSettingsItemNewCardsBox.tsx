import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/shared/ui/Typography';
import cls from './BoxSettingsItem.module.scss';

interface BoxSettingSpecialBoxProps {
	type: 'new' | 'learnt'
}

export const BoxSettingsSpecialBox = ({ type }: BoxSettingSpecialBoxProps) => {
	const { t } = useTranslation()
	return (
		<div className={clsx(
			cls.BoxSettingsItem,
		)}
		>
			<Heading as='h5' className={cls.title} title={type === 'new' ? t('new cards') : t('learnt cards')} />
		</div>)
}