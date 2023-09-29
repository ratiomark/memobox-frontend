import { dataAttrTimeSetterSingle } from '@/shared/const/idsAndDataAttributes'
import { useEffect } from 'react'

let singleSetterMaxWidth: number | boolean;
let lastLang: string;

const useSingleSettersWidth = (currentLang: string) => {
	useEffect(() => {
		const singleSetters = document.querySelectorAll(`[data-time-setter="${dataAttrTimeSetterSingle}"]`) as NodeListOf<HTMLDivElement>
		if (lastLang !== currentLang) {
			lastLang = currentLang
			singleSetters.forEach(div => div.style.minWidth = 'auto')
			singleSetterMaxWidth = false
		}
		if (!singleSetterMaxWidth) {
			const singleSettersWidthList: number[] = []
			singleSetters.forEach(button => singleSettersWidthList.push(button.clientWidth))
			singleSetterMaxWidth = Math.ceil(Math.max(...singleSettersWidthList))
		}
		singleSetters.forEach(div => div.style.minWidth = `${singleSetterMaxWidth as number + 2}px`)
	}, [currentLang])
}
export default useSingleSettersWidth