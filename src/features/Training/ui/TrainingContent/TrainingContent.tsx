import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CardSchema } from '@/entities/Card';
import cls from './TrainingContent.module.scss';
import { Heading, MyText } from '@/shared/ui/Typography';
import { MouseEvent, useEffect, useState } from 'react';
import { AnswerButtons } from '../AnswerButtons/AnswerButtons';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { useNavigate } from 'react-router-dom';
import { obtainRouteMain } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { sendTrainingAnswersThunk } from '../../model/services/sendTrainingAnswersThunk';
import { EditorCardPresenter } from '@/shared/ui/LexicalEditor';
import { trainingActions } from '../..';

export type AnswerType = 'good' | 'bad' | 'middle'

type CardAnswersObject = {
	[cardId: string]: {
		answer: AnswerType,
		card: Partial<CardSchema>
	}
}

type CardAnswersList = (Partial<CardSchema> & { answer: AnswerType })[]

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
	// const [answerObj, setAnswerObj] = useState<CardAnswersList>([])
	const [answerObj, setAnswerObj] = useState<CardAnswersObject>({})
	// const [answerObj, setAnswerObj] = useState<{ [key: string]: AnswerType }>({})
	const [showAnswer, setShowAnswer] = useState(false)
	// const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const onShowAnswerClick = () => setShowAnswer(true)

	const onEndTraining = () => {
		dispatch(sendTrainingAnswersThunk(answerObj))
		navigate(obtainRouteMain())
	}

	const checkEndOfTraining = () => {
		if (currIndex === cardsLength - 1) onEndTraining()
	}

	// useEffect(() => {
	// 	if (currIndex === cardsLength) onEndTraining()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [currIndex, answerObj])

	const onAnswerClick = (e: MouseEvent<HTMLButtonElement>) => {
		const answer = e && e.currentTarget.getAttribute('data-answer-type') as AnswerType
		const card = dataObj[String(currIndex)]
		const cardId = card.id
		// const cardExtended = { ...card, answer: answer! }
		// setAnswerObj(prev => ([...prev, cardExtended]))
		dispatch(trainingActions.addCardToAnswerObj({[cardId]: { answer: answer!, card: card } }))
		// setAnswerObj(prev => ({ ...prev, [cardId]: { answer: answer!, card: card } }))
		setShowAnswer(false)
		setCurrIndex(prev => prev + 1)
		checkEndOfTraining()
	}

	const onAnswerHotKeyHandle = (answerValue: AnswerType) => {
		const card = dataObj[String(currIndex)]
		// const { id: cardId, question, answer, ...rest } = card
		const cardId = card.id
		// const cardExtended = { ...card, answer: answerValue }
		// setAnswerObj(prev => ([...prev, cardExtended]))
		dispatch(trainingActions.addCardToAnswerObj({[cardId]: { answer:answerValue, card: card } }))
		// setAnswerObj(prev => ({ ...prev, [cardId]: { answer: answerValue, card: card } }))
		setShowAnswer(false)
		setCurrIndex(prev => prev + 1)
		checkEndOfTraining()
	}



	const onNextCardClick = () => {
		setCurrIndex(prev => prev + 1)
		setShowAnswer(false)
		checkEndOfTraining()
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
					<Heading align='center' title='training' />
					<MyText align='center' text='progress bar here' />
				</div>
			</div>
			<div className={cls.contentWrapper} >
				<main className={clsx(cls.content, 'container')}>
					<div>
						<MyText
							variant='accent'
							text={'Question'}
						/>
						<EditorCardPresenter
							isTraining={true}
							editorState={dataObj[String(currIndex)].question}
						/>
					</div>
					{showAnswer && <div>
						<MyText
							variant='accent'
							text={'Answer'}
						/>
						<EditorCardPresenter
							isTraining={true}
							editorState={dataObj[String(currIndex)].answer}
						/>
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

				<ActionButtons
					onNextCardClick={onNextCardClick}
					onPreviousCardClick={onPreviousCardClick}
					onCloseTraining={onEndTraining}
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