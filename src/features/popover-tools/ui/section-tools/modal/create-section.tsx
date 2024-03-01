'use client'

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

import { usePopoverToolsStore } from '@/shared/store/store'
import { usePathname } from 'next/navigation'
import { createSection } from '@/shared/actions/section/set/create-section'
import { toast } from 'sonner'

const formSchema = z.object({
	name: z.string().min(2).max(50),
})

export function CreateSection() {
	const pathName = usePathname()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	const { setIsOpenPopoverTools } = usePopoverToolsStore()

	async function onSubmit({ name }: z.infer<typeof formSchema>) {
		const { data, success, error } = await createSection({
			url: pathName,
			name,
			rPath: pathName,
		})
		form.reset()
		setIsOpenPopoverTools(false)
		success && toast.success('Section created')
		!success && toast.error(error)
	}

	return (
		<div className='w-[75%]'>
			<div className='text-center'>Create new section</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 flex flex-col justify-center items-center py-[25px]'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='flex flex-col justify-center items-center w-full'>
								<FormControl>
									<Input placeholder='name of the new section' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>add new section</Button>
				</form>
			</Form>
		</div>
	)
}
