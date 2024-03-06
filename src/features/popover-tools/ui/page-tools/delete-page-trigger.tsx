'use client'

import { usePopoverToolsStore } from '@/shared/store/editable-group-store'
import { XCircle } from 'lucide-react'
import { useRef } from 'react'

type DeletePageTriggerProps = {
	idPage: string
}

export function DeletePageTrigger({ idPage }: DeletePageTriggerProps) {
	const triggerPopoverRefs = useRef<SVGSVGElement | null>(null)

	const {
		setIsOpenPopoverTools,
		setEditableGroup,
		setTypeOpen,
		setIdPage,
		editableGroup,
		isOpenPopoverTools,
	} = usePopoverToolsStore()

	const { editableElement, editableTrigger } = editableGroup

	const onHandleClick = (e: React.MouseEvent<SVGSVGElement>) => {
		// Помечаем с чем работает поповер
		setTypeOpen('delete-page')

		setIdPage(idPage)

		// Убираем outline c предыдущего элемента
		;(editableElement as HTMLElement)?.style.setProperty(
			'outline',
			'none'
		)

		// Убираем outline c текущего элемента(кнопка)
		triggerPopoverRefs.current?.style.setProperty('outline', 'none')

		// Условие закрытия и открытия поповера
		if (!isOpenPopoverTools || editableTrigger === e.target)
			setIsOpenPopoverTools(!isOpenPopoverTools)

		// Сохраняем элемент на который мы нажали.
		setEditableGroup({
			...editableGroup,
			editableTrigger: triggerPopoverRefs.current
		})
	}

	return (
		<div className='absolute top-[-8px] right-0 hover:scale-110 transition-all animate-pulse bg-slate-100 border rounded-xl shadow-xl cursor-pointer'>
			<XCircle
				className='w-[15px] h-[15px] text-slate-950'
				strokeWidth={0.5}
				absoluteStrokeWidth
				data-trigger-popover
				ref={triggerPopoverRefs}
				onClick={(e) => onHandleClick(e)}
				tabIndex={0}
			/>
		</div>
	)
}
