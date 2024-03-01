'use client'

import { Poppins } from 'next/font/google'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
})

interface HeaderProps {
	label: string
	className?: string
}

export const Header = ({ label, className }: HeaderProps) => {

	return (
		<div className={`${font.className} ${className}`}>
			{label}
		</div>
	)
}