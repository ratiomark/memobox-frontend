import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './CommonShelfButtons.module.scss';




export const CommonShelfButtonsSkeleton = () => {
	return (
		<div className={cls.ShelfButtons}>
			<Skeleton width={76} height={35} borderRadius='4px' />
			<Skeleton width={166} height={35} borderRadius='4px' />
			<Skeleton width={32} height={32} borderRadius='999px' />
		</div>
	)
}
// import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
// import { Button } from '@/shared/ui/Button';
// import { Icon } from '@/shared/ui/Icon';
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './ShelfButtons.module.scss';
// import { useEffect, useState } from 'react';
// import { useHotkeys } from 'react-hotkeys-hook';

// interface ShelfButtonsProps {
// 	className?: string
// }

// // function trainHotKey(event: KeyboardEvent) {
// // 	if (event.code === 'Digit1' && event.code === 'KeyN')
// // }

// export const ShelfButtonsSkeleton = (props: ShelfButtonsProps) => {
// 	const {
// 		className,
// 	} = props

// 	const { t } = useTranslation()

// 	return (
// 		<div className={clsx(
// 			cls.ShelfButtons,
// 			[className])}
// 		>
// 			{/* <p>{click}</p> */}
// 			{/* <p>{train}</p> */}
// 			<Button className={cls.button}>
// 				{t('Add card with hot key')}
// 			</Button>
// 			<Button className={cls.button}>
// 				{t('settings')}
// 			</Button>
// 			<Button className={cls.button}>
// 				{t('view')}
// 			</Button>
// 			<Button
// 				className={cls.button}
// 				variant='filled'
// 				data-button-type='shelf-train'
// 			>
// 				{t('train')}
// 			</Button>
// 			<Icon
// 				clickable
// 				type='hint'
// 				Svg={ArrowBottomIcon}
// 				onClick={() => { null }}
// 			/>
// 		</div>
// 	)
// }