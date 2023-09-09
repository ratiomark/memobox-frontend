import { getQuestionCardModal, getAnswerCardModal } from '../../../model/selectors/getCreateNewCardModal'
import { Editor, EditorPresenter } from '@/shared/ui/Editor'
import { HDialog } from '@/shared/ui/HDialog'
import { EditorV2 } from '@/shared/ui/lexical-playground/src/Editor'
import { EditorPresenterV2 } from '@/shared/ui/lexical-playground/src/EditorPresenter'
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'


export const ContentLooker = memo(() => {
	const [questionHeight, setQuestionHeight] = useState(0)
	const [answerHeight, setAnswerHeight] = useState(0)
	const questionTextCardModal = useSelector(getQuestionCardModal)
	const answerTextCardModal = useSelector(getAnswerCardModal)


	const questionEditor = <EditorPresenterV2
		// onChange={onChangeQuestion}
		editable={false}
		editorState={questionTextCardModal}
		getCurrentHeight={setQuestionHeight}
	/>
	const answerEditor = <EditorPresenterV2
		// onChange={onChangeAnswer}
		editable={false}
		editorState={answerTextCardModal}
		getCurrentHeight={setAnswerHeight}
	/>

	return (

		<div
		// className={cls.cardModal}
		>
			{questionEditor}
			{answerEditor}
		</div>
	)
})




// return (
// 	<Modal
// 		lazy
// 		isOpen={isOpen}
// 		onClose={onCloseCardModal}
// 	>
// 		<div
// 			className={cls.cardModal}
// 		>
// 			<VStack
// 				className={cls.mainContent}
// 				max
// 				align='left'
// 				gap='gap_32'
// 			>
// 				<HStack
// 					className={cls.shelvesAndBoxesWrapper}
// 					max
// 				>
// 					{shelvesAndBoxes}
// 				</HStack>
// 				<div>
// 					<MyText text={'question'} />
// 					<TextArea
// 						rows={5}
// 						value={questionTextCardModal}
// 						onChangeString={onChangeQuestion}
// 					/>
// 				</div>
// 				<div>
// 					<MyText text={'answer'} />
// 					<TextArea
// 						rows={5}
// 						value={answerTextCardModal}
// 						onChangeString={onChangeAnswer}
// 					/>
// 				</div>

// 			</VStack>
// 			<div className={cls.actions} >
// 				<Button>{t('Назад')}</Button>
// 				<Button>{t('Сохранить')}</Button>
// 			</div>
// 		</div>
// 	</Modal>
// )