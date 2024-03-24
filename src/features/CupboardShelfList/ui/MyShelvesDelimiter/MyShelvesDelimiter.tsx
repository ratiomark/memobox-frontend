import { useTranslation } from 'react-i18next';
import { MyText } from '@/shared/ui/Typography';
import cls from './MyShelvesDelimiter.module.scss';
import DelimiterIcon from '@/shared/assets/new/shelvesDelimiterIcon.svg';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { getUserSavedDataIsDelimiterEnabled, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';

export const MyShelvesDelimiter = () => {
	const { t } = useTranslation()
	const isDelimiterEnabled = useSelector(getUserSavedDataIsDelimiterEnabled)
	if (!isDelimiterEnabled) return null
	return (
		<HStack gap='gap_8' className={cls.container} >
			<Icon
				// className={cls.icon}
				type='hint'
				width={24}
				height={24}
				withFill={false}
				Svg={DelimiterIcon}
			/>
			<MyText
				className={cls.text}
				// size='s'
				text={'Мои полки'}
			/>
		</HStack>
	)
}