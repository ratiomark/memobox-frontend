import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import cls from './ButtonsBlockTrashEntity.module.scss'
import clsx from 'clsx';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { useTranslation } from 'react-i18next';

interface ButtonsBlockProps {
	isCollapsed: boolean
	onCollapseClick: () => void
	onRestoreClick?: () => void
	onRemoveClick?: () => void
	preserveSpaceForCollapseArrow?: boolean
	noCollapseArrow?: boolean
}

export const ButtonsBlockTrashEntity = (props: ButtonsBlockProps) => {
	const {
		isCollapsed = true,
		onCollapseClick,
		onRestoreClick = () => { alert('restore') },
		onRemoveClick = () => { alert('remove') },
		preserveSpaceForCollapseArrow = false,
		noCollapseArrow = false
	} = props
	const { t } = useTranslation('trash-page')



	return (
		<div className={cls.buttons} >
			<Button
				onClick={onRestoreClick}
			>
				{t('restore')}
			</Button>
			<Icon
				Svg={TrashIcon}
				type='cancel'
				clickable
				withFill={false}
				width={22}
				height={22}
				onClick={onRemoveClick}
				buttonSameSize={false}
				className={clsx(cls.icon, cls.removeIcon)}
			/>
			{noCollapseArrow && preserveSpaceForCollapseArrow && <div style={{ width: 32, height: 32, opacity: 0 }}></div>}
			{!noCollapseArrow && <Icon
				className={
					clsx(cls.arrow, !isCollapsed ? cls.rotateArrow : '')}
				clickable
				type='hint'
				Svg={ArrowBottomIcon}
				onClick={onCollapseClick}
			/>}

		</div>)

}