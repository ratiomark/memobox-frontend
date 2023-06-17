import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfDeleting.module.scss';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';

interface ShelfDeletingProps {
	id: string
	title: string
}

export const ShelfDeleting = (props: ShelfDeletingProps) => {
	const {
		id,
		title
	} = props

	const dispatch = useAppDispatch()

	useEffect(() => {
		const timer = setTimeout(() => {
			// dispatch(cupboardShelfListActions.deleteShelf(id))
		}, 9000)

		return () => clearTimeout(timer)
	}, [id, dispatch])

	const onCancelDeletion = () => dispatch(cupboardShelfListActions.updateShelf({ id, changes: { isDeleting: false } }))

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfDeleting,
		)}
		>
			<VStack align='start' gap='gap_8'>
				<Heading as='h3' size='s' title={title} className={cls.title} />
				<MyText className={cls.description} text={t('shelf in deletion proccess')} />
			</VStack>
			<Button className={cls.button} fontWeight='300' onClick={onCancelDeletion}>
				{t('cancel shelf deletion')}
			</Button>
			<div className={cls.countdown}>
				<svg className={cls.svg} viewBox="-50 -50 100 100" strokeWidth="7">
					<circle className={cls.first} r="45"></circle>
					<circle className={cls.first} r="45" pathLength="1"></circle>
				</svg>
			</div>
		</div>
	)
}