import React from 'react';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import cls from './ButtonsBlockTrashEntity.module.scss';
import clsx from 'clsx';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { useTranslation } from 'react-i18next';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';

export interface ButtonsBlockTrashEntityProps {
	isCollapsed: boolean;
	onToggleCollapse?: () => void;
	onRestore?: () => void;
	onRemove?: () => void;
	showCollapseArrow?: boolean;
	showRestoreButton?: boolean;
	showRemoveButton?: boolean;
	removeRestoreButton?: boolean; // Новый пропс для удаления кнопки "Restore"
	removeRemoveButton?: boolean; // Новый пропс для удаления кнопки "Remove"
}

export const ButtonsBlockTrashEntity: React.FC<ButtonsBlockTrashEntityProps> = ({
	isCollapsed,
	onToggleCollapse = () => alert('onToggleCollapse'),
	onRestore = () => alert('onRestore'),
	onRemove = () => alert('onRemove'),
	showCollapseArrow = true,
	showRestoreButton = true,
	showRemoveButton = true,
	removeRestoreButton = false,
	removeRemoveButton = false,
}) => {
	const { t } = useTranslation('trash-page');

	return (
		<div className={cls.buttons}>
			{!removeRestoreButton && (
				<Button
					onClick={onRestore}
					style={{ visibility: showRestoreButton ? 'visible' : 'hidden' }}
					data-testid={TEST_BUTTONS_IDS.trash.restoreButton}
				>
					{t('restore')}
				</Button>
			)}
			{!removeRemoveButton && (
				<Icon
					Svg={TrashIcon}
					type='cancel'
					clickable={showRemoveButton}
					withFill={false}
					width={22}
					height={22}
					onClick={showRemoveButton ? onRemove : () => { }}
					buttonSameSize={false}
					className={clsx(cls.icon, showRemoveButton ? cls.removeIcon : '')}
					style={{ visibility: showRemoveButton ? 'visible' : 'hidden' }}
					data-testid={TEST_BUTTONS_IDS.trash.removeButton}
				/>
			)}
			{showCollapseArrow && (
				<Icon
					className={clsx(cls.arrow, !isCollapsed ? cls.rotateArrow : '')}
					clickable={onToggleCollapse !== undefined}
					type='hint'
					Svg={ArrowBottomIcon}
					onClick={onToggleCollapse}
					data-testid={TEST_BUTTONS_IDS.trash.collapseButton}
				/>
			)}
			{(!showCollapseArrow && !removeRestoreButton && !removeRemoveButton) && (
				<div style={{ width: 32, height: 32 }} /> // Место занимается, но кнопка не показывается
			)}
		</div>
	);
};