import { FORMAT_TEXT_COMMAND, LexicalEditor } from 'lexical'
import textBoldIcon from '../../images/icons/bold-svgrepo-com (2).svg'
// import textBoldIcon from '../../images/icons/textBoldIcon.svg'
import textItalicIcon from '../../images/icons/italic-svgrepo-com (2).svg'
// import textItalicIcon from '../../images/icons/textItalicIcon.svg'
// import textStrikeIcon from '../../images/icons/textStrikeIcon.svg'
// import textUnderlineIcon from '../../images/icons/textUnderlineIcon.svg'
import textUnderlineIcon from '../../images/icons/underline-svgrepo-com (2).svg'
import textStrikeIcon from '../../images/icons/strikethrough-svgrepo-com (2).svg'
import textSubscriptIcon from '../../images/icons/subscript-svgrepo-com (3).svg'
import textSuperscriptIcon from '../../images/icons/textSuperscriptIcon2.svg'
import textClearFormattingIcon from '../../images/icons/textClearFormattingIcon.svg'
// import textUnderlineIcon from '../../images/icons/textUnderlineIcon.svg'
import { memo } from 'react'
import { buttonTitles } from '../../const/buttonTitles'
import { Icon } from '@/shared/ui/Icon'
import { editorIconSize } from '@/shared/const/iconSizes'

interface TextFormattingProps {
	activeEditor: LexicalEditor
	clearFormatting: () => void
	isEditable: boolean
	IS_APPLE: boolean
	isBold: boolean
	isItalic: boolean
	isUnderline: boolean
	isStrikethrough: boolean
	isSubscript: boolean
	isSuperscript: boolean
}
function dropDownActiveClass(active: boolean) {
	if (active) return 'active dropdown-item-active';
	else return '';
}
export const TextFormatting = memo(({
	activeEditor,
	clearFormatting,
	isEditable,
	IS_APPLE,
	isBold,
	isItalic,
	isUnderline,
	isStrikethrough,
	isSubscript,
	isSuperscript,
}: TextFormattingProps) => {

	// const textFormattingButtonsList = [
	// 	{
	// 		title: buttonTitles.bold,
	// 		onClick: activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
	// 		isActive: isBold,
	// 		icon: paragraphIcon,
	// 		'aria-label':`Format text as bold. Shortcut: ${IS_APPLE ? '⌘B' : 'Ctrl+B'
	// 				}`
	// 	},

	// 	{
	// 		title: buttonTitles.unOrderedList,
	// 		onClick: formatBulletList,
	// 		blockType: 'bullet',
	// 		icon: unOrderedListIcon
	// 	},]

	return (


		<div
			style={{ display: 'flex' }}
		// disabled={disabled}
		>
			<Icon
				clickable
				buttonProps={{
					tabIndex: -1,
					disabled: !isEditable,
					title: IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)',
					'aria-label': `Format text as bold. Shortcut: ${IS_APPLE ? '⌘B' : 'Ctrl+B'}`
				}}

				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
				}}
				className='editorButton'
				width={editorIconSize}
				height={editorIconSize}
				type={isBold ? 'main' : 'hint'}
				Svg={textBoldIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					tabIndex: -1,
					disabled: !isEditable,
					title: IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)',
					'aria-label': `Format text as italics. Shortcut: ${IS_APPLE ? '⌘I' : 'Ctrl+I'}`
				}}

				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
				}}
				className='editorButton'
				width={editorIconSize}
				height={editorIconSize}
				type={isItalic ? 'main' : 'hint'}
				Svg={textItalicIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					tabIndex: -1,
					disabled: !isEditable,
					title: IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)',
					'aria-label': `Format text to underlined. Shortcut: ${IS_APPLE ? '⌘U' : 'Ctrl+U'}`
				}}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
				}}
				className='editorButton'
				width={editorIconSize}
				height={editorIconSize}
				type={isUnderline ? 'main' : 'hint'}
				Svg={textUnderlineIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					tabIndex: -1,
					disabled: !isEditable,
					title: buttonTitles.strike,
					'aria-label': 'Format text with a strikethrough'
				}}

				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
				}}
				className='editorButton'
				width={editorIconSize}
				height={editorIconSize}
				type={isStrikethrough ? 'main' : 'hint'}
				Svg={textStrikeIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					tabIndex: -1,
					disabled: !isEditable,
					title: buttonTitles.subscript,
					'aria-label': 'Format text with a subscript'
				}}

				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
				}}
				className='editorButton'
				width={editorIconSize}
				height={editorIconSize}
				type={isSubscript ? 'main' : 'hint'}
				Svg={textSubscriptIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					tabIndex: -1,
					disabled: !isEditable,
					title: buttonTitles.superscript,
					'aria-label': 'Format text with a superscript'
				}}

				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
				}}
				className='editorButton'
				width={editorIconSize}
				height={editorIconSize}
				type={isSuperscript ? 'main' : 'hint'}
				Svg={textSuperscriptIcon}
			/>
			<Icon
				clickable
				buttonProps={{
					tabIndex: -1,
					disabled: !isEditable,
					title: buttonTitles.clearFormatting,
					'aria-label': 'Clear all text formatting'
				}}
				onClick={clearFormatting}
				className='editorButton'
				width={editorIconSize}
				height={editorIconSize}
				type={'hint'}
				Svg={textClearFormattingIcon}
			/>
		</div>
	)
})
TextFormatting.displayName = 'TextFormatting'