import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfListWrapper.module.scss';
import { useSelector } from 'react-redux';
import { CupboardShelfList } from '../CupboardShelfList';
import { getCupboardIsLoading } from '../../model/selectors/getCupboardShelfList';
import { ShelfSkeleton } from '@/entities/Shelf';
import { CommonShelf } from '../CommonShelf/CommonShelf';
import { getUserShelfNamesList } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchCupboardData } from '../../model/services/fetchCupboardData';
import { useGetCupboardDataQuery } from '@/entities/Cupboard';
import { cupboardShelfListActions } from '../..';

interface CupboardShelfListWrapperProps {
	className?: string
}

export const CupboardShelfListWrapper = (props: CupboardShelfListWrapperProps) => {
	const {
		className
	} = props
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const shelfNamesList = useSelector(getUserShelfNamesList)
	const { data, isLoading, error } = useGetCupboardDataQuery()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isLoading) {
			dispatch(cupboardShelfListActions.setFetchedCupboardDataIsLoading(true))
		} else if (data) {
			dispatch(cupboardShelfListActions.setFetchedCupboardData(data))
		} else if (error) {
			dispatch(cupboardShelfListActions.setFetchedCupboardDataError(error))
		}

	}, [dispatch, data, isLoading, error])
	// useEffect(() => {
	// 	dispatch(fetchCupboardData())
	// }, [dispatch])

	if (cupboardIsLoading) {
		return <>
			<CommonShelf data={undefined} isLoading={cupboardIsLoading} />
			{shelfNamesList!.map(item => <ShelfSkeleton
				isCollapsed={item.isCollapsed}
				key={item.title}
				title={item.title}
			/>
			)}
		</>
	}

	return <CupboardShelfList />
}