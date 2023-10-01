import { useSelector } from 'react-redux'
import { Suspense, lazy, useEffect, useState } from 'react'
import { getIsOpenCardModal } from '../../../model/selectors/getCreateNewCardModal'

const CreateNewCardModalLazy = lazy(() => import('./CreateNewCardModal'))

export const CreateNewCardModal = () => {
	const isOpen = useSelector(getIsOpenCardModal)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (!isLoaded && isOpen) setIsLoaded(true)
	}, [isOpen, isLoaded])

	return <>
		{isLoaded &&
			<Suspense fallback={null}>
				<CreateNewCardModalLazy />
			</Suspense>
		}
	</>
}