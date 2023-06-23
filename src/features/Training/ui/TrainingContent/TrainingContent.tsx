import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CardSchema } from '@/entities/Card';

import cls from './TrainingContent.module.scss';
import { Heading, MyText } from '@/shared/ui/Typography';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { MouseEvent, useState } from 'react';
import { AnswerButtons } from '../AnswerButtons/AnswerButtons';
import { ActionsButtons } from '../ActionsButtons/ActionsButtons';
import { useNavigate } from 'react-router-dom';
import { obtainRouteMain } from '@/app/providers/router/config/routeConfig/routeConfig';

export type AnswerType = 'good' | 'bad' | 'middle'

interface TrainingContentProps {
	className?: string
	data: CardSchema[]
}

export const TrainingContent = (props: TrainingContentProps) => {
	const {
		className,
		data
	} = props
	const cardsLength = data.length
	const dataObj = data.reduce((acc: { [key: string]: CardSchema }, curr, index) => {
		acc[String(index)] = curr
		return acc
	}, {})

	const [currIndex, setCurrIndex] = useState(0)
	const [answerObj, setAnswerObj] = useState<{ [key: string]: AnswerType }>({})
	const [showAnswer, setShowAnswer] = useState(false)
	const { t } = useTranslation()
	const navigate = useNavigate()
	const onShowAnswerClick = () => setShowAnswer(true)

	const onAnswerClick = (e: MouseEvent<HTMLButtonElement>, answerProp?: AnswerType) => {
		const answer = e && e.currentTarget.getAttribute('data-answer-type') as AnswerType
		const cardId = dataObj[String(currIndex)]._id
		setAnswerObj(prev => ({ ...prev, [cardId]: answer! }))
		setCurrIndex(prev => prev + 1)
		setShowAnswer(false)
	}

	const onAnswerHotKeyHandle = (answerValue: AnswerType) => {
		const cardId = dataObj[String(currIndex)]._id
		setAnswerObj(prev => ({ ...prev, [cardId]: answerValue }))
		setCurrIndex(prev => prev + 1)
		setShowAnswer(false)
	}
	const onEndTraining = () => {
		navigate(obtainRouteMain())
	}
	const onNextCardClick = () => {
		if (currIndex === cardsLength) onEndTraining()
		setCurrIndex(prev => prev + 1)
		setShowAnswer(false)
	}
	const onPreviousCardClick = () => {
		if (currIndex === 0) return
		setShowAnswer(false)
		setCurrIndex(prev => prev - 1)
	}

	console.log(answerObj)

	return (
		<div className={clsx(
			cls.TrainingContent,
			className)}
		>
			<div className={cls.top} >
				<div className='container' >
					<Heading title='training' />
					<MyText text='progress' />
				</div>
			</div>
			<div className={cls.contentWrapper} >
				<main className={clsx(cls.content, 'container')} >
					<MyText
						variant='accent'
						text={dataObj[String(currIndex)].index}
					/>
					{showAnswer && <div>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
						<p>{dataObj[String(currIndex)].answer}</p>
					</div>}
				</main>
			</div>
			<div className={cls.bottom} >

				<div className={clsx(cls.answerButtons, 'container')} >
					<AnswerButtons
						onAnswerClick={onAnswerClick}
						onAnswerHotKeyHandle={onAnswerHotKeyHandle}
						onShowAnswerClick={onShowAnswerClick}
						showAnswer={showAnswer}
					/>
				</div>

				<ActionsButtons
					onNextCardClick={onNextCardClick}
					onPreviousCardClick={onPreviousCardClick}
					onCloseTraining={onEndTraining }
				/>
			</div>


		</div >
	)
}


// <HStack max justify='center' gap='gap_8' className={cls.actions} >
// 	<Button
// 		color='trainingAction'
// 	>
// 		End
// 	</Button>
// 	<Button
// 		variant='filled'
// 		color='trainingAction'
// 		onClick={onPreviousCardClick}
// 	>
// 		Back</Button>
// 	<Button
// 		variant='filled'
// 		color='trainingAction'
// 		onClick={onNextCardClick}
// 	>
// 		Next
// 	</Button>
// 	<Button
// 		color='trainingAction'
// 	>
// 		Edit</Button>
// </HStack>