import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, EditorConfig, LexicalEditor, LexicalNode, NodeKey, createCommand } from 'lexical';
import { ElementNode, } from 'lexical';
// 1. Зарегистрировать ноду в редакторе
// 2. Добавить класс связанный с темой ноды
// 3. Нужно задиспатчить комманду с помощью кнопки, то есть нужно сказать что при клике создавай определенную ноду
export class BannerNode extends ElementNode {

	constructor(key?: NodeKey) {
		super(key)
	}

	static clone(node: BannerNode): BannerNode {
		return new BannerNode(node.__key)
	}

	createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
		const element = document.createElement('div')
		element.className = _config.theme.banner
		return element
	}
	static getType() {
		return 'bannerNode'
	}

}

export function $createBannerNode(): BannerNode {
	return new BannerNode()
}

export function $isBannerNode(node: LexicalNode): node is BannerNode {
	return node instanceof BannerNode
}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner')

export function BannerPlugin(): null {
	const [editor] = useLexicalComposerContext()
	// проверка, если нода не была зарегстирированна в редакторе, то нужно выбросить ошибку, ведь редактор не может работать если не рарегистриовал ноду
	if (!editor.hasNodes([BannerNode])) {
		throw new Error('BannerPlugin: BannerNode not registered on editor')
	}
	editor.registerCommand(
		INSERT_BANNER_COMMAND,
		() => {
			const selection = $getSelection()
			if ($isRangeSelection(selection)) {
				$setBlocksType(selection, $createBannerNode)
			}
			return true
		},
		COMMAND_PRIORITY_LOW
	)
	return null
}