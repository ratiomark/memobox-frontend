import { useRef } from 'react';
import imageIcon from '../images/icons/imageUploadIcon.svg'
// import imageIcon from '../images/icons/image-1-svgrepo-com.svg'
import { iconSizeEditor } from '@/shared/const/iconSizes';
import { Icon } from '@/shared/ui/Icon';
import { t } from 'i18next';
type ImageUploadButtonProps = {
	onImageUpload: (file: File) => void;
	disabled?: boolean;
	children?: React.ReactNode;
};

export function ImageUploadButton({
	onImageUpload,
	disabled = false,
	children,
}: ImageUploadButtonProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onImageUpload(file);
		}
		e.target.value = '';
	};

	return (
		<>

			<Icon
				clickable
				onClick={handleClick}
				buttonProps={{
					disabled: disabled,
					// title: t(buttonTitles.image),
					title: t('image upload'),
					tabIndex: -1,
					id: 'toolbar_image_button',
					type: 'button',
					// onClick: handleClick,
				}}
				withFill={false}
				type={'hint'}
				width={iconSizeEditor}
				height={iconSizeEditor}
				Svg={imageIcon}
			/>
			{/* <button type="button" style={{all:'unset'}} onClick={handleClick} disabled={disabled}>
				{children}
			</button> */}
			<input
				type="file"
				accept="image/*"
				ref={inputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
		</>
	);
}