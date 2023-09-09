import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { useEffect } from 'react';

type EditorStateSetterProps = {
	editorState: string
}
export function EditorStateSetterPlugin({ editorState }: EditorStateSetterProps) {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		return editor.update(() => {
			editor.setEditorState(editor.parseEditorState(editorState))
		})
	}, [editor, editorState]);

	return null
}