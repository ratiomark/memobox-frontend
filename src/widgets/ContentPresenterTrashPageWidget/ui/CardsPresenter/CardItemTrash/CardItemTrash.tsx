import clsx from 'clsx'
import cls from './CardItemTrash.module.scss'
import { useTranslation } from 'react-i18next';
import { CardSchemaDeleted } from '@/entities/Trash';
import { Icon } from '@/shared/ui/Icon';
import { MyText } from '@/shared/ui/Typography';
import { motion } from 'framer-motion';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'

interface CardItemTrashProps {
	className?: string;
	card: CardSchemaDeleted
}

export const CardItemTrash = (props: CardItemTrashProps) => {
	const {
		className,
		card,
	} = props
	const isMultiSelectActive = false
	const { t } = useTranslation()
	const onDeleteCard = () => { }

	return (
		<div className={clsx(cls.CardItemTrash)} >
			<motion.li
				className={clsx(cls.item)}
			// onClick={isMultiSelectActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
			>
				{/* <CheckBox className={cls.checkBox} isChecked={isCardSelected} onClick={onSelectCardHandle} /> */}

				<div
				// className={cls.CardListItem}
				// onClick={isMultiSelectActive ? onSelectCardHandle : onOpenEditCardModalHandle}
				>
					<div className={cls.content} >

						<div className={cls.mainContentWrapper} >
							<MyText text={card.question} className={cls.mainContent} />
							<MyText text={card.answer} className={cls.mainContent} />
						</div>
					</div>


					{isMultiSelectActive
						? <div className={cls.icon} />
						: (
							<Icon
								Svg={TrashIcon}
								type='cancel'
								clickable
								withFill={false}
								width={22}
								height={22}
								onClick={onDeleteCard}
								buttonSameSize={false}
								className={clsx(cls.icon, cls.removeIcon)} />
						)}
					{/* <Button disabled={isMultiSelectActive} onClick={onDeleteCard}>del</Button> */}
				</div>

				{/* </div> */}
			</motion.li>
		</div>
	)
}