import './styles.css';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ExampleTheme from './themes/ExampleTheme';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { EditorState, $getSelection } from 'lexical';
import { useEffect, useState, useRef } from 'react';
import { BannerNode } from './plugins/BannerPlugin';
import { CodeHighlightPlugin } from './plugins/CodeHighlightPlugin';
import { ListMaxIndentLevelPlugin } from './plugins/ListMaxIndentLevelPlugin';
import { TreeViewPlugin } from './plugins/TreeViewPlugin';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
// import { ToolbarPlugin } from './plugins/ToolbarPlugin copy';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { EquationsPlugin } from './plugins/EquationsPlugin';
import { EquationNode } from './nodes/EquationNode';
import { CommandsPlugin } from './plugins/CommandPlugin';

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
		ListItemNode,
		QuoteNode,
		BannerNode,
		CodeNode,
		CodeHighlightNode,
		TableNode,
		TableCellNode,
		TableRowNode,
		AutoLinkNode,
		LinkNode,
		EquationNode,
	]
};



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
export function Editor(props: EditorProps) {
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
				<ToolbarPlugin />
				<CommandsPlugin />
				{/* {isInputFocused && <ToolbarPlugin />} */}
				<OnChangePlugin onChange={onChange} />
				<SelectionChecker />
				<div className="editor-inner">
					<RichTextPlugin
						contentEditable={<ContentEditable className="editor-input" />}
						placeholder={<Placeholder />}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
					<CodeHighlightPlugin />
					<EquationsPlugin />
					{/* <LinkPlugin /> */}
					{/* <PlaygroundAutoLinkPlugin /> */}
					<ListPlugin />
					<ListMaxIndentLevelPlugin maxDepth={7} />
					{/* <TreeViewPlugin /> */}

				</div>
			</div>
		</LexicalComposer>
	);
}
