import { BoxSchema } from '@/entities/Box'
import { CardSchema, CardSchemaExtended } from '@/entities/Card'
import { ShelfSchema } from '@/entities/Shelf'
import { rtkApi } from '@/shared/api/rtkApi'

interface CardSchemaDeleted extends CardSchemaExtended {
	isDeleted: true
}
interface ShelfSchemaDeleted extends ShelfSchema {
	isDeleted: true
}

interface TrashResponse {
	cards: CardSchemaDeleted[]
	shelves: ShelfSchemaDeleted[]
	boxes: BoxSchema[]
}

export const trashApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTrash: build.query<TrashResponse, void>({
			query: () => ({
				url: '/trash',
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