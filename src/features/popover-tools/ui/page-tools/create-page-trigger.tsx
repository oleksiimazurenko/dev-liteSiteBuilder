'use client'

import { usePopoverToolsStore } from '@/shared/store/store'
import { PlusSquare } from 'lucide-react'
import { useRef } from 'react'

export function CreatePageTrigger() {

	const triggerPopoverRefs = useRef<(SVGSVGElement | null)>(null)

	const {
		setEditableGroup,
		setIsOpenPopoverTools,
		setTypeOpen,
		editableGroup,
		isOpenPopoverTools,
	} = usePopoverToolsStore()

	const { editableElement, editableTrigger } = editableGroup

	const onHandleClick = (e: React.MouseEvent<SVGSVGElement>) => {
		// Помечаем с чем работает поповер
		setTypeOpen('create-page')

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
		<div className='cursor-pointer ml-[20px] animate-pulse hover:scale-125 transition-all bg-slate-100 border rounded-sm shadow-xl'>
			<PlusSquare
				data-trigger-popover
				ref={triggerPopoverRefs}
				onClick={(e) => onHandleClick(e)}
				tabIndex={0}
				strokeWidth={0.5}
				absoluteStrokeWidth
				className='z-40 text-slate-950'
			/>
		</div>
	)
}
