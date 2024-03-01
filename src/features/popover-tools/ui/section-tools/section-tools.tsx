'use client'

import { usePopoverToolsStore } from '@/shared/store/store'
import { ToggleGroup } from '@/shared/ui/toggle-group'
import { BGColorTools } from '../tools/bg-color-tools'
import { BorderRadiusTool } from '../tools/border-radius-tool'
import { ChangeBackgroundImage } from '../tools/change-background-image'
import { PaddingTool } from '../tools/padding-tool'
import { DeleteSection } from './modal/delete-section'
import { ToggleElementDND } from './tools/toggle-element-dnd'

type SectionToolsProps = {}

export function SectionTools({}: SectionToolsProps) {
	const { typeOpen, editableGroup } = usePopoverToolsStore()
	const { editableElement, editableTrigger } = editableGroup

	return (
		<ToggleGroup type='multiple' rovingFocus={false} className='flex-wrap'>
			<DeleteSection currentElement={editableElement} />

			<BGColorTools currentElement={editableElement} />

			<BorderRadiusTool currentElement={editableElement} />

			<PaddingTool currentElement={editableElement} />

			<ChangeBackgroundImage currentElement={editableElement} />

			<ToggleElementDND />
		</ToggleGroup>
	)
}
