import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import cls from './FileUploader.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { t } from 'i18next';
import RemoveIconCircle from '@/shared/assets/icons/removeIconCircle.svg'
import { Icon } from '@/shared/ui/Icon';
import { Portal } from '@/shared/ui/Portal/Portal';

export const useFileUploader = () => {
	const { t } = useTranslation()
	// const [fileList, setFileList] = useState<FileList | null>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [isWarningOpen, setIsWarningOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	// const needRender = useRef(true)

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		// VAR: Тут можно добавить окно в котором будет показано, что файлы более 40МБ не были прекреплены
		const filesFromUser = e.target.files
		if (files && filesFromUser) {
			const maxFileSizeMB = 1024 * 1024 * 40 // 40МВ
			const fileNamesInState = files.map(file => file.name)
			let filesFromUserChecked = [...filesFromUser].filter(file => !fileNamesInState.includes(file.name))
			filesFromUserChecked = [...filesFromUserChecked].filter(file => {
				if (file.size > maxFileSizeMB) {
					// setIsWarningOpen(true)
					return false
				}
				return true
			})
			setFiles(prev => [...prev, ...filesFromUserChecked])
		} else if (!filesFromUser) {
			return
		} else {
			setFiles([...filesFromUser])
		}
	};

	useEffect(() => {
		// console.log(files)
	}, [files])


	const handleInputClick = () => {
		// @ts-ignore
		inputRef.current.click()
	}


	const filesRendered = useMemo(() => {
		// if (!needRender.current) return filesRendered
		return files.map((file, i) => {
			const blobURL = URL.createObjectURL(file)
			const onRemove = () => {
				if (i === 0) {
					setFiles(prev => prev.slice(1,))
					return
				}
				if (i === files.length) {
					setFiles(prev => prev.slice(0, files.length - 2))
					return
				}
				const start = files.slice(0, i)
				const end = files.slice(i + 1,)
				setFiles([...start, ...end])
			}
			const removeIcon = (<Icon
				Svg={RemoveIconCircle}
				className={cls.removeButton}
				onClick={onRemove}
				clickable
				width={20}
				height={20}
			/>)
			let content;
			if (file.type.split('/')[0] === 'video') {
				content = <video width={160} height={120} controls src={blobURL}>Your browser does not support the video tag.</video>
			} else if (file.type.split('/')[0] === 'image') {
				content = <img width={160} height={120} src={blobURL} />
			}
			return (
				<li key={i} className={cls.fileContainer} >
					{content}
					{removeIcon}
				</li>)

		})
	}, [files])

	const fileUploaderComponent = (
		<div className={cls.FileUploader} >
			<input
				ref={inputRef}
				accept="image/*, video/*"
				type="file"
				onChange={handleFileChange}
				multiple
				hidden
			/>
			{
				files.length > 0 && (
					<div className={cls.fileListWrapper} >
						<ul className={cls.filesList} >
							{filesRendered}
						</ul>
					</div>
				)}
			<Button onClick={handleInputClick}>{t('add files')}</Button>
			{/* {isWarningOpen && <Portal>
				<div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
				
				</div>
			</Portal>} */}
		</div>
	)

	return { files, fileUploader: fileUploaderComponent }
}



// export const FileUploader = () => {
// 	const { t } = useTranslation()
// 	const [fileList, setFileList] = useState<FileList | null>(null);
// 	const inputRef = useRef<HTMLInputElement>(null)
// 	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		setFileList(e.target.files);
// 	};
// 	const handleInputClick = () => {
// 		// @ts-ignore
// 		inputRef.current.click()
// 	}

// 	// const handleUploadClick = () => {
// 	// 	if (!fileList) {
// 	// 		return;
// 	// 	}

// 	// 	// 👇 Create new FormData object and append files
// 	// 	const data = new FormData();
// 	// 	files.forEach((file, i) => {
// 	// 		data.append(`file-${i}`, file, file.name);
// 	// 	});

// 	// 	// 👇 Uploading the files using the fetch API to the server
// 	// 	alert(`отправка вайлов ${data}`)
// 	// 	// fetch('https://httpbin.org/post', {
// 	// 	// 	method: 'POST',
// 	// 	// 	body: data,
// 	// 	// })
// 	// 	// 	.then((res) => res.json())
// 	// 	// 	.then((data) => console.log(data))
// 	// 	// 	.catch((err) => console.error(err));
// 	// };

// 	// 👇 files is not an array, but it's iterable, spread to get an array of files
// 	const files = fileList ? [...fileList] : [];

// 	return (
// 		<div className={cls.FileUploader} >
// 			<input ref={inputRef} accept="image/*, video/*" type="file" onChange={handleFileChange} multiple hidden />

// 			<ul>
// 				{files.map((file, i) => (
// 					<li key={i}>
// 						{file.name} - {file.type}
// 					</li>
// 				))}
// 			</ul>

// 			<Button onClick={handleInputClick}>{t('add file button')}</Button>
// 		</div>
// 	);
// }