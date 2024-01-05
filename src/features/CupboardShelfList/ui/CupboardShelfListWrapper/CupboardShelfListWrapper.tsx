import { useSelector } from 'react-redux';
import { CupboardShelfList } from '../CupboardShelfList';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useEffect } from 'react';
import { useGetCupboardDataQuery } from '@/entities/Cupboard';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { fetchCupboardDataThunk } from '../../model/services/fetchCupboardDataThunk';
import { getIsMobile } from '@/entities/UI';
import { CupboardShelfListMobile } from '../CupboardShelfListMobile';



export const CupboardShelfListWrapper = () => {
	const { data, isLoading, isFetching } = useGetCupboardDataQuery()
	const dispatch = useAppDispatch()
	const isMobile = useSelector(getIsMobile)


	useEffect(() => {
		if (!isLoading && !isFetching && data) {
			console.log('УСТАНОВИЛ данные в стор!')
			dispatch(fetchCupboardDataThunk(data))
		}
	}, [data, isLoading, isFetching, dispatch])

	useEffect(() => {
		if (isLoading || isFetching) {
			dispatch(cupboardShelfListActions.setIsCupboardRefetching(true))
		}
	}, [isLoading, isFetching, dispatch])

	if (isMobile) {
		return <CupboardShelfListMobile />
	}

	return <CupboardShelfList />
}