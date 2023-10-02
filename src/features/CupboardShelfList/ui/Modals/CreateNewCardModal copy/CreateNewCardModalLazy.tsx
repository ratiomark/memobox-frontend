import { useSelector } from 'react-redux'
import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { getIsOpenCardModal } from '../../../model/selectors/getCreateNewCardModal'
import { CardModalSkeleton } from '@/shared/ui/Skeleton'

const CreateNewCardModalLazy = lazy(() => import('./CreateNewCardModal'))

export const CreateNewCardModal = () => {
	const isOpen = useSelector(getIsOpenCardModal)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (!isLoaded && isOpen) setIsLoaded(true)
	}, [isOpen, isLoaded])
	const cardModalSkeleton = useMemo(() => <CardModalSkeleton />, [])
	return <>
		{isLoaded &&
			<Suspense fallback={cardModalSkeleton}>
				{/* <CardModalSkeleton cardModalSkeleton={cardModalSkeleton} /> */}
				<CreateNewCardModalLazy cardModalSkeleton={cardModalSkeleton} />
			</Suspense>
		}
	</>
}