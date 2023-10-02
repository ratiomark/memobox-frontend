import { useSelector } from 'react-redux'
import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { getIsOpenCardModal } from '../../../model/selectors/getCreateNewCardModal'
import { CardModalSkeleton } from '@/shared/ui/Skeleton'
import { useCardModalSkeleton } from '@/shared/ui/Skeleton/CardModalSkeleton/CardModalSkeleton'

const CreateNewCardModalLazy = lazy(() => import('./CreateNewCardModal'))

export const CreateNewCardModal = () => {
	const isOpen = useSelector(getIsOpenCardModal)
	const {cardModalSkeleton, editorMinHeight, mainContentMaxHeight } = useCardModalSkeleton()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (!isLoaded && isOpen) setIsLoaded(true)
	}, [isOpen, isLoaded])
	// const cardModalSkeleton = useMemo(() => <CardModalSkeleton />, [])
	return <>
		{isLoaded &&
			<Suspense fallback={cardModalSkeleton}>
				{/* <CardModalSkeleton cardModalSkeleton={cardModalSkeleton} /> */}
				<CreateNewCardModalLazy
					editorMinHeight={editorMinHeight}
					mainContentMaxHeight={mainContentMaxHeight}
					cardModalSkeleton={cardModalSkeleton} />
			</Suspense>
		}
	</>
}