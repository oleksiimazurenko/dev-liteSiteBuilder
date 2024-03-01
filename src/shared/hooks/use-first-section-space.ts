import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { getIdFirstSection } from '../actions/section/get/get-id-first-section'
import { useDNDSectionStore } from '../store/store'

export function useFirstSectionSpace(): void {
	const pathName = usePathname()
	const { currentItems } = useDNDSectionStore()	

	const getFirstSection = async () => {
		const { data: idSection } = await getIdFirstSection(pathName)
		if (!idSection) return

		return document.querySelector(`[data-id="${idSection}"]`) as HTMLDivElement
	}

	useEffect(() => {
		;(async () => {
			const firstSection = await getFirstSection()

			if (firstSection) {
				firstSection.style.minHeight = '300px'
				firstSection.style.paddingTop = '120px'
			}
		})()
	}, [currentItems])
}
