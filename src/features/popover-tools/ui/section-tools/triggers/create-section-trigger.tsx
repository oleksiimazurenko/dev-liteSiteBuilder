'use client'

import { usePopoverToolsStore } from '@/shared/store/editable-group-store'
import { PlusSquare } from 'lucide-react'

export function CreateSectionTrigger() {
	const {
		setEditableGroup,
		setIsOpenPopoverTools,
		setTypeOpen,
		editableGroup,
		isOpenPopoverTools,
	} = usePopoverToolsStore()

	const { editableElement, editableTrigger } = editableGroup

	const onHandleClick = (e: React.MouseEvent<SVGSVGElement>) => {
		// Устанавливаем тип открытия поповера
		setTypeOpen('create-section')

		// Убираем outline c предыдущего элемента
		;(editableElement as HTMLElement)?.style.setProperty('outline', 'none')

		// Убираем outline c кнопки
		e.currentTarget?.style.setProperty('outline', 'none')

		if (!isOpenPopoverTools || editableTrigger === e.target)
			setIsOpenPopoverTools(!isOpenPopoverTools)

		// Сохраняем элемент над которым производились изменения
		setEditableGroup({
			...editableGroup,
			editableTrigger: e.target as SVGSVGElement,
		})
	}

	return (
		<div className='cursor-pointer mr-[30px] bg-slate-100 border rounded-br-sm rounded-bl-sm shadow-xl w-[52.5px] justify-self-end'>
			<PlusSquare
				data-trigger-popover
				onClick={e => onHandleClick(e)}
				tabIndex={0}
				strokeWidth={0.5}
				absoluteStrokeWidth
				className='z-40 text-slate-950 w-[50px] h-[50px] hover:scale-105 transition-all animate-pulse'
			/>
		</div>
	)
}
