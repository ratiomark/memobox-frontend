import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CollapsibleContainerNode } from '../plugins/CollapsiblePlugin/CollapsibleContainerNode';
import { CollapsibleContentNode } from '../plugins/CollapsiblePlugin/CollapsibleContentNode';
import { CollapsibleTitleNode } from '../plugins/CollapsiblePlugin/CollapsibleTitleNode';
import { AutocompleteNode } from './AutocompleteNode';
import { EmojiNode } from './EmojiNode';
import { EquationNode } from './EquationNode';
import { FigmaNode } from './FigmaNode';
import { ImageNode } from './ImageNode';
import { InlineImageNode } from './InlineImageNode';
import { KeywordNode } from './KeywordNode';
import { LayoutContainerNode } from './LayoutContainerNode';
import { LayoutItemNode } from './LayoutItemNode';
import { MentionNode } from './MentionNode';

export const PlaygroundNodes = [
	HeadingNode,
	ListNode,
	ListItemNode,
	QuoteNode,
	CodeNode,
	// NewTableNode,
	// TableNode,
	// TableCellNode,
	// TableRowNode,
	// HashtagNode,
	CodeHighlightNode,
	AutoLinkNode,
	LinkNode,
	// OverflowNode,
	// PollNode,
	// StickyNode,
	ImageNode,
	InlineImageNode,
	MentionNode,
	EmojiNode,
	// ExcalidrawNode,
	EquationNode,
	AutocompleteNode,
	KeywordNode,
	HorizontalRuleNode,
	// TweetNode,
	// YouTubeNode,
	FigmaNode,
	// MarkNode,
	CollapsibleContainerNode,
	CollapsibleContentNode,
	CollapsibleTitleNode,
	// PageBreakNode,
	LayoutContainerNode,
	LayoutItemNode,
];

export default PlaygroundNodes;
