/* eslint-disable custom-fsd-checker-plugin/layer-import-sequence */
import { t } from 'i18next';

import { BoxSchema, getTiming} from '@/entities/Box';
import { ListBoxItem } from '@/shared/ui/Popup/ui/ListBox/ListBox';

export const mapBoxesToListItems = (boxes?: BoxSchema[]): ListBoxItem<string>[] => {
	return boxes?.map(box => {
		let content;
		switch (box.specialType) {
			case 'none':
				content = `${t('box text')} ${box.index} - ${getTiming(box.timing)}`
				break
			case 'new':
				content = t('new cards')
				break
			case 'learnt':
				content = `${t('learnt cards')} - ${getTiming(box.timing)}`
				break
		}
		return { value: box.id, content }
	}) || []
}