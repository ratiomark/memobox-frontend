import { useSelector } from "react-redux"
import { getBoxesTemplateModalIsOpen } from "../../model/selectors/getShelfBoxesTemplateModal"
import { lazy } from "react"
const ShelfBoxesTemplateModalLazy = lazy(()=>'./ShelfTemplateSettings.tsx')
export const ShelfBoxesTemplateModal = () => {
	const isOpen = useSelector(getBoxesTemplateModalIsOpen)

}
// export const ShelfBoxesTemplateModal = () => {
// 	const isOpen = useSelector(getBoxesTemplateModalIsOpen)
// 	isOpen
// }