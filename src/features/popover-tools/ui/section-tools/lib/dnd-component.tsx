'use client'

import { sortComponents } from '@/shared/actions/element/set/sort-components'
import {
	typeCurrentItemsDND,
	useActiveDNDComponentStore,
} from '@/shared/store/store'
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd'
import cn from 'classnames'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type DNDProps = {
	items: typeCurrentItemsDND[]
}

export function DNDComponent({ items }: DNDProps) {
	const [currentItems, setDNDItems] = useState<typeCurrentItemsDND[]>(items)
	const [isMounted, setIsMounted] = useState(false)
	const pathName = usePathname()
	const { isActive } = useActiveDNDComponentStore()

	useEffect(() => {
		if (isActive) {
			setDNDItems(items)
			setIsMounted(true)
		}
	}, [items, setDNDItems, isActive])

	if (!isActive) return items.map(item => item.content)

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return
		}

		const reorderedItems = reorder(
			currentItems,
			result.source.index,
			result.destination.index
		)

		;(async () => {
			const response = await sortComponents({
				currentItems: reorderedItems.map(item => ({ id: item.id })),
				rPath: pathName,
			})
			response.success && toast.success('Sort success')
			response.error && toast.error(response.error)
		})()

		setDNDItems(reorderedItems)
	}

	// Функция для переупорядочивания элементов
	const reorder = (
		list: typeCurrentItemsDND[],
		startIndex: number,
		endIndex: number
	): typeCurrentItemsDND[] => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
		const parentElement = e.currentTarget as Element
		parentElement?.classList.add('border', 'border-blue-500', 'rounded-md')
	}

	const onMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
		const parentElement = e.currentTarget as Element
		parentElement?.classList.remove('border', 'border-blue-500', 'rounded-md')
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{isMounted ? (
				<Droppable droppableId='droppable'>
					{provided => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className='!w-full'
						>
							{currentItems.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={cn(
												'relative flex flex-col items-center justify-center hover:cursor-grab'
											)}
											onMouseOver={onMouseOver}
											onMouseOut={onMouseOut}
										>
											{item.content}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			) : null}
		</DragDropContext>
	)
}

// const grabTriggerRef = useRef<HTMLDivElement | null>(null)

// const setAnimationGrab = (element: HTMLDivElement | null) => {
// 	if (element) {
// 		// Удаляем предыдущие границы, если они есть
// 		element
// 			.querySelectorAll('.border-animation')
// 			.forEach(border => border.remove())

// 		// Создаем границы
// 		const borders = ['top', 'right', 'bottom', 'left'].map(side =>
// 			createBorder(side as 'top' | 'bottom' | 'left' | 'right')
// 		)
// 		borders.forEach(border => element.appendChild(border))

// 		// Инициализация GSAP Timeline
// 		const tl = gsap.timeline({ paused: true })

// 		// Длительность анимации каждой стороны
// 		const durationCorner = 0.001
// 		const durationLongLine = 0.2
// 		const durationShortLine = 0.3

// 		// Верх
// 		tl.to(borders[0], { width: '100%', duration: durationLongLine }, 0)

// 		// Право, начинается после завершения анимации верха
// 		tl.to(
// 			borders[1],
// 			{ height: '100%', duration: durationShortLine },
// 			`+=${durationCorner}`
// 		)

// 		// Низ, начинается после завершения анимации правой стороны
// 		tl.to(
// 			borders[2],
// 			{ width: '100%', duration: durationLongLine, left: '0' },
// 			`+=${durationCorner}`
// 		)

// 		// Лево, начинается после завершения анимации нижней стороны
// 		tl.to(
// 			borders[3],
// 			{ height: '100%', duration: durationShortLine, top: '0' },
// 			`+=${durationCorner}`
// 		)

// 		// События мыши
// 		element.onmouseenter = () => tl.restart()
// 		element.onmouseleave = () => tl.reverse()
// 	}
// }

// // Функция создания границ
// function createBorder(side: 'top' | 'bottom' | 'left' | 'right') {
// 	const border = document.createElement('div')
// 	border.className = 'border-animation' // Добавляем класс для стилей и возможности очистки
// 	border.style.position = 'absolute'
// 	border.style.backgroundColor = '#3498db'
// 	border.style.zIndex = '10' // Убедитесь, что граница видна поверх элемента, если это необходимо

// 	// Определение стилей для каждой стороны
// 	switch (side) {
// 		case 'top':
// 			border.style.height = '0.5px'
// 			border.style.width = '0%' // Начинаем с нулевой ширины
// 			border.style.top = '0'
// 			border.style.left = '0'
// 			break
// 		case 'right':
// 			border.style.width = '0.5px'
// 			border.style.height = '0%' // Начинаем с нулевой высоты
// 			border.style.top = '0' // Стартуем с верха
// 			border.style.right = '0'
// 			break
// 		case 'bottom':
// 			border.style.height = '0.5px'
// 			border.style.width = '0%' // Начинаем с нулевой ширины
// 			border.style.bottom = '0'
// 			border.style.right = '0' // Для анимации справа налево
// 			break
// 		case 'left':
// 			border.style.width = '0.5px'
// 			border.style.height = '0%' // Начинаем с нулевой высоты
// 			border.style.bottom = '0' // Стартуем с низа
// 			border.style.left = '0'
// 			break
// 	}

// 	return border
// }
