import { BoxSchema } from '@/entities/Box'
import { rtkApi } from '@/shared/api/rtkApi'
import { BoxSchemaDeleted, CardSchemaDeleted, ShelfSchemaDeleted } from '../types/EntitySchemasDeleted'
import { TAG_TRASH_PAGE } from '@/shared/api/const/tags'
import { ShelfSchema, ShelvesDataViewPage } from '@/entities/Shelf'

interface TrashResponse {
	cards: CardSchemaDeleted[]
	shelves: ShelfSchemaDeleted[]
	boxes: BoxSchemaDeleted[]
	entitiesCount: {
		cards: number
		shelves: number
		boxes: number
	}
	shelvesAndBoxesData: ShelfSchema[]
}

export const trashApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTrash: build.query<TrashResponse, void>({
			query: () => ({
				url: '/aggregate/trash',
				method: 'GET',
			}),
			providesTags: [TAG_TRASH_PAGE]
		}),
	}),
})

export const { useGetTrashQuery } = trashApi
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate

// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi