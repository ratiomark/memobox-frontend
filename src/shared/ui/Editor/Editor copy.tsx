import ExampleTheme from './themes/ExampleTheme';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { $createHeadingNode, HeadingNode, QuoteNode } from '@lexical/rich-text';
import './styles.css';
// import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
// import { CodeHighlightNode, CodeNode } from '@lexical/code';
// import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
// import { TRANSFORMERS } from '@lexical/markdown';

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef, useState } from 'react';
import { $getSelection, $isRangeSelection, EditorConfig, EditorState } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { parseEditorState } from 'lexical/LexicalUpdates';
import { BannerNode, BannerPlugin, INSERT_BANNER_COMMAND } from './plugins/BannerPlugin';

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
				{/* {isInputFocused && <ToolbarPlugin />} */}
				<OnChangePlugin onChange={onChange} />
				<SelectionChecker />
				<div className="editor-inner">
					<RichTextPlugin
						contentEditable={<ContentEditable id={id} className="editor-input" />}
						placeholder={<Placeholder />}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					{/* <TreeViewPlugin /> */}
					{/* <AutoFocusPlugin /> */}
					{/* <ShowEditorState /> */}
					{/* <CodeHighlightPlugin /> */}
					{/* <ListPlugin /> */}
					{/* <LinkPlugin /> */}
					{/* <AutoLinkPlugin /> */}
					{/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
					{/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
				</div>
			</div>
		</LexicalComposer>
	);
}
