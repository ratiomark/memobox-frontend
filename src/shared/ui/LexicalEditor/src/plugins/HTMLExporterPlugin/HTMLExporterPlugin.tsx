import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { useEffect } from 'react';

type EditorStateSetterProps = {

	editorState: string
}
export function HTMLExporterPlugin({ editorState }: EditorStateSetterProps) {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		editor.registerUpdateListener(({ editorState }) => {
			// The latest EditorState can be found as `editorState`.
			// To read the contents of the EditorState, use the following API:

			editorState.read(() => {
				const htmlString = $generateHtmlFromNodes(editor);
				const parser = new DOMParser();
				const dom = parser.parseFromString(htmlString, 'text/html');
				const s = dom.body.children.item(0)
				console.log('child 0', dom.body.children.item(0))
				// console.log('child 0', Array.from(dom.body.children.item(0)).length)
				console.log('child 1', dom.body.children.item(1))
				console.log('child 99', dom.body.children.item(99))
				console.log(dom.body)
			});
		});
	}, [editor]);

	return null
}