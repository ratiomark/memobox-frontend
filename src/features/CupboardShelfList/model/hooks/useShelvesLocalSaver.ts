import { useEffect } from 'react';
import { ShelfSchema } from '@/entities/Shelf';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
const prepareShelves = (shelves: ShelfSchema[]): ShelfSchema[] => shelves.map(shelf => ({ ...shelf, isDeleting: false }))

const useShelvesLocalSaver = ({ cupboardShelves }: { cupboardShelves: ShelfSchema[] }) => {
	useEffect(() => {
		if (cupboardShelves.length > 0) {
			localDataService.setShelves(prepareShelves(cupboardShelves))
		}
	}, [cupboardShelves])
}

export default useShelvesLocalSaver