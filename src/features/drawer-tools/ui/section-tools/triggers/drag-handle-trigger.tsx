import { DraggableProvided } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'

type SectionPanelToolsProps = {
	provided: DraggableProvided
}

export function DragHandleTrigger({ provided }: SectionPanelToolsProps) {
	return (
		<div {...provided.dragHandleProps}>
			<GripVertical
				size={48}
				strokeWidth={0.5}
				className='hover:scale-125 transition-all py-[5px] hover:cursor-grab'
			/>
		</div>
	)
}
