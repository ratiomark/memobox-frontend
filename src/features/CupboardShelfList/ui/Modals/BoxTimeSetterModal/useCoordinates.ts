import { BoxCoordinates } from '@/entities/Box';
import { idCupboardShelfList, idTimeSetterHidden } from '@/shared/const/idsAndDataAttributes';
import { ResultTypeFrom } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { useEffect, useMemo, useRef, useState } from 'react';

const useHeaderCupboardTimeSetterSizes = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const headerHeight = useRef(0);
	const timeSetterSizes = useRef({ height: 0, width: 0 });
	const cupboardShelfListRects = useRef({ x: 0, y: 0, width: 0 })

	useEffect(() => {
		const loadSizes = () => {
			const header = document.querySelector('header') as HTMLDivElement
			headerHeight.current = header.clientHeight
			const timeSetter = document.querySelector(`#${idTimeSetterHidden}`) as HTMLDivElement
			const timeSetterRect = timeSetter.getBoundingClientRect()
			timeSetterSizes.current.height = timeSetterRect.height
			timeSetterSizes.current.width = timeSetterRect.width
			// console.log(timeSetterSizes.current)
			const cupboardShelfList = document.querySelector(`#${idCupboardShelfList}`) as HTMLDivElement
			const cupboardShelfListSizes = cupboardShelfList.getBoundingClientRect()
			cupboardShelfListRects.current.x = cupboardShelfListSizes.x
			cupboardShelfListRects.current.y = cupboardShelfListSizes.y
			cupboardShelfListRects.current.width = cupboardShelfListSizes.width
			setIsLoaded(true);
		}
		if (document.readyState === 'complete') {
			loadSizes();
		} else {
			window.addEventListener('load', loadSizes);
			return () => window.removeEventListener('load', loadSizes);
		}
	}, []);

	const sizes = useMemo(() => {
		if (isLoaded) {
			return ({
				headerHeight: headerHeight.current,
				timeSetterSizes: timeSetterSizes.current,
				cupboardShelfListRects: cupboardShelfListRects.current,
			})
		}
		return null
	}, [isLoaded])

	return sizes
};

type SizesType = ReturnType<typeof useHeaderCupboardTimeSetterSizes>;

// export const useCoordinates = (coordinates: BoxCoordinates, sizes: SizesType) => {
const useCoordinates = (coordinates: BoxCoordinates) => {
	const sizes = useHeaderCupboardTimeSetterSizes()
	const [coordinatesChecked, setCoordinatesChecked] = useState(coordinates)

	useEffect(() => {
		if (!sizes) return

		const {
			headerHeight,
			cupboardShelfListRects,
			timeSetterSizes
		} = sizes
		const coordinatesHeightCorrection = timeSetterSizes.height / 2
		const coordinatesWidthCorrection = timeSetterSizes.width / 2
		const viewPortHeight = window.innerHeight
		let actualX = coordinates.x - coordinatesWidthCorrection
		const containerEdge = cupboardShelfListRects.x + cupboardShelfListRects.width
		if (actualX + timeSetterSizes.width > containerEdge) {
			actualX = (containerEdge - timeSetterSizes.width)
		} else if (actualX < cupboardShelfListRects.x) {
			actualX = cupboardShelfListRects.x
		}
		let actualY = coordinates.y - coordinatesHeightCorrection
		if (actualY < headerHeight) {
			actualY = headerHeight
		} else if (actualY + timeSetterSizes.height > viewPortHeight) {
			actualY = viewPortHeight - timeSetterSizes.height
		}
		setCoordinatesChecked({ y: actualY, x: actualX })
	}, [coordinates, sizes])

	return coordinatesChecked
};
export default useCoordinates