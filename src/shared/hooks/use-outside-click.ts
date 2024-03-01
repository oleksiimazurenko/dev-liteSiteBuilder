import { RefObject, useEffect } from 'react'

export function useOutsideClick<T extends HTMLElement>(
	ref: RefObject<T>,
	callback: () => void,
	firstException?: string,
	secondException?: string,
): void {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {

			if (
				!(event.target as HTMLElement)?.closest(
					firstException ? firstException : '',
				) &&
				!(event.target as HTMLElement)?.hasAttribute(secondException ? secondException : '')
			) {
				callback()
			}
		}

		document.addEventListener('mouseup', handleClickOutside)

		return () => document.removeEventListener('mouseup', handleClickOutside)
	}, [ref, callback])
}
