import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/shared/ui/Typography';
import cls from './BoxSettingsItem.module.scss';


export const BoxSettingsItemNewCardsBox = () => {
	const { t } = useTranslation()
	return (
		<div className={clsx(
			cls.BoxSettingsItem,
		)}
		>
			<Heading as='h5' className={cls.title} title={t('new cards')} />
		</div>)
}