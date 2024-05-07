import './index.css';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import { lexicalEmptyEditorState } from '@/shared/const/lexical';
import { EditorStateSetterPlugin } from './plugins/EditorStateSetterPlugin/EditorStateSetterPlugin';

interface EditorProps {
	editorState: string | null
	namespace?: string
	isTraining?: boolean
}

function Editor({ isTraining }: { isTraining: boolean }) {
	return (
		<>
			<PlainTextPlugin
				contentEditable={
					<div className='editor-shell'>
						<div className={isTraining ? '' : 'editor-scroller-card-presenter'}>
							<ContentEditable className='ContentEditable__card-presenter' />
						</div>
					</div>
				}
				placeholder={null}
				ErrorBoundary={LexicalErrorBoundary}
			/>
		</>
	);
}

export const EditorCardPresenter = (props: EditorProps) => {
	const initialConfig = {
		editable: false,
		// editable: true,
		editorState: props.editorState ?? lexicalEmptyEditorState,
		namespace: props.namespace ? props.namespace : 'Playground',
		nodes: [...PlaygroundNodes],
		onError: (error: Error) => {
			throw error;
		},
		theme: PlaygroundEditorTheme,
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<EditorStateSetterPlugin editorState={props.editorState ?? lexicalEmptyEditorState} />
			<Editor isTraining={props.isTraining ?? false} />
		</LexicalComposer>
	)
}

export default EditorCardPresenter;