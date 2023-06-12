import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Shelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from '../../../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { ReactNode, useCallback } from 'react';


interface ShelfProps {
	id: string
	title: string
	completeSmallDataLabelsBlock: ReactNode
	shelfButtonsBlock: ReactNode
	index: number
	className?: string
}

export const Shelf = (props: ShelfProps) => {
	const {
		className,
		completeSmallDataLabelsBlock,
		shelfButtonsBlock,
		title,
		id,
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
				<ShelfButtons onAddNewCardClick={onAddNewCardClickHandle} shelfPosition={index ?? 11} /> */}
			</div>
		</div>
	)
}