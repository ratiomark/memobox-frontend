import cls from './HiddenTemplatesStyles.module.scss'
import { TimeSetter } from '@/shared/ui/TimeSetter'

export const TimeSetterHiddenTemplate = () => {
	return (<div className={cls.timeSetterTemplateHidden} >
		<TimeSetter
			onClose={() => { }}
			onSaveTime={() => { }}
		/>
	</div>)
}