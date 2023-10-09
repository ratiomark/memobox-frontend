import { CardMainData } from '../types/CardMainData';
import { CardSchemaExtended } from '../types/CardSchema';

export const getCardMainData = (card: CardSchemaExtended): CardMainData => ({
	shelfId: card.shelfId,
	boxId: card.boxId,
	cardId: card.id,
})