import { BoxSchema } from '@/entities/Box'
import { rtkApi } from '@/shared/api/rtkApi'
import { CardSchemaDeleted, ShelfSchemaDeleted } from '../types/EntitySchemasDeleted'

interface TrashResponse {
	cards: CardSchemaDeleted[]
	shelves: ShelfSchemaDeleted[]
	boxes: BoxSchema[]
}

export const trashApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTrash: build.query<TrashResponse, void>({
			query: () => ({
				url: '/aggregate/trash',
				method: 'GET',
			}),
		}),

	}),
})

export const { useGetTrashQuery } = trashApi
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate

// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi