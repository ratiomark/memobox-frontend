import React, { useState, useEffect, useCallback } from 'react';
import cls from './UiColorCustomizer.module.scss'; // Предполагается, что вы уже имеете эти стили
import { getAppRoot, getAppNode } from '@/shared/lib/helpers/DOM/getAppRoot';
import { HexAlphaColorPicker, HexColorPicker, RgbaColor, RgbaColorPicker } from 'react-colorful';

const YourComponent = () => {
	const [color, setColor] = useState('#aabbcc');
	return <HexColorPicker color={color} onChange={setColor} />;
};
interface UiColorCustomizerProps {
	entityName: string;
	cssProperty: string;
}

export const UiColorCustomizer: React.FC<UiColorCustomizerProps> = ({ entityName, cssProperty }) => {
	const getInitialColor = useCallback(() => {
		const root = getAppNode();
		const color = getComputedStyle(root).getPropertyValue(cssProperty).trim() || '#ffffff'; // Белый цвет по умолчанию
		return color;
	}, [cssProperty]);

	const [color, setColor] = useState<string>('rgba(255, 255, 255, 1)');

	useEffect(() => {
		const initialColor = getInitialColor();
		setColor(initialColor);
	}, [getInitialColor]);

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value;
		setColor(newColor);
		getAppNode().style.setProperty(cssProperty, newColor);
	};
	const handleColorRgba = (color: RgbaColor) => {
		console.log(color)
		const rgbaColor = `rgba(${color.r ?? 0}, ${color.g ?? 0}, ${color.b ?? 0}, ${color.a ?? 1})`;
		setColor(rgbaColor);
		getAppNode().style.setProperty(cssProperty, rgbaColor);
	};
	const handleColorHex = (color: string) => {
		setColor(color);
		getAppNode().style.setProperty(cssProperty, color);
	};

	return (
		<div className={cls.container}>
			<h3>{entityName}</h3>
			<HexAlphaColorPicker color={color} onChange={handleColorHex} />
			{/* <input
				type="color"
				value={color}
				onChange={handleColorChange}
				className={cls.colorPicker}
			/> */}
		</div>
	);
};