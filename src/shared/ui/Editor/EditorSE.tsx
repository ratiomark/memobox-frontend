// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './Editor.module.scss';

// import { $getRoot, $getSelection, EditorState } from 'lexical';
// import { useEffect } from 'react';

// import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
// import { ContentEditable } from '@lexical/react/LexicalContentEditable';
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

// const theme = {
// 	// Theme styling goes here
// 	// ...
// }

// // Lexical React plugins are React components, which makes them
// // highly composable. Furthermore, you can lazy load plugins if
// // desired, so you don't pay the cost for plugins until you
// // actually use them.
// function MyCustomAutoFocusPlugin({ autoFocus }: { autoFocus: boolean }) {
// 	const [editor] = useLexicalComposerContext();

// 	useEffect(() => {
// 		if (autoFocus) {
// 			editor.focus();
// 		}
// 		// Focus the editor when the effect fires!
// 	}, [editor, autoFocus]);

// 	return null;
// }

// // Catch any errors that occur during Lexical updates and log them
// // or throw them as needed. If you don't throw them, Lexical will
// // try to recover gracefully without losing user data.
// function onError(error: Error) {
// 	console.error(error);
// }
// interface EditorProps {
// 	autoFocus?: boolean
// 	onChange?: (editorState: EditorState) => void
// }
// export function Editor(props: EditorProps) {
// 	const { autoFocus = false, onChange } = props
// 	const initialConfig = {
// 		namespace: 'MyEditor',
// 		theme,
// 		onError,
// 	};

// 	return (
// 		<LexicalComposer initialConfig={initialConfig}>
// 			<RichTextPlugin
// 				contentEditable={<ContentEditable />}
// 				placeholder={<div>Enter some text...</div>}
// 				ErrorBoundary={LexicalErrorBoundary}
// 			/>
// 			<HistoryPlugin />
// 			<OnChangePlugin onChange={onChange}/>
// 			{/* {autoFocus ? <MyCustomAutoFocusPlugin /> : null} */}
// 			<MyCustomAutoFocusPlugin autoFocus={autoFocus} />
// 		</LexicalComposer>
// 	);
// }