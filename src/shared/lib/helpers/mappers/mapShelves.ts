// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { ShelfSchema } from '@/entities/Shelf'

export const mapShelvesToDndRepresentation = (shelves: ShelfSchema[]) => shelves.map((shelf, i) => ({ ...shelf, index: i }))
export const mapShelvesToListItems = (shelves: ShelfSchema[]) => shelves.map(shelf => ({ value: shelf.id, content: shelf.title }))