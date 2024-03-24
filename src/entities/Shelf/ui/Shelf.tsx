import clsx from 'clsx';
import cls from './Shelf.module.scss';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { ShelfSchema } from '../model/types/ShelfSchema';
import DragDotsIcon from '@/shared/assets/icons/dragDotsIcon2.svg'
import DragDotsIcon2 from '@/shared/assets/new/dragIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';
import { Collapsible } from '@/shared/ui/Animations';
import { useDragControls, Reorder } from 'framer-motion';
import { ReactNode, memo, useState } from 'react';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { StateSchema } from '@/app/providers/StoreProvider';
import { TEST_BUTTONS_IDS, TEST_ENTITY_NAMES } from '@/shared/const/testConsts';

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
			data-testid={TEST_ENTITY_NAMES.shelfItem}
			data-shelf-is-collapsed-testid={isCollapsed}
			data-shelf-index-testid={props.shelf.index}
			className={cls.shelfWrapper}
		>
			<div
				className={cls.handle}
			>
				<Icon
					Svg={DragDotsIcon2}
					type={isDragging ? 'main' : 'hint'}
					onPointerDown={(e) => controls.start(e)}
					style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
					width={10}
					height={16}
					data-testid={TEST_BUTTONS_IDS.shelf.dragButton}
					data-drop-testid={props.shelf.index === 2 ? 'target-dropzone-test-id' : undefined}
				/>
			</div>
			<div
				className={clsx(
					cls.shelf,
					[className])}
			>
				<div className={cls.shelfTitleContainer} >

					<Heading as='h3' noSelect size='xs' title={title} />
				</div>
				<div className={cls.topShelfPart}>
					<div className={cls.smallDataLabelsWrapper} >

						<CompleteSmallDataLabels
							data={data}
							isRefetchingSelectorFn={isRefetchingSelectorFn}
						/>
					</div>
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