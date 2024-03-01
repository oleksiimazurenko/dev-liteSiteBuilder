'use client'

import { DraggableProvided } from '@hello-pangea/dnd'
import cn from 'classnames'
import { CreateElementTrigger } from './triggers/create-element-trigger'
import { DragHandleTrigger } from './triggers/drag-handle-trigger'
import { SectionToolsTrigger } from './triggers/section-tools-trigger'

type SectionPanelToolsProps = {
	id: string
	provided: DraggableProvided
}

export function SectionPanelTools({ id, provided }: SectionPanelToolsProps) {
	return (
		<div
			className='absolute bottom-8 right-6 p-2 bg-slate-100 border rounded-xl shadow-xl'
			key={id}
		>
			{/* Кнопка для перетаскивания секций */}
			<DragHandleTrigger provided={provided} />

			{/*Кнопка для открытия поповера настроек секции*/}
			<SectionToolsTrigger id={id} />

			{/* Кнопка для создания элементов */}
			<CreateElementTrigger id={id} />
		</div>
	)
}
