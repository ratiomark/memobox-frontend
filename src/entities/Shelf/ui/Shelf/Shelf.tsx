import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Shelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from '../../../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { ReactNode, memo, useCallback, useState } from 'react';
import { ShelfSchema } from '../../model/types/ShelfSchema';


export interface ShelfProps {
	shelf: ShelfSchema
	completeSmallDataLabelsBlock: ReactNode
	shelfButtonsBlock: ReactNode
	boxesBlock?: ReactNode
	className?: string
}

export const Shelf = memo((props: ShelfProps) => {
	const {
		className,
		completeSmallDataLabelsBlock,
		shelfButtonsBlock,
		boxesBlock,
		shelf: {
			title,
			// id,
			isCollapsed,
			// index,
		}
	} = props

	// const [shelfCollapsed, setShelfCollapsed] = useState(collapsed)

	return (
		<div className={clsx(
			cls.shelf,
			[className])}
		>
			<div className={cls.topShelfPart}>
				<VStack align='start' gap='gap_8'>
					<Heading as='h3' size='s' title={title} />
					{completeSmallDataLabelsBlock}
				</VStack>
				{shelfButtonsBlock}
			</div>
			<div className={clsx(cls.boxesWrapper, isCollapsed ? cls.collapsed : cls.notCollapsed)}>
				{/* <div className={clsx(cls.boxesWrapper, !isCollapsed ? cls.collapsed : '')}> */}
				<div className={cls.inner} >

					{boxesBlock}
				</div>
			</div>
		</div>
	)
})
Shelf.displayName = 'Shelf'