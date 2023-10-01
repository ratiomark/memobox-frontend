import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { useEffect } from 'react';

type EditorStateSetterProps = {
	editorState: string
}
export function EditorStateSetterPlugin({ editorState }: EditorStateSetterProps) {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		// тут нужен setTimeout, чтобы реакт в начале изменил все свои внутренние приколы, а стейт редактора изменился в последнюю очередь.
		setTimeout(() => {
			editor.setEditorState(editor.parseEditorState(editorState));
		}, 0);
	}, [editor, editorState]);

	return null
}