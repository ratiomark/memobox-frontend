import { Skeleton } from '../Skeleton'

export const TextEditorSkeleton = ({ editorMinHeight }: { editorMinHeight: number }) => {
	return (
		<div style={{ maxWidth: 1200, borderRadius: 4, overflow: 'hidden' }}>
			<Skeleton
				width={1200}
				borderRadius='4px'
				height={editorMinHeight} />
		</div>
	)
}