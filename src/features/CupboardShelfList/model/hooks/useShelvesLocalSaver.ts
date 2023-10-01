import { useDebounce } from '@/shared/lib/helpers/hooks/useDebounce';
import { callbackMainDelay } from '@/shared/const/callbackDelays';
import { useCallback, useEffect } from 'react';
import { ShelfSchema } from '@/entities/Shelf';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
const prepareShelves = (shelves: ShelfSchema[]): ShelfSchema[] => shelves.map(shelf=>({...shelf, isDeleting: false}))

const useShelvesLocalSaver = ({ cupboardShelves }: { cupboardShelves: ShelfSchema[] }) => {
	useEffect(() => {
		if (cupboardShelves.length > 0) {
			localDataService.setShelves(prepareShelves(cupboardShelves))
		}
	}, [cupboardShelves])
}

export default useShelvesLocalSaver
// export const useShelvesLocalSaver = ({ cupboardShelves }: { cupboardShelves: ShelfSchema[] }) => {


// 	const sendShelvesOrderCallback = useCallback(() => {
// 		// console.log('#######################')
// 		if (cupboardShelves.length > 0) {
// 			localDataService.setShelves(cupboardShelves)
// 			console.log('SAVE LOCAL DATA')
// 		}

// 	}, [cupboardShelves])

// 	const debouncedUpdate = useDebounce(sendShelvesOrderCallback, callbackMainDelay);

// 	useEffect(() => {
// 		// if (cupboardShelves.length) {
		
// 		debouncedUpdate()
// 		// }
// 	}, [cupboardShelves, debouncedUpdate])

// 	// useEffect(() => {
// 	// 	if (isShelvesDndRepresentationEqual(shelvesIdsAndIndexesInitial, shelvesIdsAndIndexesCurrent)) return
// 	// 	debouncedUpdate();
// 	// }, [debouncedUpdate, shelvesIdsAndIndexesCurrent, shelvesIdsAndIndexesInitial]);


// 	useEffect(() => {
// 		return () => {
// 			// if (!cupboardShelves.length) return
// 			console.log('РАЗМОНТИРОВАЛ ')
// 			debouncedUpdate()
// 		}
// 	}, [])


// 	useEffect(() => {
// 		window.addEventListener('beforeunload', sendShelvesOrderCallback);

// 		return () => {
// 			window.removeEventListener('beforeunload', sendShelvesOrderCallback);
// 		};
// 	}, [sendShelvesOrderCallback]);

// 	// return null
// }