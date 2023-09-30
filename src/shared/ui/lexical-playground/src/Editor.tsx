import './index.css';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
// import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import { RefObject, useEffect, useRef, useState } from 'react';
import { SettingsContext, useSettings } from './context/SettingsContext';
import { SharedHistoryContext, useSharedHistoryContext } from './context/SharedHistoryContext';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
// import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
// import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import { LayoutPlugin } from './plugins/LayoutPlugin/LayoutPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
// import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin/index2';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Settings from './Settings';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import { useActiveElement } from '@/shared/lib/helpers/hooks/useActiveElement';
import { EditorState } from 'lexical';
import { ChangePlugin } from './plugins/ChangePlugin/ChangePlugin';
import { CommandsPlugin } from './plugins/CommandPlugin/CommandPlugin';
import { CAN_USE_DOM } from '../shared/canUseDOM';


const useShowToolBar = ({ editorRef }: { editorRef: RefObject<HTMLDivElement> }) => {
	const activeElement = useActiveElement()
	const [showToolbar, setShowToolbar] = useState(false)
	useEffect(() => {
		if (editorRef.current && editorRef.current.contains(activeElement)) {
			setShowToolbar(true)
		} else {
			setShowToolbar(false)
		}
	}, [editorRef, activeElement])

	return showToolbar
}

interface EditorProps {
	onChange?: (editorState: EditorState) => void
	initialState?: string
	editable?: boolean
	id?: string
	heightValue: number
	autoFocus?: boolean
}

function Editor(props: EditorProps) {
	const { onChange, id, initialState, editable = true, heightValue, autoFocus } = props
	const { historyState } = useSharedHistoryContext();
	const renderCounter = useRef(0)
	const [isListNode, setIsListNode] = useState(false)
	const [isFirstRender, setIsFirstRender] = useState(true)
	const [toolbarHeight, setToolbarHeight] = useState(0)
	const {
		settings: {
			isMaxLength,
			isRichText,
			showTreeView,
		},
	} = useSettings();
	const editorRef = useRef<HTMLDivElement>(null)
	const editorScrollerRef = useRef<HTMLDivElement>(null)
	const showToolBar = useShowToolBar({ editorRef })
	const isEditable = useLexicalEditable();
	const text = 'Enter some rich text...'
	const placeholder = <Placeholder>{text}</Placeholder>;
	const [floatingAnchorElem, setFloatingAnchorElem] =
		useState<HTMLDivElement | null>(null);
	const [isSmallWidthViewport, setIsSmallWidthViewport] =
		useState<boolean>(false);

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	useEffect(() => {
		const updateViewPortWidth = () => {
			const isNextSmallWidthViewport =
				CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

			if (isNextSmallWidthViewport !== isSmallWidthViewport) {
				setIsSmallWidthViewport(isNextSmallWidthViewport);
			}
		};
		updateViewPortWidth();
		window.addEventListener('resize', updateViewPortWidth);

		return () => {
			window.removeEventListener('resize', updateViewPortWidth);
		};
	}, [isSmallWidthViewport]);

	// useEffect(() => {
	// 	console.log('Прилетела высота   ', heightValue)
	// }, [heightValue])
	useEffect(() => {
		// тут можно сделать проверку на количество рендеров, так как нужная высота прилетает только на третий раз. 
		console.log('renderCounter  ', renderCounter.current)

		if (editorScrollerRef.current && heightValue && toolbarHeight > 0) {
			// const toolbar = document.querySelector('.toolbarWrapper') as HTMLDivElement
			// console.log('toolbar.scrollHeight toolbar.scrollHeight toolbar.scrollHeight ', toolbar.scrollHeight)
			// renderCounter.current = -1
			// setIsFirstRender(false)
			editorScrollerRef.current.style.minHeight = `${heightValue - toolbarHeight}px`
			// editorScrollerRef.current.style.minHeight = `${heightValue - toolbar.scrollHeight}px`
			setIsFirstRender(false)
		}
	}, [heightValue, toolbarHeight])
	// useEffect(() => {
	// 	// тут можно сделать проверку на количество рендеров, так как нужная высота прилетает только на третий раз. 
	// 	console.log('renderCounter  ', renderCounter.current)
	// 	if (renderCounter.current === -1) {
	// 		return
	// 	} else if (renderCounter.current !== 2) {
	// 		renderCounter.current = renderCounter.current + 1
	// 		return
	// 	} else if (isFirstRender && editorScrollerRef.current && heightValue && renderCounter.current === 2) {
	// 		const toolbar = document.querySelector('.toolbarWrapper') as HTMLDivElement
	// 		console.log('toolbar.scrollHeight toolbar.scrollHeight toolbar.scrollHeight ', toolbar.scrollHeight)
	// 		renderCounter.current = -1
	// 		setIsFirstRender(false)
	// 		editorScrollerRef.current.style.minHeight = `${heightValue - toolbar.scrollHeight}px`
	// 	}
	// 	// setIsFirstRender(false)
	// }, [heightValue, isFirstRender])

	return (
		<div ref={editorRef} className="editor-shell">
			{isEditable && <ToolbarPlugin setToolbarHeight={setToolbarHeight} setIsListNode={setIsListNode} />}
			{/* {showToolBar && <ToolbarPlugin />} */}
			<div
				className={`editor-container ${showTreeView ? 'tree-view' : ''}`}
			>
				{/* {isMaxLength && <MaxLengthPlugin maxLength={30} />} */}
				<DragDropPaste />
				{autoFocus && <AutoFocusPlugin />}
				{/* <ClearEditorPlugin /> */}
				<ChangePlugin onChange={onChange} />
				<CommandsPlugin />
				<>
					<HistoryPlugin externalHistoryState={historyState} />
					<RichTextPlugin
						contentEditable={
							<div
								className="editor-scroller"
								ref={editorScrollerRef}
								style={
									(isFirstRender && heightValue)
										? { minHeight: heightValue - (toolbarHeight > 0 ? toolbarHeight : 37.6) }
										: { minHeight: editorScrollerRef.current?.style.minHeight }}
							>
								<div className="editor" ref={onRef}>
									<ContentEditable />
								</div>
							</div>
						}
						placeholder={placeholder}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<CodeHighlightPlugin />
					<ListPlugin />
					{isListNode && <TabIndentationPlugin />}
					{/* <CheckListPlugin /> */}
					<ListMaxIndentLevelPlugin maxDepth={7} />
					{/* <TablePlugin
							hasCellMerge={tableCellMerge}
							hasCellBackgroundColor={tableCellBackgroundColor}
						/>
						<TableCellResizer /> */}
					<ImagesPlugin captionsEnabled={false} />
					{/* <InlineImagePlugin /> */}
					<EquationsPlugin />

					{/* <HorizontalRulePlugin /> */}
					{/* <TabFocusPlugin /> */}

					<CollapsiblePlugin />
					{/* <LayoutPlugin /> */}
					{floatingAnchorElem && !isSmallWidthViewport && (
						<>
							<DraggableBlockPlugin anchorElem={floatingAnchorElem} />
							<CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
							{/* <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} /> */}
							{/* <TableCellActionMenuPlugin
									anchorElem={floatingAnchorElem}
									cellMerge={true}
								/> */}
							{/* <FloatingTextFormatToolbarPlugin
									anchorElem={floatingAnchorElem}
								/> */}
						</>
					)}
				</>


				{/* 		{(isCharLimit || isCharLimitUtf8) && (
					<CharacterLimitPlugin
						charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
						maxLength={5}
					/>
				)} */}

				{/* {shouldUseLexicalContextMenu && <ContextMenuPlugin />} */}
				{/* <ActionsPlugin isRichText={isRichText} /> */}
			</div>
			{/* <TreeViewPlugin /> */}
		</div>
	);
}

export const EditorV2 = (props: EditorProps) => {
	const initialConfig = {
		editable: props.editable,
		editorState: props.initialState,
		namespace: 'Playground',
		nodes: [...PlaygroundNodes],
		onError: (error: Error) => {
			throw error;
		},
		theme: PlaygroundEditorTheme,
	};
	return (
		<SettingsContext>
			<LexicalComposer initialConfig={initialConfig}>
				<SharedHistoryContext>

					{/* <div className="editor-shell"> */}
					<Editor {...props} />
					{/* </div> */}
					{/* <Settings /> */}
					{/* {isDevPlayground ? <DocsPlugin /> : null} */}
					{/* {isDevPlayground ? <PasteLogPlugin /> : null} */}
					{/* {isDevPlayground ? <TestRecorderPlugin /> : null} */}

				</SharedHistoryContext>
			</LexicalComposer>
		</SettingsContext>
	)
}