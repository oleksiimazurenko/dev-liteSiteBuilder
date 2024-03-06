'use client'


import { usePopoverToolsStore } from '@/shared/store/editable-group-store'
import { PlusSquare, Settings } from 'lucide-react'
import { forwardRef, useRef } from 'react'

type SectionToolsTriggerProps = {
	id: string
}

const CreateElementTrigger = forwardRef<
	SVGSVGElement,
	SectionToolsTriggerProps
>(({id}, ref) => {
	const {
		setEditableGroup,
		setIsOpenPopoverTools,
		setTypeOpen,
		editableGroup,
		isOpenPopoverTools,
	} = usePopoverToolsStore()

	const { editableElement, editableTrigger  } = editableGroup

	const onHandleClick = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
		// Помечаем с чем работает поповер
		setTypeOpen('create-element')

		// Убираем outline c предыдущего элемента
		;(editableElement as HTMLElement)?.style.setProperty(
			'outline',
			'none'
		)

		// Убираем outline c текущего элемента(кнопка)
		;(e.target as HTMLElement)?.style.setProperty('outline', 'none')

		if (!isOpenPopoverTools || editableTrigger === e.target ) setIsOpenPopoverTools(!isOpenPopoverTools)

		// Сохраняем элемент на который мы нажали.
		setEditableGroup({
			editableElement: document.querySelector(`[data-id="${id}"]`),
			editableTrigger: e.target as SVGSVGElement,
		})

	}

	return (
		<PlusSquare
			data-trigger-tools
			onClick={(e) => onHandleClick(e, id)}
			width={50}
			height={50}
			tabIndex={0}
			strokeWidth={0.5}
			absoluteStrokeWidth
			className='text-slate-950 cursor-pointer hover:scale-125 transition-all mt-1'
		/>
	)
})

CreateElementTrigger.displayName = 'CreateElementTrigger'

export { CreateElementTrigger }
