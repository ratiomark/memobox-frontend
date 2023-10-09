import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, EditorState } from 'lexical';
import { useEffect, useState } from 'react';

type ChangePluginProps = {
	onChange: (editorState: string) => void
	// onChange: (editorState: EditorState) => void
}
export function ChangePlugin(props: ChangePluginProps) {
	const [editor] = useLexicalComposerContext();
	const [isFirstRender, setIsFirstRender] = useState(true)
	// Wrap our listener in useEffect to handle the teardown and avoid stale references.
	useEffect(() => {
		// предотвращает моментальную отработку onChange, отработает только когда действительно будет что-то введено с помощью клавиатуры
		if (isFirstRender) {
			setIsFirstRender(false)
			return
		}
		return editor.registerUpdateListener(({ editorState, prevEditorState }) => {
			// без сравнения будет выделение текста(или изменение позиции курсора) считать за изменения контента
			const state = JSON.stringify(editorState.toJSON())
			if (state !== JSON.stringify(prevEditorState.toJSON())) {
				props.onChange(state)
			}
		})
	}, [editor, props, isFirstRender]);

	return null
}