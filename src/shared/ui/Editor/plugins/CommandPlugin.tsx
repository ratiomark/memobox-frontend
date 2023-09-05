import { $createCodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection } from 'lexical';
import { useLayoutEffect } from 'react';

export function CommandsPlugin() {
	const [editor] = useLexicalComposerContext();
	useLayoutEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const { shiftKey, ctrlKey, metaKey, altKey } = event;
			if (altKey && event.key === '1') {
				console.log('alt + 1')
				editor.update(() => {
					let selection = $getSelection();
					if ($isRangeSelection(selection)) {
						if (selection.isCollapsed()) {
							$setBlocksType(selection, () => $createCodeNode());
						} else {
							const textContent = selection.getTextContent();
							const codeNode = $createCodeNode();
							selection.insertNodes([codeNode]);
							selection = $getSelection();
							if ($isRangeSelection(selection))
								selection.insertRawText(textContent);
						}
					}
				});
			}
		};

		return editor.registerRootListener(
			(
				rootElement: null | HTMLElement,
				prevRootElement: null | HTMLElement,
			) => {
				if (prevRootElement !== null) {
					prevRootElement.removeEventListener('keydown', onKeyDown);
				}
				if (rootElement !== null) {
					rootElement.addEventListener('keydown', onKeyDown);
				}
			}
		);
	}, [editor]);

	return null
}
