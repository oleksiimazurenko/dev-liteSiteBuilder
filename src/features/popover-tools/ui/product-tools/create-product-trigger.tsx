'use client'

import { usePopoverToolsStore } from '@/shared/store/store'
import { PlusSquare } from 'lucide-react'
import { useRef } from 'react'

type CreateProductTriggerProps = {
	componentId: string
}

export function CreateProductTrigger({ componentId }: CreateProductTriggerProps) {
	const triggerPopoverRefs = useRef<HTMLDivElement | null>(null)

	const {
		setEditableGroup,
		setIsOpenPopoverTools,
		setTypeOpen,
		setIdComponent,
		editableGroup,
		isOpenPopoverTools,
	} = usePopoverToolsStore()

	const { editableElement, editableTrigger } = editableGroup

	const onHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// Помечаем с чем работает поповер
		setTypeOpen('create-product')

		// Убираем outline c предыдущего элемента
		editableElement && (editableElement as HTMLElement)?.style.setProperty(
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

		setIdComponent(componentId)
	}

	return (
		<div
			className='flex justify-center items-center bg-slate-100 border rounded-xl shadow-xl hover:scale-105 transition w-[220px] h-[240px] cursor-pointer'
			data-trigger-popover
			tabIndex={0}
			onClick={(e) => onHandleClick(e)}
			ref={triggerPopoverRefs}
		>
			<PlusSquare
				strokeWidth={0.1}
				absoluteStrokeWidth
				width={100}
				height={100}
			/>
		</div>
	)
}
