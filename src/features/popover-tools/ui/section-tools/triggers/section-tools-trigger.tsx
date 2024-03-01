'use client'

import { usePopoverToolsStore } from '@/shared/store/store'
import { Settings } from 'lucide-react'
import { forwardRef } from 'react'

type SectionToolsTriggerProps = {
	id: string
}

const SectionToolsTrigger = forwardRef<SVGSVGElement, SectionToolsTriggerProps>(
	({ id }, ref) => {
		const {
			setEditableGroup,
			setIsOpenPopoverTools,
			setTypeOpen,
			editableGroup,
			isOpenPopoverTools,
		} = usePopoverToolsStore()

		const { editableElement, editableTrigger  } = editableGroup

		const onHandleClick = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
			// Устанавливаем тип открытия поповера
			setTypeOpen('section')

			// Убираем outline c предыдущего элемента
			;(editableElement as HTMLElement)?.style.setProperty(
				'outline',
				'none'
			)
			
			// Убираем outline c кнопки
			e.currentTarget?.style.setProperty('outline', 'none')

			if (!isOpenPopoverTools || editableTrigger === e.target ) setIsOpenPopoverTools(!isOpenPopoverTools)

			// Сохраняем элемент над которым производились изменения
			setEditableGroup({
				editableElement: document.querySelector(`[data-id="${id}"]`),
				editableTrigger: e.target as SVGSVGElement,
			})
		}

		return (
			<Settings
				data-trigger-tools
				size={48}
				strokeWidth={0.5}
				tabIndex={0}
				className='hover:scale-125 transition-all cursor-pointer'
				onClick={e => onHandleClick(e, id)}
			/>
		)
	}
)

SectionToolsTrigger.displayName = 'TriggerPopoverTools'

export { SectionToolsTrigger }
