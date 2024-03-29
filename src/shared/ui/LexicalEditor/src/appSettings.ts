export type SettingName =
	| 'disableBeforeInput'
	| 'measureTypingPerf'
	| 'isRichText'
	| 'isCollab'
	| 'isCharLimit'
	| 'isMaxLength'
	| 'isCharLimitUtf8'
	| 'isAutocomplete'
	| 'shouldUseLexicalContextMenu'
	| 'showTreeView'
	| 'showNestedEditorTreeView'
	| 'emptyEditor'
	| 'showTableOfContents'
	| 'tableCellMerge'
	| 'tableCellBackgroundColor';

export type Settings = Record<SettingName, boolean>;

const hostName = window.location.hostname;
export const isDevPlayground: boolean =
	hostName !== 'playground.lexical.dev' &&
	hostName !== 'lexical-playground.vercel.app';

export const DEFAULT_SETTINGS: Settings = {
	disableBeforeInput: false,
	emptyEditor: isDevPlayground,
	isAutocomplete: false,
	isCharLimit: false,
	isCharLimitUtf8: false,
	isCollab: false,
	isMaxLength: false,
	isRichText: true,
	measureTypingPerf: false,
	shouldUseLexicalContextMenu: false,
	showNestedEditorTreeView: false,
	showTableOfContents: false,
	showTreeView: true,
	tableCellBackgroundColor: true,
	tableCellMerge: true,
};
