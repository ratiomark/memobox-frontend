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
import { BoxesBlockSkeleton } from './BoxesBlockSkeleton';

interface BoxesBlockProps {
	shelf: ShelfSchema
}

export const BoxesBlockWrapper = (props: BoxesBlockProps) => {
	const {
		shelf,
	} = props

	if (shelf.collapsed) return <div className={cls.substitute} />
	else if (shelf.isLoading) return <BoxesBlockSkeleton />
	else return <BoxesBlock {...props} />
}