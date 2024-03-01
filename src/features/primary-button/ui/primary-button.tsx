'use client'

import { Button, ButtonProps as DefaultButtonProps } from '@/shared/ui/button'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type ButtonProps = {
	id: string
  href?: string
	textContent: string
} & DefaultButtonProps

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, textContent, href, id, ...props }, ref) => {
		const router = useRouter()
		const onclick = () => {
			toast.success("PrimaryButton")
			href && router.push(href)
		}
		return (
			<Button
				data-id={id}
				data-component
				className={`mt-4 border-2 border-white border-opacity-50 rounded-sm bg-transparent shadow-md px-10 py-2 text-[14px] font-bold text-slate-50 hover:bg-slate-50 hover:text-slate-800 ${className}`}
				{...props}
				ref={ref}
				onClick={onclick}
				data-trigger-tools
			>
				{textContent}
			</Button>
		)
	}
)
PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }