import ExampleTheme from './themes/ExampleTheme';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import './styles.css';
import { ListNode } from '@lexical/list';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EditorState, $getSelection } from 'lexical';
import { useEffect, useState, useRef } from 'react';
import { BannerNode } from './plugins/BannerPlugin';


function Placeholder() {
	return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig: InitialConfigType = {
	// The editor theme
	theme: ExampleTheme,
	namespace: 'MyEditor',

	// Handling of errors during update
	onError(error: Error) {
		throw error;
	},
	// Any custom nodes go here
	nodes: [
		HeadingNode,
		ListNode,
		// ListItemNode,
		QuoteNode,
		BannerNode,
		// CodeNode,
		// CodeHighlightNode,
		// TableNode,
		// TableCellNode,
		// TableRowNode,
		// AutoLinkNode,
		// LinkNode
	]
};

// function ShowEditorState() {
// 	const [editor] = useLexicalComposerContext()
// 	const state = JSON.stringify(editor.getEditorState().toJSON())
// 	const { parseEditorState } = editor
// 	useEffect(() => {
// 		console.log(state)
// 	}, [state])
// 	return null
// }
// function HeadingPlugin() {
// 	const [editor,] = useLexicalComposerContext()
// 	const onClick = (e: MouseEvent) => {
// 		console.log(JSON.stringify(editor.getEditorState().toJSON()))
// 		editor.update(() => {
// 			const selection = $getSelection()
// 			if ($isRangeSelection(selection)) {
// 				$setBlocksType(selection, () => $createHeadingNode('h1'))
// 			}
// 		})
// 	}
// 	return <button onClick={onClick}>H1</button>
// }

// function BannerPluginHere() {
// 	const [editor,] = useLexicalComposerContext()
// 	const onClick = (e: MouseEvent) => {
// 		editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined)
// 	}
// 	return <button onClick={onClick}>Banner</button>
// }


type OnChangePluginProps = {
	onChange?: (editorState: EditorState) => void
}
function OnChangePlugin(props: OnChangePluginProps) {
	// Access the editor through the LexicalComposerContext
	const [editor] = useLexicalComposerContext();
	// Wrap our listener in useEffect to handle the teardown and avoid stale references.
	useEffect(() => {
		// most listeners return a teardown function that can be called to clean them up.
		return editor.registerUpdateListener(({ editorState }) => {
			// call onChange here to pass the latest state up to the parent.
			props.onChange && props.onChange(editorState);
		});
	}, [editor, props]);

	return null
}

const useEditorIsEditable = () => {
	const [editor] = useLexicalComposerContext();
	return editor.isEditable()
}
function SelectionChecker() {
	// Access the editor through the LexicalComposerContext
	const [editor] = useLexicalComposerContext();
	// editor.isEditable
	// Wrap our listener in useEffect to handle the teardown and avoid stale references.
	useEffect(() => {
		// editor.setEditable(false)
		// most listeners return a teardown function that can be called to clean them up.
		return editor.update(() => {

			const selection = $getSelection()
			console.log(selection)
			console.log(editor.isEditable())
		})
	}, [editor]);

	return null
}

interface EditorProps {
	onChange?: (editorState: EditorState) => void
	initialState?: string
	editable?: boolean
	id?: string
}
const useEditorInputIsFocused = (id?: string) => {
	const [isInputFocused, setIsInputFocused] = useState(false)
	useEffect(() => {
		if (!id) return
		const handleFocus = () => {
			setIsInputFocused(true)
			console.log('The div is focused');
		};

		const handleBlur = () => {
			setIsInputFocused(false)
			console.log('The div has lost focus');
		};

		const divElement = document.querySelector(`#${id}`)

		if (divElement) {
			divElement.addEventListener('focus', handleFocus);
			divElement.addEventListener('blur', handleBlur);
		}

		return () => {
			if (divElement) {
				divElement.removeEventListener('focus', handleFocus);
				divElement.removeEventListener('blur', handleBlur);
			}
		};
	}, [id]);
	return isInputFocused
}

const InitialStateUpdatedPlugin = ({ initialState }: { initialState?: string }) => {
	const [editor] = useLexicalComposerContext()
	useEffect(() => {
		if (!initialState) return
		const state = editor.parseEditorState(initialState);
		editor.setEditorState(state)
	}, [initialState, editor])
	// initialState
	return null
}
export function EditorPresenter(props: EditorProps) {
	const { onChange, id, initialState, editable = true } = props
	const containerRef = useRef<HTMLDivElement>(null)
	// const isInputFocused = useEditorInputIsFocused(id)
	// const isEditable = useEditorIsEditable()
	// const selection = $getSelection()
	// console.log(selection)
	// const onChange = (editorState: EditorState) => console.log(JSON.stringify(editorState.toJSON()))
	return (
		// <LexicalComposer initialConfig={editorConfig}>
		<LexicalComposer initialConfig={{ editorState: initialState, editable, ...editorConfig }}>
			<div className="editor-container">
				{/* <BannerPlugin /> */}
				{/* <BannerPluginHere /> */}
				{/* <HeadingPlugin /> */}
				{/* {isInputFocused && <ToolbarPlugin />} */}
				<OnChangePlugin onChange={onChange} />
				<SelectionChecker />
				{/* <InitialStateUpdatedPlugin initialState={initialState} /> */}
				<div className="editor-inner">
					<RichTextPlugin
						contentEditable={<ContentEditable id={id} className="editor-input" />}
						placeholder={null}
						ErrorBoundary={LexicalErrorBoundary}
					/>
				</div>
			</div>
		</LexicalComposer>
	);
}
