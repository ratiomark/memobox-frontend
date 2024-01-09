import { useSelector } from 'react-redux';
import { getBoxIsDeleting } from '../../model/selectors/getDeletionProcess';
import { BoxDeleting } from '../BoxDeleting/BoxDeleting';
import { Box, BoxPropsBase } from '@/entities/Box';

export const BoxItem = (props: BoxPropsBase) => {
	const {
		boxItem: {
			id: boxId,
			index,
		},
		shelfId
	} = props
	const isBoxDeleting = useSelector(getBoxIsDeleting(shelfId, boxId))

	if (isBoxDeleting) {
		return <BoxDeleting isBoxDeleting={isBoxDeleting} index={index} boxId={boxId} />
	}

	return <Box {...props} />
}