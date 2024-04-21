// export { shelfReducer, shelfActions } from './model/slice/shelfSlice';
export type { ShelfDndRepresentation, ShelvesDataViewPage } from './model/types/ShelfSchema'
export {
	useUpdateShelfWithTagMutation,
	useUpdateShelfMutation,
	useUpdateCommonShelfMutation,
	useRemoveShelfMutation,
	updateShelfWithTag,
	rtkRemoveShelfById,
	rtkCreateNewShelf,
	rtkUpdateShelfListOrder,
	rtkRestoreShelfById,
	rtkRemoveShelfFinal,
	useGetShelvesQuery,
	rtkShelfUpdateBoxesList,
	rtkToggleShelfNotification,
} from './model/api/shelvesApi'

export { ShelfButtons } from '../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons'

// export { shelfSchema } from './model/types/shelf';
export type { ShelfSchema } from './model/types/ShelfSchema'
export type { ShelfProps } from './ui/Shelf'
export { Shelf } from './ui/Shelf'
export { ShelfSkeleton } from './ui/ShelfSkeleton'
