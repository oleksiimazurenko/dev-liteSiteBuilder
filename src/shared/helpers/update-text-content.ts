import { toast } from 'sonner'
import { updateElement } from '../actions/element/set/update-element'

const updateTextContent = async (
	element: HTMLElement | SVGSVGElement,
	pathName: string,
	key: string
) => {
	const id = element?.getAttribute('data-id')
	const value = (element as HTMLElement)?.textContent
	if (!id) return console.error('Element id not found')

	const schemaPrismaArray = ['component', 'section']

	const hasPrismaAttribute = schemaPrismaArray.some(attribute =>
		element?.hasAttribute(`data-${attribute}`)
	)

	if (hasPrismaAttribute) {
		const { success } = await updateElement(
			id,
			schemaPrismaArray.find(attribute =>
				element?.hasAttribute(`data-${attribute}`)
			) || '',
			key,
			value,
			pathName
		)
		success
			? toast.success('Database updated')
			: toast.error(
					`Database not updated, problem found in file update-inline-styles.ts on line 56`
			  )
	} else {
		toast.error(
			'Database not updated, problem found in file update-inline-styles.ts on line 58'
		)
	}
}

export { updateTextContent }
