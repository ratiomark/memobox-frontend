import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import cls from './FileUploader.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { t } from 'i18next';

export const useFileUploader = () => {
	const { t } = useTranslation()
	const [fileList, setFileList] = useState<FileList | null>(null);
	const [ff, setFf] = useState<File[]>([]);
	const inputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFileList(e.target.files);
		const files = e.target.files
		setFf(files ? [...files] : [])
	};

	const handleInputClick = () => {
		// @ts-ignore
		inputRef.current.click()
	}

	const files = fileList ? [...fileList] : [];

	// const fn = () => {
	// 	document.getElementById('videoUpload').onchange = function (event) {
	// 		const file = event.target.files[0];
	// 		const blobURL = URL.createObjectURL(file);
	// 		document.querySelector('video').src = blobURL
	// 	}
	// }
	useEffect(() => {
		console.log('FF :', ff)
		console.log('FileList  ', fileList)
	}, [ff, fileList])


	const filesRendered = useMemo(() => {
		return ff.map((file, i) => {
			const onRemove = () => {
				if (i === 0) {
					setFf(prev => prev.slice(1,))
					return
				}
				if (i === ff.length) {
					setFf(prev => prev.slice(0, ff.length - 2))
					return
				}
				const start = ff.slice(0, i)
				const end = ff.slice(i + 1,)
				setFf([...start, ...end])
			}
			if (file.type.split('/')[0] === 'video') {
				const blobURL = URL.createObjectURL(file)
				const video = <video width={320} height={240} controls src={blobURL}>Your browser does not support the video tag.</video>
				return (
					<VStack>
						{video}
						<Button onClick={onRemove}>x</Button>
					</VStack>)
			}
			if (file.type.split('/')[0] === 'image') {
				const blobURL = URL.createObjectURL(file)
				const image = <img width={320} height={240} src={blobURL} />
				return (
					<VStack>
						{image}
						<Button onClick={onRemove}>x</Button>
					</VStack>)
			}
		})
	}, [ff])

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

			<ul>
				{filesRendered}
				{/* {files.map((file, i) => (
					<li key={i}>
						{file.name} - {file.type}
					</li>
				))} */}
			</ul>

			<Button onClick={handleInputClick}>{t('Добавить')}</Button>
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