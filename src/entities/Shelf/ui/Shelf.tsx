import clsx from 'clsx';
import cls from './Shelf.module.scss';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { ShelfSchema } from '../model/types/ShelfSchema';
import DragDotsIcon from '@/shared/assets/icons/dragDotsIcon2.svg'
import { Icon } from '@/shared/ui/Icon';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';
import { Collapsible } from '@/shared/ui/Animations';
import { useDragControls, Reorder } from 'framer-motion';
import { ReactNode, memo, useState } from 'react';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { StateSchema } from '@/app/providers/StoreProvider';

export interface ShelfProps {
	shelf: ShelfSchema
	completeSmallDataLabelsBlock?: ReactNode
	shelfButtonsBlock: ReactNode
	boxesBlock?: ReactNode
	className?: string
	isFirstRender: boolean
	isRefetchingSelectorFn: (state: StateSchema) => boolean
}

export const Shelf = memo((props: ShelfProps) => {
	const {
		className,
		completeSmallDataLabelsBlock: completeSmallDataLabelsBlockOriginal,
		shelfButtonsBlock,
		boxesBlock,
		isFirstRender,
		isRefetchingSelectorFn,
		shelf: {
			title,
			isCollapsed,
			data,
		}
	} = props

	const [isDragging, setIsDragging] = useState(false)
	const controls = useDragControls()

	const handleDragEnd = () => {
		setIsDragging(false);
		document.body.classList.remove('dragging');
	}

	const handleDragStart = () => {
		setIsDragging(true);
		document.body.classList.add('dragging');
	}

	return (
		<Reorder.Item
			value={props.shelf}
			// layout
			dragListener={false}
			dragControls={controls}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			// drag
			// transition={{ type: 'spring', stiffness: isDragging ? 40 : 2000 }}
			// transition={{ type: 'spring', stiffness: isDragging ? 100 : 0, velocity: 0, restSpeed: 0 }}
			// dragConstraints={{ left: 30, right: 30 }}
			// transition={{ duration: isCollapsingNow ? 0 : 0.5 }}
			// transition={{ duration: isCollapsing ? 0 : 0.5 }}
			// transition={isDragging ? { type: 'spring', duration: 1 } : { ease: 'linear', duration: 0.1 }}
			// transition={{ type: 'spring', stiffness: 900 }}
			className={cls.shelfWrapper}
		>
			<div className={cls.handle} >
				<Icon
					Svg={DragDotsIcon}
					type={isDragging ? 'main' : 'hint'}
					onPointerDown={(e) => controls.start(e)}
					style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
					width={25}
					height={25}
				/>
			</div>
			<div
				className={clsx(
					cls.shelf,
					[className])}
			>
				<div className={cls.topShelfPart}>
					<VStack align='start' gap='gap_8'>
						<Heading as='h3' noSelect size='s' title={title} />
						<CompleteSmallDataLabels
							data={data}
							isRefetchingSelectorFn={isRefetchingSelectorFn}
						/>
						{/* {completeSmallDataLabels} */}
						{/* {completeSmallDataLabelsBlock} */}
					</VStack>
					{shelfButtonsBlock}
				</div>
				<Collapsible
					isOpen={!isCollapsed}
					// withOpacity
					// initial={false}
					initial={isFirstRender}
					// opacityDelay={3}
					// animationOpacityDuration={2}
					animationDuration={DURATION_SHELF_COLLAPSING_SEC}
				// animationDuration={DURATION_SHELF_COLLAPSING_SEC}
				>
					{boxesBlock}
				</Collapsible>
			</div>
		</Reorder.Item>
	)
})