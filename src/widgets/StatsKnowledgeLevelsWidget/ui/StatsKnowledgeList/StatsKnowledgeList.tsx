import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './StatsKnowledgeList.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { StatsKnowledgeLevelItem, StatsKnowledgeLevelItemType } from '../StatsKnowledgeLevelItem/StatsKnowledgeLevelItem';

const data = {
	'new': {
		cardsCount: 55,
		percentValue: 38
	},
	'beginning': {
		cardsCount: 17,
		percentValue: 24
	},
	'middle': {
		cardsCount: 33,
		percentValue: 13
	},
	'good': {
		cardsCount: 15,
		percentValue: 7
	},
	'learnt': {
		cardsCount: 24,
		percentValue: 12
	},

}
const levelsList: StatsKnowledgeLevelItemType[] = ['new', 'beginning', 'middle', 'good', 'learnt']
const isLoading = true
interface StatsKnowledgeListProps {
	className?: string
}

export const StatsKnowledgeList = (props: StatsKnowledgeListProps) => {
	const {
		className
	} = props
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}, [])

	const { t } = useTranslation()
	const listRendered = useMemo(() => {
		if (isLoading) {
			return levelsList.map(type => <StatsKnowledgeLevelItem key={type} isLoading={true} type={type} />)
		}
		return levelsList.map(type => <StatsKnowledgeLevelItem
			key={type}
			isLoading={false}
			type={type}
			cardsCount={data[type].cardsCount}
			percentValue={data[type].percentValue}
		/>)
	}, [isLoading])


	return (
		<div className={clsx(
			cls.StatsKnowledgeList,
			className)}
		>
			{listRendered}
		</div>
	)
}