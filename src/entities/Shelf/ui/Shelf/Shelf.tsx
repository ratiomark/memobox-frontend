import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Shelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from '../ShelfButtons/ShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { ReactNode, useCallback } from 'react';


interface ShelfProps {
	// data: {
	// all: number
	// train: number
	// wait: number
	// }
	id: string
	title?: string
	completeSmallDataLabelsBlock: ReactNode
	shelfButtonsBlock: ReactNode
	position?: number
	className?: string
	// isLoading: boolean
	// onAddNewCardClick: (shelfId: string) => void
}

export const Shelf = (props: ShelfProps) => {
	const {
		className,
		// data,
		// isLoading,
		completeSmallDataLabelsBlock,
		shelfButtonsBlock,
		title,
		// position,
		id,
		// onAddNewCardClick
	} = props

	// const onAddNewCardClickHandle = useCallback(() => {
	// 	onAddNewCardClick(id)
	// }, [onAddNewCardClick, id])

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
				{/* <CompleteSmallDataLabels
						isLoading={isLoading}
						data={data}
					/>
				</VStack>
				<ShelfButtons onAddNewCardClick={onAddNewCardClickHandle} shelfPosition={position ?? 11} /> */}
			</div>
		</div>
	)
}