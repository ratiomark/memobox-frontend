import paragraphIcon from '../../images/icons/paragraphIcon2.svg'
import unOrderedListIcon from '../../images/icons/list-bullet-svgrepo-com (5).svg'
// import unOrderedListIcon from '../../images/icons/unorderedListIcon3.svg'
import orderedListIcon from '../../images/icons/text-number-list-ltr-svgrepo-com (3).svg'
// import orderedListIcon from '../../images/icons/orderedListIcon3.svg'
import codeIcon from '../../images/icons/codeIcon.svg'
// import codeIcon from '../../images/icons/codeIcon.svg'
import imageIcon from '../../images/icons/image-1-svgrepo-com.svg'
// import imageIcon from '../../images/icons/imageIcon.svg'
import mathIcon from '../../images/icons/mathIcon2.svg'
import collapseIcon from '../../images/icons/triangle-right-svgrepo-com.svg'
import { editorIconSize } from '@/shared/const/iconSizes';
import { Icon } from '@/shared/ui/Icon';
import { $createCodeNode } from '@lexical/code';
import { INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from '@lexical/list';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection, $createParagraphNode, LexicalEditor } from 'lexical';
import { useTranslation } from 'react-i18next';
import { buttonTitles } from '../../const/buttonTitles';
import { blockTypeToBlockName, rootTypeToRootName } from './const';
import { INSERT_COLLAPSIBLE_COMMAND } from '../CollapsiblePlugin';
import { InsertEquationDialog } from '../EquationsPlugin';
import { InsertImageDialog } from '../ImagesPlugin';
import { InsertInlineImageDialog } from '../InlineImagePlugin'
import { memo } from 'react'

interface BlockFormatDropDownProps {
	blockType: keyof typeof blockTypeToBlockName;
	rootType: keyof typeof rootTypeToRootName;
	editor: LexicalEditor;
	activeEditor: LexicalEditor;
	disabled?: boolean;
	showModal: (title: string, showModal: (onClose: () => void) => JSX.Element) => void
}

// {	title: buttonTitles.paragraph,
// onClick:formatParagraph,
// blockType: 'paragraph',
// icon: paragraphIcon},

// {title: buttonTitles.unOrderedList,
// onClick:formatBulletList,
// blockType: 'bullet',
// icon: unOrderedListIcon},

// {title: buttonTitles.orderedList,
// onClick:formatNumberedList,
// blockType: 'number',
// icon: orderedListIcon},

// {title: buttonTitles.code,
// onClick:formatCode,
// blockType: 'code',
// icon: codeIcon}

// const formatCheckList = () => {
// 	if (blockType !== 'check') {
// 		editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
// 	} else {
// 		editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
// 	}
// };

export const BlockFormatDropDown = memo(({ editor, activeEditor, blockType, rootType, disabled = false, showModal, }: BlockFormatDropDownProps) => {
	const { t } = useTranslation('editor')
	const formatParagraph = () => {
		editor.update(() => {
			const selection = $getSelection();
			if (
				$isRangeSelection(selection) ||
				DEPRECATED_$isGridSelection(selection)
			) {
				$setBlocksType(selection, () => $createParagraphNode());
			}
		});
	};
	const formatBulletList = () => {
		if (blockType !== 'bullet') {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};
	const formatNumberedList = () => {
		if (blockType !== 'number') {
			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};
	const formatCode = () => {
		if (blockType !== 'code') {
			editor.update(() => {
				let selection = $getSelection();

				if (
					$isRangeSelection(selection) ||
					DEPRECATED_$isGridSelection(selection)
				) {
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

	const mainBlockButtonsList = [
		{
			title: buttonTitles.paragraph,
			onClick: formatParagraph,
			blockType: 'paragraph',
			icon: paragraphIcon
		},

		{
			title: buttonTitles.unOrderedList,
			onClick: formatBulletList,
			blockType: 'bullet',
			icon: unOrderedListIcon
		},
		{
			title: buttonTitles.orderedList,
			onClick: formatNumberedList,
			blockType: 'number',
			icon: orderedListIcon
		},
		{
			title: buttonTitles.code,
			onClick: formatCode,
			blockType: 'code',
			icon: codeIcon
		}
	]

	return (
		<div
			style={{ display: 'flex' }}
		>
			{mainBlockButtonsList.map(button => (
				<Icon
					key={button.blockType}
					clickable
					buttonProps={{
						disabled: disabled,
						title: t(button.title),
						tabIndex: -1,
					}}
					onClick={button.onClick}
					type={blockType === button.blockType ? 'main' : 'hint'}
					width={editorIconSize}
					height={editorIconSize}
					Svg={button.icon}
				/>
			))}
			<Icon
				clickable
				buttonProps={{
					disabled: disabled,
					title: t(buttonTitles.image),
					tabIndex: -1,
					id: 'toolbar_image_button'
				}}
				onClick={() => {
					showModal('Insert Image', (onClose) => (
						<InsertImageDialog
							activeEditor={activeEditor}
							onClose={onClose}
						/>
					));
				}}
				withFill={false}
				type={'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={imageIcon}
			/>
			{/* <Icon
				clickable
				buttonProps={{
					disabled: disabled,
					title: t(buttonTitles.image),
					tabIndex: -1,
				}}
				onClick={() => {
					showModal('Insert Image', (onClose) => (
						<InsertInlineImageDialog
							activeEditor={activeEditor}
							onClose={onClose}
						/>
					));
				}}
				withFill={false}
				type={'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={imageIcon}
			/> */}
			<Icon
				clickable
				buttonProps={{
					disabled: disabled,
					title: t(buttonTitles.math),
					tabIndex: -1,
				}}
				onClick={() => {
					showModal('Insert Equation', (onClose) => (
						<InsertEquationDialog
							activeEditor={activeEditor}
							onClose={onClose}
						/>
					));
				}}
				type={'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={mathIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					disabled: disabled,
					title: t(buttonTitles.collapseBlock),
					tabIndex: -1,
				}}
				onClick={() => {
					editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined);
				}}
				type={'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={collapseIcon}
			/>
		</div>
	);
})

{/* <Icon
				clickable
				buttonProps={{
					disabled: disabled,
					title: t(buttonTitles.paragraph),
					tabIndex: -1,
				}}
				onClick={formatParagraph}
				type={blockType === 'paragraph' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={paragraphIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.unOrderedList),
					tabIndex: -1,
				}}
				onClick={formatBulletList}
				type={blockType === 'bullet' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={unOrderedListIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.orderedList),
					tabIndex: -1,
				}}
				onClick={formatNumberedList}
				type={blockType === 'number' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={orderedListIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					title: t(buttonTitles.code),
					tabIndex: -1,
				}}
				onClick={formatCode}
				type={blockType === 'code' ? 'main' : 'hint'}
				width={editorIconSize}
				height={editorIconSize}
				Svg={codeIcon}
			/> */}