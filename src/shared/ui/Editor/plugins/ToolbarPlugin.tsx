import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ChangeEvent, Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	REDO_COMMAND,
	UNDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	FORMAT_TEXT_COMMAND,
	FORMAT_ELEMENT_COMMAND,
	$getSelection,
	$isRangeSelection,
	$createParagraphNode,
	$getNodeByKey,
	LexicalEditor,
	RangeSelection,
	NodeSelection,
	GridSelection,
	$isElementNode,
	$isRootOrShadowRoot,
	$isTextNode,
	COMMAND_PRIORITY_CRITICAL,
	COMMAND_PRIORITY_NORMAL,
	KEY_MODIFIER_COMMAND,
	DEPRECATED_$isGridSelection
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
	$isParentElementRTL,
	$wrapNodes,
	$isAtNodeEnd,
	$getSelectionStyleValueForProperty,
	$patchStyleText,
	$setBlocksType
} from '@lexical/selection';
import { $findMatchingParent, $getNearestBlockElementAncestorOrThrow, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
	INSERT_ORDERED_LIST_COMMAND,
	INSERT_UNORDERED_LIST_COMMAND,
	REMOVE_LIST_COMMAND,
	$isListNode,
	ListNode
} from '@lexical/list';
import { createPortal } from 'react-dom';
import {
	$createHeadingNode,
	$createQuoteNode,
	$isHeadingNode,
	$isQuoteNode
} from '@lexical/rich-text';
import {
	$createCodeNode,
	$isCodeNode,
	getDefaultCodeLanguage,
	getCodeLanguages,
	CODE_LANGUAGE_MAP
} from '@lexical/code';
import { InsertEquationDialog } from './EquationsPlugin';
import { useEditorMiniModal } from '../hooks/useModal';
import { KatexEquationAlterer } from '../ui/katex/KatexEquationAlterer';
import { $isTableNode } from '@lexical/table';
import { HStack } from '../../Stack';

const LowPriority = 1;

const supportedBlockTypes = new Set([
	'paragraph',
	'quote',
	'code',
	'h1',
	'h2',
	// 'ul',
	// 'ol'
]);

const blockTypeToBlockName = {
	code: 'Code Block',
	h1: 'Large Heading',
	h2: 'Small Heading',
	h3: 'Heading',
	h4: 'Heading',
	h5: 'Heading',
	// ol: 'Numbered List',
	paragraph: 'Normal',
	quote: 'Quote',
	// ul: 'Bulleted List'
};

function Divider() {
	return <div className="divider" />;
}
// const a = document.querySelector('q') as HTMLDivElement
// const rect = a.getBoundingClientRect()
function positionEditorElement(editor: HTMLDivElement, rect: DOMRect | null) {
	if (rect === null) {
		editor.style.opacity = '0';
		editor.style.top = '-1000px';
		editor.style.left = '-1000px';
	} else {
		editor.style.opacity = '1';
		editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
		editor.style.left = `${rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2}px`;
	}
}
interface FloatingLinkEditorProps {
	editor: LexicalEditor
}
// function FloatingLinkEditor({ editor }: FloatingLinkEditorProps) {
// 	const editorRef = useRef(null);
// 	const inputRef = useRef<HTMLInputElement>(null);
// 	const mouseDownRef = useRef(false);
// 	const [linkUrl, setLinkUrl] = useState('');
// 	const [isEditMode, setEditMode] = useState(false);
// 	const [lastSelection, setLastSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);

// 	const updateLinkEditor = useCallback(() => {
// 		const selection = $getSelection();
// 		if ($isRangeSelection(selection)) {
// 			const node = getSelectedNode(selection);
// 			const parent = node.getParent();
// 			if ($isLinkNode(parent)) {
// 				setLinkUrl(parent.getURL());
// 			} else if ($isLinkNode(node)) {
// 				setLinkUrl(node.getURL());
// 			} else {
// 				setLinkUrl('');
// 			}
// 		}
// 		const editorElem = editorRef.current;
// 		const nativeSelection = window.getSelection();
// 		const activeElement = document.activeElement;

// 		if (editorElem === null) {
// 			return;
// 		}

// 		const rootElement = editor.getRootElement();
// 		if (
// 			selection !== null &&
// 			nativeSelection &&
// 			!nativeSelection.isCollapsed &&
// 			rootElement !== null &&
// 			rootElement.contains(nativeSelection.anchorNode)
// 		) {
// 			const domRange = nativeSelection.getRangeAt(0);
// 			let rect;
// 			if (nativeSelection.anchorNode === rootElement) {
// 				let inner: Element = rootElement;
// 				while (inner.firstElementChild != null) {
// 					inner = inner.firstElementChild;
// 				}
// 				rect = inner.getBoundingClientRect();
// 			} else {
// 				rect = domRange.getBoundingClientRect();
// 			}

// 			if (!mouseDownRef.current) {
// 				positionEditorElement(editorElem, rect);
// 			}
// 			setLastSelection(selection);
// 		} else if (!activeElement || activeElement.className !== 'link-input') {
// 			positionEditorElement(editorElem, null);
// 			setLastSelection(null);
// 			setEditMode(false);
// 			setLinkUrl('');
// 		}

// 		return true;
// 	}, [editor]);

// 	useEffect(() => {
// 		return mergeRegister(
// 			editor.registerUpdateListener(({ editorState }) => {
// 				editorState.read(() => {
// 					updateLinkEditor();
// 				});
// 			}),

// 			editor.registerCommand(
// 				SELECTION_CHANGE_COMMAND,
// 				() => {
// 					updateLinkEditor();
// 					return true;
// 				},
// 				LowPriority
// 			)
// 		);
// 	}, [editor, updateLinkEditor]);

// 	useEffect(() => {
// 		editor.getEditorState().read(() => {
// 			updateLinkEditor();
// 		});
// 	}, [editor, updateLinkEditor]);

// 	useEffect(() => {
// 		if (isEditMode && inputRef.current) {
// 			inputRef.current.focus();
// 		}
// 	}, [isEditMode]);

// 	return (
// 		<div ref={editorRef} className="link-editor">
// 			{isEditMode ? (
// 				<input
// 					ref={inputRef}
// 					className="link-input"
// 					value={linkUrl}
// 					onChange={(event) => {
// 						setLinkUrl(event.target.value);
// 					}}
// 					onKeyDown={(event) => {
// 						if (event.key === 'Enter') {
// 							event.preventDefault();
// 							if (lastSelection !== null) {
// 								if (linkUrl !== '') {
// 									editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
// 								}
// 								setEditMode(false);
// 							}
// 						} else if (event.key === 'Escape') {
// 							event.preventDefault();
// 							setEditMode(false);
// 						}
// 					}}
// 				/>
// 			) : (
// 				<>
// 					<div className="link-input">
// 						<a href={linkUrl} target="_blank" rel="noopener noreferrer">
// 							{linkUrl}
// 						</a>
// 						<div
// 							className="link-edit"
// 							role="button"
// 							tabIndex={0}
// 							onMouseDown={(event) => event.preventDefault()}
// 							onClick={() => {
// 								setEditMode(true);
// 							}}
// 						/>
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// }
interface SelectProps {
	className?: string
	options: string[]
	value: string
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void
	// onChange: (value: string) => void
}
// const o = document.createElement('option')
function Select({ onChange, className, options, value }: SelectProps) {
	return (
		<select className={className} onChange={onChange} value={value}>
			<option hidden={true} value="" />
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

function getSelectedNode(selection: RangeSelection) {
	const anchor = selection.anchor;
	const focus = selection.focus;
	const anchorNode = selection.anchor.getNode();
	const focusNode = selection.focus.getNode();
	if (anchorNode === focusNode) {
		return anchorNode;
	}
	const isBackward = selection.isBackward();
	if (isBackward) {
		return $isAtNodeEnd(focus) ? anchorNode : focusNode;
	} else {
		return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
	}
}

interface BlockOptionsDropdownListProps {
	editor: LexicalEditor
	blockType: string
	toolbarRef: RefObject<HTMLDivElement>
	setShowBlockOptionsDropDown: Dispatch<SetStateAction<boolean>>
}

interface MainBlocksProps {
	editor: LexicalEditor
	blockType: string
}

const MainBlocks = ({ editor, blockType }: MainBlocksProps) => {

	const formatParagraph = () => {
		editor.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				$setBlocksType(selection, () => $createParagraphNode());
			}
		})
	}

	const formatBulletList = () => {
		if (blockType !== 'ul') {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	const formatNumberedList = () => {
		if (blockType !== 'ol') {
			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	const formatCode = () => {
		if (blockType !== 'code') {
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

	return (
		// <div className="dropdown" ref={dropDownRef}>
		<HStack >
			<button className="toolbar-item spaced " onClick={formatParagraph}>
				<span className="icon paragraph" />
				{/* <span className="text">Normal</span> */}
				{blockType === 'paragraph' && <span className="active" />}
			</button>
			<button className="toolbar-item spaced " onClick={formatBulletList}>
				<span className="icon bullet-list" />
				{/* <span className="text">Bullet List</span> */}
				{blockType === 'ul' && <span className="active" />}
			</button>
			<button className="toolbar-item spaced " onClick={formatNumberedList}>
				<span className="icon numbered-list" />
				{/* <span className="text">Numbered List</span> */}
				{blockType === 'ol' && <span className="active" />}
			</button>
			<button className="toolbar-item spaced " onClick={formatCode}>
				<span className="icon code" />
				{/* <span className="text">Code Block</span> */}
				{blockType === 'code' && <span className="active" />}
			</button>
			{/* </div> */}
		</HStack>
	)
}

function BlockOptionsDropdownList({ editor, blockType, toolbarRef, setShowBlockOptionsDropDown }: BlockOptionsDropdownListProps) {
	const dropDownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const toolbar = toolbarRef.current;
		const dropDown = dropDownRef.current;

		if (toolbar !== null && dropDown !== null) {
			const { top, left } = toolbar.getBoundingClientRect();
			dropDown.style.top = `${top + 40}px`;
			dropDown.style.left = `${left}px`;
		}
	}, [dropDownRef, toolbarRef]);

	useEffect(() => {
		const dropDown = dropDownRef.current;
		const toolbar = toolbarRef.current;

		if (dropDown !== null && toolbar !== null) {

			const handle = (event: globalThis.MouseEvent) => {
				const target = event.target as Node | null;
				if (target && !dropDown.contains(target) && !toolbar.contains(target)) {
					setShowBlockOptionsDropDown(false);
				}
			}
			document.addEventListener('click', handle)
			// document.addEventListener('click', handle)

			return () => {
				document.removeEventListener('click', handle)
			};
		}
	}, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

	const formatParagraph = () => {
		if (blockType !== 'paragraph') {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createParagraphNode());
				}
			});
		}
		setShowBlockOptionsDropDown(false);
	};



	const formatLargeHeading = () => {
		if (blockType !== 'h1') {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createHeadingNode('h1'));
				}
			});
		}
		setShowBlockOptionsDropDown(false);
	};

	const formatSmallHeading = () => {
		if (blockType !== 'h2') {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createHeadingNode('h2'));
				}
			});
		}
		setShowBlockOptionsDropDown(false);
	};

	const formatBulletList = () => {
		if (blockType !== 'ul') {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
		setShowBlockOptionsDropDown(false);
	};

	const formatNumberedList = () => {
		if (blockType !== 'ol') {
			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
		setShowBlockOptionsDropDown(false);
	};

	const formatQuote = () => {
		if (blockType !== 'quote') {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createQuoteNode());
				}
			});
		}
		setShowBlockOptionsDropDown(false);
	};

	const formatCode = () => {
		if (blockType !== 'code') {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createCodeNode());
				}
			});
		}
		setShowBlockOptionsDropDown(false);
	};

	return (
		<div className="dropdown" ref={dropDownRef}>
			<button className="item" onClick={formatParagraph}>
				<span className="icon paragraph" />
				<span className="text">Normal</span>
				{blockType === 'paragraph' && <span className="active" />}
			</button>
			<button className="item" onClick={formatLargeHeading}>
				<span className="icon large-heading" />
				<span className="text">Large Heading</span>
				{blockType === 'h1' && <span className="active" />}
			</button>
			<button className="item" onClick={formatSmallHeading}>
				<span className="icon small-heading" />
				<span className="text">Small Heading</span>
				{blockType === 'h2' && <span className="active" />}
			</button>
			<button className="item" onClick={formatBulletList}>
				<span className="icon bullet-list" />
				<span className="text">Bullet List</span>
				{blockType === 'ul' && <span className="active" />}
			</button>
			<button className="item" onClick={formatNumberedList}>
				<span className="icon numbered-list" />
				<span className="text">Numbered List</span>
				{blockType === 'ol' && <span className="active" />}
			</button>
			<button className="item" onClick={formatQuote}>
				<span className="icon quote" />
				<span className="text">Quote</span>
				{blockType === 'quote' && <span className="active" />}
			</button>
			<button className="item" onClick={formatCode}>
				<span className="icon code" />
				<span className="text">Code Block</span>
				{blockType === 'code' && <span className="active" />}
			</button>
		</div>
	);
}





export function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext();
	const [activeEditor, setActiveEditor] = useState(editor);
	const [isEditable, setIsEditable] = useState(() => editor.isEditable());
	const toolbarRef = useRef<HTMLDivElement>(null);
	const [modal, showModal] = useEditorMiniModal();
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [blockType, setBlockType] = useState('paragraph');
	const [isSubscript, setIsSubscript] = useState(false);
	const [isSuperscript, setIsSuperscript] = useState(false);
	const [selectedElementKey, setSelectedElementKey] = useState(null);
	const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(
		false
	);
	const [codeLanguage, setCodeLanguage] = useState('');
	const [isRTL, setIsRTL] = useState(false);
	const [isLink, setIsLink] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);
	const [isCode, setIsCode] = useState(false);
	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			const anchorNode = selection.anchor.getNode();
			let element =
				anchorNode.getKey() === 'root'
					? anchorNode
					: $findMatchingParent(anchorNode, (e) => {
						const parent = e.getParent();
						return parent !== null && $isRootOrShadowRoot(parent);
					});

			if (element === null) {
				element = anchorNode.getTopLevelElementOrThrow();
			}

			const elementKey = element.getKey();
			const elementDOM = activeEditor.getElementByKey(elementKey);

			// Update text format
			setIsBold(selection.hasFormat('bold'));
			setIsItalic(selection.hasFormat('italic'));
			setIsUnderline(selection.hasFormat('underline'));
			setIsStrikethrough(selection.hasFormat('strikethrough'));
			setIsSubscript(selection.hasFormat('subscript'));
			setIsSuperscript(selection.hasFormat('superscript'));
			setIsCode(selection.hasFormat('code'));
			setIsRTL($isParentElementRTL(selection));

			// Update links
			const node = getSelectedNode(selection);
			const parent = node.getParent();
			if ($isLinkNode(parent) || $isLinkNode(node)) {
				setIsLink(true);
			} else {
				setIsLink(false);
			}

			// const tableNode = $findMatchingParent(node, $isTableNode);
			// if ($isTableNode(tableNode)) {
			// 	setRootType('table');
			// } else {
			// 	setRootType('root');
			// }

			if (elementDOM !== null) {
				setSelectedElementKey(elementKey);
				if ($isListNode(element)) {
					const parentList = $getNearestNodeOfType<ListNode>(
						anchorNode,
						ListNode,
					);
					const type = parentList
						? parentList.getListType()
						: element.getListType();
					setBlockType(type);
				} else {
					const type = $isHeadingNode(element)
						? element.getTag()
						: element.getType();
					if (type in blockTypeToBlockName) {
						setBlockType(type as keyof typeof blockTypeToBlockName);
					}
					if ($isCodeNode(element)) {
						const language =
							element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
						setCodeLanguage(
							language ? CODE_LANGUAGE_MAP[language] || language : '',
						);
						return;
					}
				}
			}
			// Handle buttons

		}
	}, [activeEditor]);
	// const updateToolbar = useCallback(() => {
	// 	const selection = $getSelection();
	// 	if ($isRangeSelection(selection)) {
	// 		const anchorNode = selection.anchor.getNode();
	// 		const element =
	// 			anchorNode.getKey() === 'root'
	// 				? anchorNode
	// 				: anchorNode.getTopLevelElementOrThrow();
	// 		const elementKey = element.getKey();
	// 		const elementDOM = editor.getElementByKey(elementKey);
	// 		if (elementDOM !== null) {
	// 			setSelectedElementKey(elementKey);
	// 			if ($isListNode(element)) {
	// 				const parentList = $getNearestNodeOfType(anchorNode, ListNode);
	// 				const type = parentList ? parentList.getTag() : element.getTag();
	// 				setBlockType(type);
	// 			} else {
	// 				const type = $isHeadingNode(element)
	// 					? element.getTag()
	// 					: element.getType();
	// 				setBlockType(type);
	// 				if ($isCodeNode(element)) {
	// 					setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
	// 				}
	// 			}
	// 		}
	// 		// Update text format
	// 		setIsBold(selection.hasFormat('bold'));
	// 		setIsItalic(selection.hasFormat('italic'));
	// 		setIsUnderline(selection.hasFormat('underline'));
	// 		setIsStrikethrough(selection.hasFormat('strikethrough'));
	// 		setIsCode(selection.hasFormat('code'));
	// 		setIsRTL($isParentElementRTL(selection));

	// 		// Update links
	// 		const node = getSelectedNode(selection);
	// 		const parent = node.getParent();
	// 		if ($isLinkNode(parent) || $isLinkNode(node)) {
	// 			setIsLink(true);
	// 		} else {
	// 			setIsLink(false);
	// 		}
	// 	}
	// }, [editor]);
	useEffect(() => {
		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			(_payload, newEditor) => {
				$updateToolbar();
				setActiveEditor(newEditor);
				return false;
			},
			COMMAND_PRIORITY_CRITICAL,
		);
	}, [editor, $updateToolbar]);

	useEffect(() => {
		return mergeRegister(
			editor.registerEditableListener((editable) => {
				setIsEditable(editable);
			}),
			activeEditor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar();
				});
			}),
			activeEditor.registerCommand<boolean>(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL,
			),
			activeEditor.registerCommand<boolean>(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL,
			),
		);
	}, [$updateToolbar, activeEditor, editor]);

	const applyStyleText = useCallback(
		(styles: Record<string, string>) => {
			activeEditor.update(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					$patchStyleText(selection, styles);
				}
			});
		},
		[activeEditor],
	);

	const clearFormatting = useCallback(() => {
		activeEditor.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				const anchor = selection.anchor;
				const focus = selection.focus;
				const nodes = selection.getNodes();

				if (anchor.key === focus.key && anchor.offset === focus.offset) {
					return;
				}

				nodes.forEach((node, idx) => {
					// We split the first and last node by the selection
					// So that we don't format unselected text inside those nodes
					if ($isTextNode(node)) {
						if (idx === 0 && anchor.offset !== 0) {
							node = node.splitText(anchor.offset)[1] || node;
						}
						if (idx === nodes.length - 1) {
							node = node.splitText(focus.offset)[0] || node;
						}

						if (node.__style !== '') {
							node.setStyle('');
						}
						if (node.__format !== 0) {
							node.setFormat(0);
							$getNearestBlockElementAncestorOrThrow(node).setFormat('');
						}
					} else if ($isHeadingNode(node) || $isQuoteNode(node)) {
						node.replace($createParagraphNode(), true);
					}
					// else if ($isDecoratorBlockNode(node)) {
					// 	node.setFormat('');
					// }
				});
			}
		});
	}, [activeEditor]);

	const onFontColorSelect = useCallback(
		(value: string) => {
			applyStyleText({ color: value });
		},
		[applyStyleText],
	);

	const onBgColorSelect = useCallback(
		(value: string) => {
			applyStyleText({ 'background-color': value });
		},
		[applyStyleText],
	);


	const onCodeLanguageSelect = useCallback(
		(value: string) => {
			activeEditor.update(() => {
				if (selectedElementKey !== null) {
					const node = $getNodeByKey(selectedElementKey);
					if ($isCodeNode(node)) {
						node.setLanguage(value);
					}
				}
			});
		},
		[activeEditor, selectedElementKey],
	);


	// const blockTypesListRendered = (
	// 	supportedBlockTypes.has(blockType) && (
	// 		<>
	// 			<button
	// 				className="toolbar-item block-controls"
	// 				onClick={() =>
	// 					setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
	// 				}
	// 				aria-label="Formatting Options"
	// 			>
	// 				<span className={'icon block-type ' + blockType} />
	// 				<span className="text">
	// 					{blockTypeToBlockName[blockType as keyof typeof blockTypeToBlockName]}
	// 				</span>
	// 				<i className="chevron-down" />
	// 			</button>
	// 			{showBlockOptionsDropDown &&
	// 				createPortal(
	// 					<BlockOptionsDropdownList
	// 						editor={editor}
	// 						blockType={blockType}
	// 						toolbarRef={toolbarRef}
	// 						setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
	// 					/>,
	// 					document.body
	// 				)}
	// 			<Divider />
	// 		</>
	// 	)
	// )
	return (
		<div className="toolbar" ref={toolbarRef}>

			<button
				onClick={() => {
					showModal('Insert Equation', (onClose) => {
						return <InsertEquationDialog
							activeEditor={activeEditor}
							onClose={onClose}
						/>
					});
				}}
				className="toolbar-item"
			// aria-label="Redo"
			>
				Math
			</button>
			<MainBlocks blockType={blockType} editor={editor} />


			{blockType === 'code' ? (
				<>
					{/* <Select
						className="toolbar-item code-language"
						onChange={onCodeLanguageSelect}
						options={codeLanguages}
						value={codeLanguage}
					/>
					<i className="chevron-down inside" /> */}
					{/* <button onClick={() => setBlockType('paragraph')}>Exit</button> */}
				</>
			) : (
				<>
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
						}}
						className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
						aria-label="Format Bold"
					>
						<i className="format bold" />
					</button>
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
						}}
						className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
						aria-label="Format Italics"
					>
						<i className="format italic" />
					</button>
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
						}}
						className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
						aria-label="Format Underline"
					>
						<i className="format underline" />
					</button>
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
						}}
						className={
							'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')
						}
						aria-label="Format Strikethrough"
					>
						<i className="format strikethrough" />
					</button>
					<Divider />
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
						}}
						className="toolbar-item spaced"
						aria-label="Left Align"
					>
						<i className="format left-align" />
					</button>
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
						}}
						className="toolbar-item spaced"
						aria-label="Center Align"
					>
						<i className="format center-align" />
					</button>
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
						}}
						className="toolbar-item spaced"
						aria-label="Right Align"
					>
						<i className="format right-align" />
					</button>
					<button
						onClick={() => {
							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
						}}
						className="toolbar-item"
						aria-label="Justify Align"
					>
						<i className="format justify-align" />
					</button>{' '}
				</>
			)}
			{modal}
		</div>
	);
}
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import { ChangeEvent, Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import {
// 	CAN_REDO_COMMAND,
// 	CAN_UNDO_COMMAND,
// 	REDO_COMMAND,
// 	UNDO_COMMAND,
// 	SELECTION_CHANGE_COMMAND,
// 	FORMAT_TEXT_COMMAND,
// 	FORMAT_ELEMENT_COMMAND,
// 	$getSelection,
// 	$isRangeSelection,
// 	$createParagraphNode,
// 	$getNodeByKey,
// 	LexicalEditor,
// 	RangeSelection,
// 	NodeSelection,
// 	GridSelection,
// 	$isElementNode,
// 	$isRootOrShadowRoot
// } from 'lexical';
// import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
// import {
// 	$isParentElementRTL,
// 	$wrapNodes,
// 	$isAtNodeEnd,
// 	$getSelectionStyleValueForProperty
// } from '@lexical/selection';
// import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
// import {
// 	INSERT_ORDERED_LIST_COMMAND,
// 	INSERT_UNORDERED_LIST_COMMAND,
// 	REMOVE_LIST_COMMAND,
// 	$isListNode,
// 	ListNode
// } from '@lexical/list';
// import { createPortal } from 'react-dom';
// import {
// 	$createHeadingNode,
// 	$createQuoteNode,
// 	$isHeadingNode
// } from '@lexical/rich-text';
// import {
// 	$createCodeNode,
// 	$isCodeNode,
// 	getDefaultCodeLanguage,
// 	getCodeLanguages,
// 	CODE_LANGUAGE_MAP
// } from '@lexical/code';
// import { InsertEquationDialog } from './EquationsPlugin';
// import { useEditorMiniModal } from '../hooks/useModal';
// import { KatexEquationAlterer } from '../ui/katex/KatexEquationAlterer';
// import { $isTableNode } from '@lexical/table';

// const LowPriority = 1;

// const supportedBlockTypes = new Set([
// 	'paragraph',
// 	'quote',
// 	'code',
// 	'h1',
// 	'h2',
// 	// 'ul',
// 	// 'ol'
// ]);

// const blockTypeToBlockName = {
// 	code: 'Code Block',
// 	h1: 'Large Heading',
// 	h2: 'Small Heading',
// 	h3: 'Heading',
// 	h4: 'Heading',
// 	h5: 'Heading',
// 	// ol: 'Numbered List',
// 	paragraph: 'Normal',
// 	quote: 'Quote',
// 	// ul: 'Bulleted List'
// };

// function Divider() {
// 	return <div className="divider" />;
// }
// // const a = document.querySelector('q') as HTMLDivElement
// // const rect = a.getBoundingClientRect()
// function positionEditorElement(editor: HTMLDivElement, rect: DOMRect | null) {
// 	if (rect === null) {
// 		editor.style.opacity = '0';
// 		editor.style.top = '-1000px';
// 		editor.style.left = '-1000px';
// 	} else {
// 		editor.style.opacity = '1';
// 		editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
// 		editor.style.left = `${rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2}px`;
// 	}
// }
// interface FloatingLinkEditorProps {
// 	editor: LexicalEditor
// }
// function FloatingLinkEditor({ editor }: FloatingLinkEditorProps) {
// 	const editorRef = useRef(null);
// 	const inputRef = useRef<HTMLInputElement>(null);
// 	const mouseDownRef = useRef(false);
// 	const [linkUrl, setLinkUrl] = useState('');
// 	const [isEditMode, setEditMode] = useState(false);
// 	const [lastSelection, setLastSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);

// 	const updateLinkEditor = useCallback(() => {
// 		const selection = $getSelection();
// 		if ($isRangeSelection(selection)) {
// 			const node = getSelectedNode(selection);
// 			const parent = node.getParent();
// 			if ($isLinkNode(parent)) {
// 				setLinkUrl(parent.getURL());
// 			} else if ($isLinkNode(node)) {
// 				setLinkUrl(node.getURL());
// 			} else {
// 				setLinkUrl('');
// 			}
// 		}
// 		const editorElem = editorRef.current;
// 		const nativeSelection = window.getSelection();
// 		const activeElement = document.activeElement;

// 		if (editorElem === null) {
// 			return;
// 		}

// 		const rootElement = editor.getRootElement();
// 		if (
// 			selection !== null &&
// 			nativeSelection &&
// 			!nativeSelection.isCollapsed &&
// 			rootElement !== null &&
// 			rootElement.contains(nativeSelection.anchorNode)
// 		) {
// 			const domRange = nativeSelection.getRangeAt(0);
// 			let rect;
// 			if (nativeSelection.anchorNode === rootElement) {
// 				let inner: Element = rootElement;
// 				while (inner.firstElementChild != null) {
// 					inner = inner.firstElementChild;
// 				}
// 				rect = inner.getBoundingClientRect();
// 			} else {
// 				rect = domRange.getBoundingClientRect();
// 			}

// 			if (!mouseDownRef.current) {
// 				positionEditorElement(editorElem, rect);
// 			}
// 			setLastSelection(selection);
// 		} else if (!activeElement || activeElement.className !== 'link-input') {
// 			positionEditorElement(editorElem, null);
// 			setLastSelection(null);
// 			setEditMode(false);
// 			setLinkUrl('');
// 		}

// 		return true;
// 	}, [editor]);

// 	useEffect(() => {
// 		return mergeRegister(
// 			editor.registerUpdateListener(({ editorState }) => {
// 				editorState.read(() => {
// 					updateLinkEditor();
// 				});
// 			}),

// 			editor.registerCommand(
// 				SELECTION_CHANGE_COMMAND,
// 				() => {
// 					updateLinkEditor();
// 					return true;
// 				},
// 				LowPriority
// 			)
// 		);
// 	}, [editor, updateLinkEditor]);

// 	useEffect(() => {
// 		editor.getEditorState().read(() => {
// 			updateLinkEditor();
// 		});
// 	}, [editor, updateLinkEditor]);

// 	useEffect(() => {
// 		if (isEditMode && inputRef.current) {
// 			inputRef.current.focus();
// 		}
// 	}, [isEditMode]);

// 	return (
// 		<div ref={editorRef} className="link-editor">
// 			{isEditMode ? (
// 				<input
// 					ref={inputRef}
// 					className="link-input"
// 					value={linkUrl}
// 					onChange={(event) => {
// 						setLinkUrl(event.target.value);
// 					}}
// 					onKeyDown={(event) => {
// 						if (event.key === 'Enter') {
// 							event.preventDefault();
// 							if (lastSelection !== null) {
// 								if (linkUrl !== '') {
// 									editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
// 								}
// 								setEditMode(false);
// 							}
// 						} else if (event.key === 'Escape') {
// 							event.preventDefault();
// 							setEditMode(false);
// 						}
// 					}}
// 				/>
// 			) : (
// 				<>
// 					<div className="link-input">
// 						<a href={linkUrl} target="_blank" rel="noopener noreferrer">
// 							{linkUrl}
// 						</a>
// 						<div
// 							className="link-edit"
// 							role="button"
// 							tabIndex={0}
// 							onMouseDown={(event) => event.preventDefault()}
// 							onClick={() => {
// 								setEditMode(true);
// 							}}
// 						/>
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// }
// interface SelectProps {
// 	className?: string
// 	options: string[]
// 	value: string
// 	onChange: (e: ChangeEvent<HTMLSelectElement>) => void
// 	// onChange: (value: string) => void
// }
// // const o = document.createElement('option')
// function Select({ onChange, className, options, value }: SelectProps) {
// 	return (
// 		<select className={className} onChange={onChange} value={value}>
// 			<option hidden={true} value="" />
// 			{options.map((option) => (
// 				<option key={option} value={option}>
// 					{option}
// 				</option>
// 			))}
// 		</select>
// 	);
// }

// function getSelectedNode(selection: RangeSelection) {
// 	const anchor = selection.anchor;
// 	const focus = selection.focus;
// 	const anchorNode = selection.anchor.getNode();
// 	const focusNode = selection.focus.getNode();
// 	if (anchorNode === focusNode) {
// 		return anchorNode;
// 	}
// 	const isBackward = selection.isBackward();
// 	if (isBackward) {
// 		return $isAtNodeEnd(focus) ? anchorNode : focusNode;
// 	} else {
// 		return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
// 	}
// }

// interface BlockOptionsDropdownListProps {
// 	editor: LexicalEditor
// 	blockType: string
// 	toolbarRef: RefObject<HTMLDivElement>
// 	setShowBlockOptionsDropDown: Dispatch<SetStateAction<boolean>>
// }
// function BlockOptionsDropdownList({ editor, blockType, toolbarRef, setShowBlockOptionsDropDown }: BlockOptionsDropdownListProps) {
// 	const dropDownRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const toolbar = toolbarRef.current;
// 		const dropDown = dropDownRef.current;

// 		if (toolbar !== null && dropDown !== null) {
// 			const { top, left } = toolbar.getBoundingClientRect();
// 			dropDown.style.top = `${top + 40}px`;
// 			dropDown.style.left = `${left}px`;
// 		}
// 	}, [dropDownRef, toolbarRef]);

// 	useEffect(() => {
// 		const dropDown = dropDownRef.current;
// 		const toolbar = toolbarRef.current;

// 		if (dropDown !== null && toolbar !== null) {

// 			const handle = (event: globalThis.MouseEvent) => {
// 				const target = event.target as Node | null;
// 				if (target && !dropDown.contains(target) && !toolbar.contains(target)) {
// 					setShowBlockOptionsDropDown(false);
// 				}
// 			}
// 			document.addEventListener('click', handle)
// 			// document.addEventListener('click', handle)

// 			return () => {
// 				document.removeEventListener('click', handle)
// 			};
// 		}
// 	}, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

// 	const formatParagraph = () => {
// 		if (blockType !== 'paragraph') {
// 			editor.update(() => {
// 				const selection = $getSelection();

// 				if ($isRangeSelection(selection)) {
// 					$wrapNodes(selection, () => $createParagraphNode());
// 				}
// 			});
// 		}
// 		setShowBlockOptionsDropDown(false);
// 	};

// 	const formatLargeHeading = () => {
// 		if (blockType !== 'h1') {
// 			editor.update(() => {
// 				const selection = $getSelection();

// 				if ($isRangeSelection(selection)) {
// 					$wrapNodes(selection, () => $createHeadingNode('h1'));
// 				}
// 			});
// 		}
// 		setShowBlockOptionsDropDown(false);
// 	};

// 	const formatSmallHeading = () => {
// 		if (blockType !== 'h2') {
// 			editor.update(() => {
// 				const selection = $getSelection();

// 				if ($isRangeSelection(selection)) {
// 					$wrapNodes(selection, () => $createHeadingNode('h2'));
// 				}
// 			});
// 		}
// 		setShowBlockOptionsDropDown(false);
// 	};

// 	const formatBulletList = () => {
// 		if (blockType !== 'ul') {
// 			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
// 		} else {
// 			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
// 		}
// 		setShowBlockOptionsDropDown(false);
// 	};

// 	const formatNumberedList = () => {
// 		if (blockType !== 'ol') {
// 			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
// 		} else {
// 			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
// 		}
// 		setShowBlockOptionsDropDown(false);
// 	};

// 	const formatQuote = () => {
// 		if (blockType !== 'quote') {
// 			editor.update(() => {
// 				const selection = $getSelection();

// 				if ($isRangeSelection(selection)) {
// 					$wrapNodes(selection, () => $createQuoteNode());
// 				}
// 			});
// 		}
// 		setShowBlockOptionsDropDown(false);
// 	};

// 	const formatCode = () => {
// 		if (blockType !== 'code') {
// 			editor.update(() => {
// 				const selection = $getSelection();

// 				if ($isRangeSelection(selection)) {
// 					$wrapNodes(selection, () => $createCodeNode());
// 				}
// 			});
// 		}
// 		setShowBlockOptionsDropDown(false);
// 	};

// 	return (
// 		<div className="dropdown" ref={dropDownRef}>
// 			<button className="item" onClick={formatParagraph}>
// 				<span className="icon paragraph" />
// 				<span className="text">Normal</span>
// 				{blockType === 'paragraph' && <span className="active" />}
// 			</button>
// 			<button className="item" onClick={formatLargeHeading}>
// 				<span className="icon large-heading" />
// 				<span className="text">Large Heading</span>
// 				{blockType === 'h1' && <span className="active" />}
// 			</button>
// 			<button className="item" onClick={formatSmallHeading}>
// 				<span className="icon small-heading" />
// 				<span className="text">Small Heading</span>
// 				{blockType === 'h2' && <span className="active" />}
// 			</button>
// 			<button className="item" onClick={formatBulletList}>
// 				<span className="icon bullet-list" />
// 				<span className="text">Bullet List</span>
// 				{blockType === 'ul' && <span className="active" />}
// 			</button>
// 			<button className="item" onClick={formatNumberedList}>
// 				<span className="icon numbered-list" />
// 				<span className="text">Numbered List</span>
// 				{blockType === 'ol' && <span className="active" />}
// 			</button>
// 			<button className="item" onClick={formatQuote}>
// 				<span className="icon quote" />
// 				<span className="text">Quote</span>
// 				{blockType === 'quote' && <span className="active" />}
// 			</button>
// 			<button className="item" onClick={formatCode}>
// 				<span className="icon code" />
// 				<span className="text">Code Block</span>
// 				{blockType === 'code' && <span className="active" />}
// 			</button>
// 		</div>
// 	);
// }





// export function ToolbarPlugin() {
// 	const [editor] = useLexicalComposerContext();
// 	const [activeEditor, setActiveEditor] = useState(editor);
// 	const toolbarRef = useRef<HTMLDivElement>(null);
// 	const [modal, showModal] = useEditorMiniModal();
// 	const [canUndo, setCanUndo] = useState(false);
// 	const [canRedo, setCanRedo] = useState(false);
// 	const [blockType, setBlockType] = useState('paragraph');
// 	const [isSubscript, setIsSubscript] = useState(false);
// 	const [isSuperscript, setIsSuperscript] = useState(false);
// 	const [selectedElementKey, setSelectedElementKey] = useState(null);
// 	const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(
// 		false
// 	);
// 	const [codeLanguage, setCodeLanguage] = useState('');
// 	const [isRTL, setIsRTL] = useState(false);
// 	const [isLink, setIsLink] = useState(false);
// 	const [isBold, setIsBold] = useState(false);
// 	const [isItalic, setIsItalic] = useState(false);
// 	const [isUnderline, setIsUnderline] = useState(false);
// 	const [isStrikethrough, setIsStrikethrough] = useState(false);
// 	const [isCode, setIsCode] = useState(false);
// 	const $updateToolbar = useCallback(() => {
// 		const selection = $getSelection();
// 		if ($isRangeSelection(selection)) {
// 			const anchorNode = selection.anchor.getNode();
// 			let element =
// 				anchorNode.getKey() === 'root'
// 					? anchorNode
// 					: $findMatchingParent(anchorNode, (e) => {
// 						const parent = e.getParent();
// 						return parent !== null && $isRootOrShadowRoot(parent);
// 					});

// 			if (element === null) {
// 				element = anchorNode.getTopLevelElementOrThrow();
// 			}

// 			const elementKey = element.getKey();
// 			const elementDOM = activeEditor.getElementByKey(elementKey);

// 			// Update text format
// 			setIsBold(selection.hasFormat('bold'));
// 			setIsItalic(selection.hasFormat('italic'));
// 			setIsUnderline(selection.hasFormat('underline'));
// 			setIsStrikethrough(selection.hasFormat('strikethrough'));
// 			setIsSubscript(selection.hasFormat('subscript'));
// 			setIsSuperscript(selection.hasFormat('superscript'));
// 			setIsCode(selection.hasFormat('code'));
// 			setIsRTL($isParentElementRTL(selection));

// 			// Update links
// 			const node = getSelectedNode(selection);
// 			const parent = node.getParent();
// 			if ($isLinkNode(parent) || $isLinkNode(node)) {
// 				setIsLink(true);
// 			} else {
// 				setIsLink(false);
// 			}

// 			// const tableNode = $findMatchingParent(node, $isTableNode);
// 			// if ($isTableNode(tableNode)) {
// 			// 	setRootType('table');
// 			// } else {
// 			// 	setRootType('root');
// 			// }

// 			if (elementDOM !== null) {
// 				setSelectedElementKey(elementKey);
// 				if ($isListNode(element)) {
// 					const parentList = $getNearestNodeOfType<ListNode>(
// 						anchorNode,
// 						ListNode,
// 					);
// 					const type = parentList
// 						? parentList.getListType()
// 						: element.getListType();
// 					setBlockType(type);
// 				} else {
// 					const type = $isHeadingNode(element)
// 						? element.getTag()
// 						: element.getType();
// 					if (type in blockTypeToBlockName) {
// 						setBlockType(type as keyof typeof blockTypeToBlockName);
// 					}
// 					if ($isCodeNode(element)) {
// 						const language =
// 							element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
// 						setCodeLanguage(
// 							language ? CODE_LANGUAGE_MAP[language] || language : '',
// 						);
// 						return;
// 					}
// 				}
// 			}
// 			// Handle buttons

// 		}
// 	}, [activeEditor]);
// 	// const updateToolbar = useCallback(() => {
// 	// 	const selection = $getSelection();
// 	// 	if ($isRangeSelection(selection)) {
// 	// 		const anchorNode = selection.anchor.getNode();
// 	// 		const element =
// 	// 			anchorNode.getKey() === 'root'
// 	// 				? anchorNode
// 	// 				: anchorNode.getTopLevelElementOrThrow();
// 	// 		const elementKey = element.getKey();
// 	// 		const elementDOM = editor.getElementByKey(elementKey);
// 	// 		if (elementDOM !== null) {
// 	// 			setSelectedElementKey(elementKey);
// 	// 			if ($isListNode(element)) {
// 	// 				const parentList = $getNearestNodeOfType(anchorNode, ListNode);
// 	// 				const type = parentList ? parentList.getTag() : element.getTag();
// 	// 				setBlockType(type);
// 	// 			} else {
// 	// 				const type = $isHeadingNode(element)
// 	// 					? element.getTag()
// 	// 					: element.getType();
// 	// 				setBlockType(type);
// 	// 				if ($isCodeNode(element)) {
// 	// 					setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
// 	// 				}
// 	// 			}
// 	// 		}
// 	// 		// Update text format
// 	// 		setIsBold(selection.hasFormat('bold'));
// 	// 		setIsItalic(selection.hasFormat('italic'));
// 	// 		setIsUnderline(selection.hasFormat('underline'));
// 	// 		setIsStrikethrough(selection.hasFormat('strikethrough'));
// 	// 		setIsCode(selection.hasFormat('code'));
// 	// 		setIsRTL($isParentElementRTL(selection));

// 	// 		// Update links
// 	// 		const node = getSelectedNode(selection);
// 	// 		const parent = node.getParent();
// 	// 		if ($isLinkNode(parent) || $isLinkNode(node)) {
// 	// 			setIsLink(true);
// 	// 		} else {
// 	// 			setIsLink(false);
// 	// 		}
// 	// 	}
// 	// }, [editor]);

// 	useEffect(() => {
// 		return mergeRegister(
// 			editor.registerUpdateListener(({ editorState }) => {
// 				editorState.read(() => {
// 					updateToolbar();
// 				});
// 			}),
// 			editor.registerCommand(
// 				SELECTION_CHANGE_COMMAND,
// 				(_payload, newEditor) => {
// 					updateToolbar();
// 					return false;
// 				},
// 				LowPriority
// 			),
// 			editor.registerCommand(
// 				CAN_UNDO_COMMAND,
// 				(payload) => {
// 					setCanUndo(payload);
// 					return false;
// 				},
// 				LowPriority
// 			),
// 			editor.registerCommand(
// 				CAN_REDO_COMMAND,
// 				(payload) => {
// 					setCanRedo(payload);
// 					return false;
// 				},
// 				LowPriority
// 			)
// 		);
// 	}, [editor, updateToolbar]);

// 	const codeLanguages = useMemo(() => getCodeLanguages(), []);
// 	const onCodeLanguageSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
// 		editor.update(() => {
// 			if (selectedElementKey !== null) {
// 				const node = $getNodeByKey(selectedElementKey);
// 				if ($isCodeNode(node)) {
// 					node.setLanguage(e.target.value);
// 				}
// 			}
// 		});
// 	},
// 		[editor, selectedElementKey]
// 	);
// 	{/* <button
// 				disabled={!canUndo}
// 				onClick={() => {
// 					editor.dispatchCommand(UNDO_COMMAND);
// 				}}
// 				className="toolbar-item spaced"
// 				aria-label="Undo"
// 			>
// 				<i className="format undo" />
// 			</button>
// 			<button
// 				disabled={!canRedo}
// 				onClick={() => {
// 					editor.dispatchCommand(REDO_COMMAND);
// 				}}
// 				className="toolbar-item"
// 				aria-label="Redo"
// 			>
// 				<i className="format redo" />
// 			</button> */}
// 	{/* <Divider /> */ }

// 	const blockTypesListRendered = (
// 		supportedBlockTypes.has(blockType) && (
// 			<>
// 				<button
// 					className="toolbar-item block-controls"
// 					onClick={() =>
// 						setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
// 					}
// 					aria-label="Formatting Options"
// 				>
// 					<span className={'icon block-type ' + blockType} />
// 					<span className="text">
// 						{blockTypeToBlockName[blockType as keyof typeof blockTypeToBlockName]}
// 					</span>
// 					<i className="chevron-down" />
// 				</button>
// 				{showBlockOptionsDropDown &&
// 					createPortal(
// 						<BlockOptionsDropdownList
// 							editor={editor}
// 							blockType={blockType}
// 							toolbarRef={toolbarRef}
// 							setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
// 						/>,
// 						document.body
// 					)}
// 				<Divider />
// 			</>
// 		)
// 	)
// 	return (
// 		<div className="toolbar" ref={toolbarRef}>
// 			<button
// 				onClick={() => {
// 					console.log('Equation click')
// 					// createPortal(<KatexEquationAlterer />, document.body)
// 					showModal('Insert Equation', (onClose) => {
// 						console.log(onClose)
// 						console.log(activeEditor)
// 						return <InsertEquationDialog
// 							activeEditor={activeEditor}
// 							onClose={onClose}
// 						/>
// 					});
// 				}}
// 				className="toolbar-item"
// 				aria-label="Redo"
// 			>
// 				equation
// 			</button>
// 			{blockTypesListRendered}

// 			{blockType === 'code' ? (
// 				<>
// 					<Select
// 						className="toolbar-item code-language"
// 						onChange={onCodeLanguageSelect}
// 						options={codeLanguages}
// 						value={codeLanguage}
// 					/>
// 					<i className="chevron-down inside" />
// 					{/* <button onClick={() => setBlockType('paragraph')}>Exit</button> */}
// 				</>
// 			) : (
// 				<>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
// 						}}
// 						className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
// 						aria-label="Format Bold"
// 					>
// 						<i className="format bold" />
// 					</button>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
// 						}}
// 						className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
// 						aria-label="Format Italics"
// 					>
// 						<i className="format italic" />
// 					</button>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
// 						}}
// 						className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
// 						aria-label="Format Underline"
// 					>
// 						<i className="format underline" />
// 					</button>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
// 						}}
// 						className={
// 							'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')
// 						}
// 						aria-label="Format Strikethrough"
// 					>
// 						<i className="format strikethrough" />
// 					</button>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
// 						}}
// 						className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
// 						aria-label="Insert Code"
// 					>
// 						<i className="format code" />
// 					</button>

// 					<Divider />
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
// 						}}
// 						className="toolbar-item spaced"
// 						aria-label="Left Align"
// 					>
// 						<i className="format left-align" />
// 					</button>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
// 						}}
// 						className="toolbar-item spaced"
// 						aria-label="Center Align"
// 					>
// 						<i className="format center-align" />
// 					</button>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
// 						}}
// 						className="toolbar-item spaced"
// 						aria-label="Right Align"
// 					>
// 						<i className="format right-align" />
// 					</button>
// 					<button
// 						onClick={() => {
// 							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
// 						}}
// 						className="toolbar-item"
// 						aria-label="Justify Align"
// 					>
// 						<i className="format justify-align" />
// 					</button>{' '}
// 				</>
// 			)}
// 		</div>
// 	);
// }
