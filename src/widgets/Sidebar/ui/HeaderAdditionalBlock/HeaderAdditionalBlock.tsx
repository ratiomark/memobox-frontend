import clsx from 'clsx'
import cls from './HeaderAdditionalBlock.module.scss'
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { MyText } from '@/shared/ui/Typography';
import { useMemo, useState } from 'react';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';

interface HeaderAdditionalBlockProps {
	className?: string;
}

export const HeaderAdditionalBlock = (props: HeaderAdditionalBlockProps) => {
	const {
		className,
	} = props
	const [isAdditionalOpen, setIsAdditionalOpen] = useState(false)

	const { t } = useTranslation('header')
	const onProfileClick = () => { }
	const onHelpClick = () => { }
	const onWriteToUsClick = () => { }
	const onLogoutClick = () => { }
	const toggleIsAdditionalOpen = () => setIsAdditionalOpen(prev => !prev)

	const additionalItems: DropdownItem[] = useMemo(() => {
		return [
			{
				content: t('profile'),
				onClick: onProfileClick
			},
			{
				content: t('help'),
				onClick: onHelpClick
			},
			{
				content: t('write to us'),
				onClick: onWriteToUsClick
			},
			{
				content: t('log out'),
				onClick: onLogoutClick
			},

		]
	}, [t, onProfileClick, onHelpClick, onWriteToUsClick, onLogoutClick])

	// return (
	// 	<Dropdown
	// 		items={additionalItems}
	// 		trigger={
	// 			<Button
	// 				fontWeight='300'
	// 			// className={cls.button}
	// 			>
	// 				{t('settingsItems.settings')}
	// 			</Button>
	// 		}
	// 	/>
	// )
	return (
		<div className={clsx(cls.HeaderAdditionalBlock, [className])} >
			<Button>Подписка</Button>
			<Dropdown
				listDirection='bottom_left'
				items={additionalItems}
				trigger={
					<div
						className={cls.dropDownTrigger}
					// onClick={toggleIsAdditionalOpen}
					>
						<MyText variant='header' text={t('additional')} />
						<Icon
							className={
								clsx(cls.arrow, !isAdditionalOpen ? cls.rotateArrow : '')}
							type='hint'
							Svg={ArrowBottomIcon}
						/>

					</div>
				}
			/>
		</div>
	)
}