/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import {
	$createParagraphNode,
	$createRangeSelection,
	$getSelection,
	$insertNodes,
	$isNodeSelection,
	$isRootOrShadowRoot,
	$setSelection,
	COMMAND_PRIORITY_EDITOR,
	COMMAND_PRIORITY_HIGH,
	COMMAND_PRIORITY_LOW,
	createCommand,
	DRAGOVER_COMMAND,
	DRAGSTART_COMMAND,
	DROP_COMMAND,
	LexicalCommand,
	LexicalEditor,
} from 'lexical';
import { useEffect, useRef, useState } from 'react';
import {
	$createImageNode,
	$isImageNode,
	ImageNode,
	ImagePayload,
} from '../../nodes/ImageNode';
import Button from '../../ui/Button';
import { DialogActions, DialogButtonsList } from '../../ui/Dialog';
import FileInput from '../../ui/FileInput';
import TextInput from '../../ui/TextInput';
import { CAN_USE_DOM } from '../../../shared/canUseDOM';
import yellowFlowerImage from '@/shared/assets/yellow-flower.jpg';

export type InsertImagePayload = Readonly<ImagePayload>;

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
	CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
	createCommand('INSERT_IMAGE_COMMAND');

export function InsertImageUriDialogBody({
	onClick,
}: {
	onClick: (payload: InsertImagePayload) => void;
}) {
	const [src, setSrc] = useState('');
	const [altText, setAltText] = useState('[IMAGE]');

	const isDisabled = src === '';

	return (
		<>
			<TextInput
				label="Image URL"
				placeholder="i.e. https://source.unsplash.com/random"
				onChange={setSrc}
				value={src}
				data-test-id="image-modal-url-input"
			/>
			<TextInput
				label="Alt Text"
				placeholder="Random unsplash image"
				onChange={setAltText}
				value={altText}
				data-test-id="image-modal-alt-text-input"
			/>
			<DialogActions>
				<Button
					data-test-id="image-modal-confirm-btn"
					disabled={isDisabled}
					onClick={() => onClick({ altText, src })}>
					Confirm
				</Button>
			</DialogActions>
		</>
	);
}

export function InsertImageUploadedDialogBody({
	onClick,
}: {
	onClick: (payload: InsertImagePayload) => void;
}) {
	const [src, setSrc] = useState('');
	const [altText, setAltText] = useState('[IMAGE]');

	const isDisabled = src === '';

	// VAR: Тут нужно переделать загрузку изображения, потому что вкладывать 25кв в стейт это плохо
	const loadImage2 = (files: FileList | null) => {
		const url = URL.createObjectURL(files[0])
		setSrc(url)
		fetch(url)
			.then(response => response.blob())
			.then(blob => {
				const size = blob.size
				console.log(size)
				return blob.arrayBuffer()
			})
			// .then(blob => blob.arrayBuffer())
			.then(arrayBuffer => {
				const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
				console.log(base64)
				// localStorage.setItem('image', base64);
			});
		// fetch(url)
		// 	.then(response => response.blob())
		// 	.then(blob => {
		// 		// Создайте новый объект File из blob
		// 		const file = new File([blob], 'filename.ext', { type: blob.type });
		// 		console.log(file)
		// 	})
	};

	// Изначальная функция загрузки изображения
	const loadImage = (files: FileList | null) => {
		// const url = URL.createObjectURL(files[0])
		// setSrc(url)
		const reader = new FileReader();
		reader.onload = function () {
			if (typeof reader.result === 'string') {
				const stringLength = reader.result.length;
				const byteSize = 4 * Math.ceil((stringLength / 3)) * 0.75; // 0.75 - это коэффициент коррекции для символов '=' в конце строки base64

				// Переводим размер в килобайты
				const sizeInKilobytes = byteSize / 1024;

				console.log(`Размер строки: ${sizeInKilobytes.toFixed(2)} KB`);
				setSrc(reader.result);
			}
			return '';
		};
		if (files !== null) {
			reader.readAsDataURL(files[0]);
		}
	};
	const loadImage3 = (files: FileList | null) => {
		if (files === null) return;

		const file = files[0];
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'test_upload_present'); // Замените 'your_preset_here' на имя вашей предустановки

		fetch('https://api.cloudinary.com/v1_1/dntzjcvfh/image/upload', {
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.then(data => {
				if (data.secure_url) {
					console.log('Image uploaded successfully: ', data.secure_url);
					setSrc(data.secure_url); // Обновляем состояние компонента с URL загруженного изображения
				}
			})
			.catch(error => {
				console.error('Error uploading image: ', error);
			});
	};

	return (
		<>
			<FileInput
				label="Image Upload"
				onChange={loadImage3}
				accept="image/*"
				data-test-id="image-modal-file-upload"
			/>
			<TextInput
				label="Alt Text"
				placeholder="Descriptive alternative text"
				onChange={setAltText}
				value='[IMAGE]'
				// value={altText}
				data-test-id="image-modal-alt-text-input"
			/>
			<DialogActions>
				<Button
					data-test-id="image-modal-file-upload-btn"
					disabled={isDisabled}
					onClick={() => onClick({ altText, src })}>
					Confirm
				</Button>
			</DialogActions>
		</>
	);
}

export function InsertImageDialog({
	activeEditor,
	onClose,
}: {
	activeEditor: LexicalEditor;
	onClose: () => void;
}): JSX.Element {
	const [mode, setMode] = useState<null | 'url' | 'file'>(null);
	const hasModifier = useRef(false);

	useEffect(() => {
		hasModifier.current = false;
		const handler = (e: KeyboardEvent) => {
			hasModifier.current = e.altKey;
		};
		document.addEventListener('keydown', handler);
		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, [activeEditor]);

	const onClick = (payload: InsertImagePayload) => {
		activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
		onClose();
	};

	return (
		<>
			{!mode && (
				<DialogButtonsList>
					<Button
						data-test-id="image-modal-option-sample"
						onClick={() =>
							onClick(
								hasModifier.current
									? {
										altText:
											'Daylight fir trees forest glacier green high ice landscape',
										src: yellowFlowerImage,
									}
									: {
										altText: 'Yellow flower in tilt shift lens',
										src: yellowFlowerImage,
									},
							)
						}>
						Sample
					</Button>
					<Button
						data-test-id="image-modal-option-url"
						onClick={() => setMode('url')}>
						URL
					</Button>
					<Button
						data-test-id="image-modal-option-file"
						onClick={() => setMode('file')}>
						File
					</Button>
				</DialogButtonsList>
			)}
			{mode === 'url' && <InsertImageUriDialogBody onClick={onClick} />}
			{mode === 'file' && <InsertImageUploadedDialogBody onClick={onClick} />}
		</>
	);
}

export default function ImagesPlugin({
	captionsEnabled,
}: {
	captionsEnabled?: boolean;
}): JSX.Element | null {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		if (!editor.hasNodes([ImageNode])) {
			throw new Error('ImagesPlugin: ImageNode not registered on editor');
		}

		return mergeRegister(
			editor.registerCommand<InsertImagePayload>(
				INSERT_IMAGE_COMMAND,
				(payload) => {
					const imageNode = $createImageNode(payload);
					$insertNodes([imageNode]);
					if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
						$wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
					}

					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			),
			editor.registerCommand<DragEvent>(
				DRAGSTART_COMMAND,
				(event) => {
					return onDragStart(event);
				},
				COMMAND_PRIORITY_HIGH,
			),
			editor.registerCommand<DragEvent>(
				DRAGOVER_COMMAND,
				(event) => {
					return onDragover(event);
				},
				COMMAND_PRIORITY_LOW,
			),
			editor.registerCommand<DragEvent>(
				DROP_COMMAND,
				(event) => {
					return onDrop(event, editor);
				},
				COMMAND_PRIORITY_HIGH,
			),
		);
	}, [captionsEnabled, editor]);

	return null;
}

const TRANSPARENT_IMAGE =
	'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const img = document.createElement('img');
img.src = TRANSPARENT_IMAGE;
img.alt = '[IMAGE]'

function onDragStart(event: DragEvent): boolean {
	const node = getImageNodeInSelection();
	if (!node) {
		return false;
	}
	const dataTransfer = event.dataTransfer;
	if (!dataTransfer) {
		return false;
	}
	dataTransfer.setData('text/plain', '_');
	dataTransfer.setDragImage(img, 0, 0);
	dataTransfer.setData(
		'application/x-lexical-drag',
		JSON.stringify({
			data: {
				altText: node.__altText,
				caption: node.__caption,
				height: node.__height,
				key: node.getKey(),
				maxWidth: node.__maxWidth,
				showCaption: node.__showCaption,
				src: node.__src,
				width: node.__width,
			},
			type: 'image',
		}),
	);

	return true;
}

function onDragover(event: DragEvent): boolean {
	const node = getImageNodeInSelection();
	if (!node) {
		return false;
	}
	if (!canDropImage(event)) {
		event.preventDefault();
	}
	return true;
}

function onDrop(event: DragEvent, editor: LexicalEditor): boolean {
	const node = getImageNodeInSelection();
	if (!node) {
		return false;
	}
	const data = getDragImageData(event);
	if (!data) {
		return false;
	}
	event.preventDefault();
	if (canDropImage(event)) {
		const range = getDragSelection(event);
		node.remove();
		const rangeSelection = $createRangeSelection();
		if (range !== null && range !== undefined) {
			rangeSelection.applyDOMRange(range);
		}
		$setSelection(rangeSelection);
		editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
	}
	return true;
}

function getImageNodeInSelection(): ImageNode | null {
	const selection = $getSelection();
	if (!$isNodeSelection(selection)) {
		return null;
	}
	const nodes = selection.getNodes();
	const node = nodes[0];
	return $isImageNode(node) ? node : null;
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
	const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
	if (!dragData) {
		return null;
	}
	const { type, data } = JSON.parse(dragData);
	if (type !== 'image') {
		return null;
	}

	return data;
}

declare global {
	interface DragEvent {
		rangeOffset?: number;
		rangeParent?: Node;
	}
}

function canDropImage(event: DragEvent): boolean {
	const target = event.target;
	return !!(
		target &&
		target instanceof HTMLElement &&
		!target.closest('code, span.editor-image') &&
		target.parentElement &&
		target.parentElement.closest('div.ContentEditable__root')
	);
}

function getDragSelection(event: DragEvent): Range | null | undefined {
	let range;
	const target = event.target as null | Element | Document;
	const targetWindow =
		target == null
			? null
			: target.nodeType === 9
				? (target as Document).defaultView
				: (target as Element).ownerDocument.defaultView;
	const domSelection = getDOMSelection(targetWindow);
	if (document.caretRangeFromPoint) {
		range = document.caretRangeFromPoint(event.clientX, event.clientY);
	} else if (event.rangeParent && domSelection !== null) {
		domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
		range = domSelection.getRangeAt(0);
	} else {
		throw Error('Cannot get the selection when dragging');
	}

	return range;
}
