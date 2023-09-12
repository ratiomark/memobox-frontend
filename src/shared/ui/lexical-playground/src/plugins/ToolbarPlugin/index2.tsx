/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementFormatType, LexicalEditor, NodeKey } from 'lexical';
import leftAlignIcon from '../../images/icons/leftAlignIcon2.svg'
import centerAlignIcon from '../../images/icons/centerAlignIcon.svg'
import rightAlignIcon from '../../images/icons/rightAlignIcon.svg'
import middleAlignIcon from '../../images/icons/middleAlignIcon.svg'
import paragraphIcon from '../../images/icons/paragraphIcon.svg'
// import unOrderedListIcon from '../../images/icons/unOrderedListIcon.svg'
// import orderedListIcon from '../../images/icons/orderedListIcon.svg'
// import codeIcon from '../../images/icons/codeIcon.svg'
import indentIcon from '../../images/icons/paragraph-inline-right-svgrepo-com.svg'
// import indentIcon from '../../images/icons/indentIcon.svg'
import outdentIcon from '../../images/icons/paragraph-inline-left-svgrepo-com.svg'
// import outdentIcon from '../../images/icons/outdentIcon.svg'
import {
	$createCodeNode,
	$isCodeNode,
	CODE_LANGUAGE_FRIENDLY_NAME_MAP,
	CODE_LANGUAGE_MAP,
	getLanguageFriendlyName,
} from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
	$isListNode,
	// INSERT_CHECK_LIST_COMMAND,
	INSERT_ORDERED_LIST_COMMAND,
	INSERT_UNORDERED_LIST_COMMAND,
	ListNode,
	REMOVE_LIST_COMMAND,
} from '@lexical/list';
// import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
// import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import {
	// $createHeadingNode,
	// $createQuoteNode,
	$isHeadingNode,
	$isQuoteNode,
	// HeadingTagType,
} from '@lexical/rich-text';
import {
	// $getSelectionStyleValueForProperty,
	$isParentElementRTL,
	// $patchStyleText,
	$setBlocksType,
} from '@lexical/selection';
import { $isTableNode } from '@lexical/table';
import {
	$findMatchingParent,
	$getNearestBlockElementAncestorOrThrow,
	$getNearestNodeOfType,
	mergeRegister,
} from '@lexical/utils';
import {
	$createParagraphNode,
	$getNodeByKey,
	// $getRoot,
	$getSelection,
	$isElementNode,
	$isRangeSelection,
	$isRootOrShadowRoot,
	$isTextNode,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_CRITICAL,
	COMMAND_PRIORITY_NORMAL,
	DEPRECATED_$isGridSelection,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	INDENT_CONTENT_COMMAND,
	KEY_MODIFIER_COMMAND,
	OUTDENT_CONTENT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState, useRef } from 'react';
// import * as React from 'react';


import useModal from '../../hooks/useModal';
// import catTypingGif from '../../images/cat-typing.gif';
// import { $createStickyNode } from '../../nodes/StickyNode';
import DropDown, { DropDownItem } from '../../ui/DropDown';
// import DropdownColorPicker from '../../ui/DropdownColorPicker';
import { getSelectedNode } from '../../utils/getSelectedNode';
import { sanitizeUrl } from '../../utils/url';
// import { EmbedConfigs } from '../AutoEmbedPlugin';
import { INSERT_COLLAPSIBLE_COMMAND } from '../CollapsiblePlugin';
import { InsertEquationDialog } from '../EquationsPlugin';
// import { INSERT_EXCALIDRAW_COMMAND } from '../ExcalidrawPlugin';
import {
	// INSERT_IMAGE_COMMAND,
	InsertImageDialog,
	// InsertImagePayload,
} from '../ImagesPlugin';
import { IS_APPLE } from '../../../shared/src/environment';
import { useTranslation } from 'react-i18next';
import { buttonTitles } from '../../const/buttonTitles';
import { $isEquationNode } from '../../nodes/EquationNode';
import { Icon } from '@/shared/ui/Icon';
import { editorIconSize } from '@/shared/const/iconSizes';
import { blockTypeToBlockName, rootTypeToRootName } from './const';
import { BlockFormatDropDown } from './BlockFormatDropDown';
import { TextFormatting } from './TextFormatting';

function getCodeLanguageOptions(): [string, string][] {
	const options: [string, string][] = [];

	for (const [lang, friendlyName] of Object.entries(
		CODE_LANGUAGE_FRIENDLY_NAME_MAP,
	)) {
		options.push([lang, friendlyName]);
	}

	return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

// const FONT_FAMILY_OPTIONS: [string, string][] = [
// 	['Arial', 'Arial'],
// 	['Courier New', 'Courier New'],
// 	['Georgia', 'Georgia'],
// 	['Times New Roman', 'Times New Roman'],
// 	['Trebuchet MS', 'Trebuchet MS'],
// 	['Verdana', 'Verdana'],
// ];

// const FONT_SIZE_OPTIONS: [string, string][] = [
// 	['10px', '10px'],
// 	['11px', '11px'],
// 	['12px', '12px'],
// 	['13px', '13px'],
// 	['14px', '14px'],
// 	['15px', '15px'],
// 	['16px', '16px'],
// 	['17px', '17px'],
// 	['18px', '18px'],
// 	['19px', '19px'],
// 	['20px', '20px'],
// ];

// const ELEMENT_FORMAT_OPTIONS: {
// 	[key: string]: { icon: string; name: string };
// } = {
// 	center: {
// 		icon: 'center-align',
// 		name: 'Center Align',
// 	},
// 	justify: {
// 		icon: 'justify-align',
// 		name: 'Justify Align',
// 	},
// 	left: {
// 		icon: 'left-align',
// 		name: 'Left Align',
// 	},
// 	right: {
// 		icon: 'right-align',
// 		name: 'Right Align',
// 	},
// };

function dropDownActiveClass(active: boolean) {
	if (active) return 'active dropdown-item-active';
	else return '';
}


function Divider(): JSX.Element {
	return <div className="divider" />;
}


function ElementFormatDropdown({
	editor,
	value,
	isRTL,
	disabled = false,
}: {
	editor: LexicalEditor;
	value: ElementFormatType;
	isRTL: boolean;
	disabled: boolean;
}) {
	const { t } = useTranslation('editor')
	const buttonsDataList = [
		{
			title: buttonTitles.leftAlign,
			onClick: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'),
			value: 'left',
			icon: leftAlignIcon
		}
	]
	return (
		<div
			style={{ display: 'flex' }}
		>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.leftAlign),
					tabIndex: -1,
				}}
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
				}}
				type={value === 'left' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={leftAlignIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.centerAlign),
					tabIndex: -1,
				}}
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
				}}
				type={value === 'center' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={centerAlignIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.rightAlign),
					tabIndex: -1,
				}}
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
				}}
				type={value === 'right' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={rightAlignIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.middleAlign),
					tabIndex: -1,
				}}
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
				}}
				type={value === 'justify' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={middleAlignIcon}
			/>

			<Divider />
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.outdent),
					tabIndex: -1,
				}}
				onClick={() => {
					editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
				}}
				type='hint'
				width={editorIconSize - 2}
				height={editorIconSize - 2}
				Svg={isRTL ? indentIcon : outdentIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.outdent),
					tabIndex: -1,
				}}
				onClick={() => {
					editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
				}}
				type='hint'
				width={editorIconSize - 2}
				height={editorIconSize - 2}
				Svg={isRTL ? outdentIcon : indentIcon}
			/>
		</div>
	)
}

interface ToolbarPluginProps {
	setIsListNode?: React.Dispatch<React.SetStateAction<boolean>>
	setToolbarHeight?: React.Dispatch<React.SetStateAction<number>>
}

export default function ToolbarPlugin(props: ToolbarPluginProps): JSX.Element {
	const { setToolbarHeight, setIsListNode } = props
	const [editor] = useLexicalComposerContext();
	const [activeEditor, setActiveEditor] = useState(editor);
	const toolbarWrapperRef = useRef<HTMLDivElement>(null)
	const [blockType, setBlockType] =
		useState<keyof typeof blockTypeToBlockName>('paragraph');
	const [rootType, setRootType] =
		useState<keyof typeof rootTypeToRootName>('root');
	const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
		null,
	);
	// const [isEquation, setIsEquation] = useState(false)
	const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');
	const [isLink, setIsLink] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);
	const [isSubscript, setIsSubscript] = useState(false);
	const [isSuperscript, setIsSuperscript] = useState(false);
	// const [isCode, setIsCode] = useState(false);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [modal, showModal] = useModal();
	const [isRTL, setIsRTL] = useState(false);
	const [codeLanguage, setCodeLanguage] = useState<string>('');
	const [isEditable, setIsEditable] = useState(() => editor.isEditable());

	useEffect(() => {
		if (setToolbarHeight && toolbarWrapperRef.current) {
			setToolbarHeight(toolbarWrapperRef.current.getBoundingClientRect().height)
		}
	}, [setToolbarHeight])

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
			// setIsCode(selection.hasFormat('code'));
			setIsRTL($isParentElementRTL(selection));
			// $isEquationNode
			// Update links
			const node = getSelectedNode(selection);
			const parent = node.getParent();
			// if ($isEquationNode(parent) || $isEquationNode(node)) {
			// 	setIsEquation(true)
			// } else {
			// 	setIsEquation(false)
			// }
			if ($isLinkNode(parent) || $isLinkNode(node)) {
				setIsLink(true);
			} else {
				setIsLink(false);
			}

			const tableNode = $findMatchingParent(node, $isTableNode);
			if ($isTableNode(tableNode)) {
				setRootType('table');
			} else {
				setRootType('root');
			}

			if (elementDOM !== null) {
				setSelectedElementKey(elementKey);
				if ($isListNode(element)) {
					if (setIsListNode) {
						setIsListNode(true)
					}
					const parentList = $getNearestNodeOfType<ListNode>(
						anchorNode,
						ListNode,
					);
					const type = parentList
						? parentList.getListType()
						: element.getListType();
					setBlockType(type);
				} else {
					if (setIsListNode) {
						setIsListNode(false)
					}
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
			setElementFormat(
				($isElementNode(node)
					? node.getFormatType()
					: parent?.getFormatType()) || 'left',
			);
		}
	}, [activeEditor, setIsListNode]);

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

	useEffect(() => {
		return activeEditor.registerCommand(
			KEY_MODIFIER_COMMAND,
			(payload) => {
				const event: KeyboardEvent = payload;
				const { code, ctrlKey, metaKey } = event;

				if (code === 'KeyK' && (ctrlKey || metaKey)) {
					event.preventDefault();
					return activeEditor.dispatchCommand(
						TOGGLE_LINK_COMMAND,
						sanitizeUrl('https://'),
					);
				}
				return false;
			},
			COMMAND_PRIORITY_NORMAL,
		);
	}, [activeEditor, isLink]);



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
					} else if ($isDecoratorBlockNode(node)) {
						node.setFormat('');
					}
				});
			}
		});
	}, [activeEditor]);


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


	return (
		<div className={`toolbarWrapper ${!isEditable ? 'toolbarBlocked' : ''}`} ref={toolbarWrapperRef}>
			<div className="toolbar" style={{ display: 'flex', flexWrap: 'wrap' }}>
				<button
					tabIndex={-1}
					disabled={!canUndo || !isEditable}
					onClick={() => {
						activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
					}}
					title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
					type="button"
					className="toolbar-item spaced"
					aria-label="Undo">
					<i className="format undo" />
				</button>
				<button
					tabIndex={-1}
					disabled={!canRedo || !isEditable}
					onClick={() => {
						activeEditor.dispatchCommand(REDO_COMMAND, undefined);
					}}
					title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
					type="button"
					className="toolbar-item"
					aria-label="Redo">
					<i className="format redo" />
				</button>
				{blockType in blockTypeToBlockName && activeEditor === editor && (
					<BlockFormatDropDown
						disabled={!isEditable}
						blockType={blockType}
						rootType={rootType}
						editor={editor}
						activeEditor={activeEditor}
						showModal={showModal}
					/>
				)}
				<Divider />
				{blockType === 'code'
					? (
						<DropDown
							disabled={!isEditable}
							buttonClassName="toolbar-item code-language"
							buttonLabel={getLanguageFriendlyName(codeLanguage)}
							buttonAriaLabel="Select language">
							{CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
								return (
									<DropDownItem
										className={`item ${dropDownActiveClass(
											value === codeLanguage,
										)}`}
										onClick={() => onCodeLanguageSelect(value)}
										key={value}>
										<span className="text">{name}</span>
									</DropDownItem>
								);
							})}
						</DropDown>)
					: (
						<TextFormatting
							activeEditor={activeEditor}
							clearFormatting={clearFormatting}
							isEditable={isEditable}
							IS_APPLE={IS_APPLE}
							isBold={isBold}
							isItalic={isItalic}
							isUnderline={isUnderline}
							isStrikethrough={isStrikethrough}
							isSubscript={isSubscript}
							isSuperscript={isSuperscript}
						/>)
				}
				<Divider />
				<ElementFormatDropdown
					disabled={!isEditable}
					value={elementFormat}
					editor={editor}
					isRTL={isRTL}
				/>

				{modal}
			</div>
		</div>
	);
}
