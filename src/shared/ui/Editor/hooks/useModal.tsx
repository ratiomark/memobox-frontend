import { useCallback, useMemo, useState } from 'react';
import * as React from 'react';
import { EditorMiniModal } from '../ui/modal/Modal';
import { EmptyFn } from '@/shared/types/GeneralTypes';

type ShowModalFn = (
	title: string,
	showModal: (onClose: EmptyFn) => JSX.Element
) => void

type UseEditorMiniResult = [
	JSX.Element | null,
	ShowModalFn
]
export function useEditorMiniModal(): UseEditorMiniResult {
	const [modalContent, setModalContent] = useState<null | {
		closeOnClickOutside: boolean;
		content: JSX.Element;
		title: string;
	}>(null);

	const onClose = useCallback(() => {
		setModalContent(null);
	}, []);

	const modal = useMemo(() => {
		if (modalContent === null) {
			return null;
		}
		const { title, content, closeOnClickOutside } = modalContent;
		return (
			<EditorMiniModal
				onClose={onClose}
				title={title}
				closeOnClickOutside={closeOnClickOutside}>
				{content}
			</EditorMiniModal>
		);
	}, [modalContent, onClose]);

	// eslint-disable-next-line no-shadow 
	const showModal = useCallback((title: string, getContent: (onClose: EmptyFn) => JSX.Element, closeOnClickOutside = false,) => {
		setModalContent({
			closeOnClickOutside,
			content: getContent(onClose),
			title,
		});
	}, [onClose]);

	return [modal, showModal];
}
