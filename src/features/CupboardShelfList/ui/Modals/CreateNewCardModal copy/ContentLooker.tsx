import { getQuestionCardModal, getAnswerCardModal } from '../../../model/selectors/getCreateNewCardModal'
import { Editor, EditorPresenter } from '@/shared/ui/Editor'
import { HDialog } from '@/shared/ui/HDialog'
import { memo } from 'react'
import { useSelector } from 'react-redux'


export const ContentLooker = memo(() => {

	const questionTextCardModal = useSelector(getQuestionCardModal)
	const answerTextCardModal = useSelector(getAnswerCardModal)


	const questionEditor = <EditorPresenter
		// onChange={onChangeQuestion}
		editable={false}
		initialState={questionTextCardModal}
	/>
	const answerEditor = <EditorPresenter
		// onChange={onChangeAnswer}
		editable={false}
		initialState={answerTextCardModal}
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