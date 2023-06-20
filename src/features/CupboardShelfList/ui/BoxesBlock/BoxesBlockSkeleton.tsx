import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesBlock.module.scss';
import { ShelfSchema } from '@/entities/Shelf';
import { useCallback, useMemo } from 'react';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { Box } from '@/entities/Box';
import { BoxesBlock } from './BoxesBlock';
import { Skeleton } from '@/shared/ui/Skeleton';


export const BoxesBlockSkeleton = () => {

	return (
		<div className={cls.BoxesBlock}

		>
			<Skeleton width={150} height={137}></Skeleton>
			<Skeleton width={150} height={137}></Skeleton>
			<Skeleton width={150} height={137}></Skeleton>
			<Skeleton width={150} height={137}></Skeleton>
			<Skeleton width={150} height={137}></Skeleton>
		</div>
	)
}