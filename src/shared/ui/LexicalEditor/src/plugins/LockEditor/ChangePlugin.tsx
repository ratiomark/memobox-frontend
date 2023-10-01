import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, EditorState } from 'lexical';
import { useEffect } from 'react';

type ChangePluginProps = {
	editable: boolean
}
export function LockEditorPlugin(props: ChangePluginProps) {
	// Access the editor through the LexicalComposerContext
	const [editor] = useLexicalComposerContext();
	// Wrap our listener in useEffect to handle the teardown and avoid stale references.
	useEffect(() => {
		// most listeners return a teardown function that can be called to clean them up.
		// return editor.update(() => {
		// 	const q = $getRoot()
		// 	console.log('---------------  ',q)
		// 	editor.setEditable(props.editable)
		// })
		return editor.setEditable(props.editable)

	}, [editor, props]);

	return null
}