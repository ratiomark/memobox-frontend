import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { CommonShelfButtons } from '../CommonShelfButtons/CommonShelfButtons';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { memo } from 'react';

import cls from './CommonShelf.module.scss';
import { useSelector } from 'react-redux';
import { getCupboardCommonShelfCollapsed } from '../../model/selectors/getCupboardShelfList';
import { Box } from '@/entities/Box';
import { CommonShelfBoxes } from '../CommonShelfBoxes/CommonShelfBoxes';

interface ShelfProps {
	data?: {
		all: number
		train: number
		wait: number
	}
	isLoading: boolean
	// id?: string | number
	// title?: string
	// position?: number
	// collapsed: boolean
	className?: string
}

export const CommonShelf = memo((props: ShelfProps) => {
	const {
		className,
		data,
		isLoading,
		// collapsed
	} = props
	const commonShelfCollapsed = useSelector(getCupboardCommonShelfCollapsed)
	// const { isSuccess, isLoading, data } = useGetCupboardDataQuery()
	const { t } = useTranslation()

	// if (isLoading) return <p>Загрузка</p>
	// if (!isSuccess) return <p>Неудача</p>

	const boxesBlock = commonShelfCollapsed
		? <div className={cls.substitute} />
		: <CommonShelfBoxes />

	return (
		<div className={clsx(
			cls.shelf,
			[className])}
		>
			<div className={cls.topShelfPart}>
				<VStack align='start' gap='gap_8'>
					<Heading as='h3' size='s' title={t('common shelf name')} />
					<CompleteSmallDataLabels data={data} isLoading={isLoading} />
				</VStack>
				<CommonShelfButtons />
			</div>
			<div className={clsx(cls.boxesWrapper, !commonShelfCollapsed ? cls.collapsed : '')}>
				<div className={cls.inner} >
					{boxesBlock}
				</div>
			</div>
		</div>
	)
})
CommonShelf.displayName = 'CommonShelf'