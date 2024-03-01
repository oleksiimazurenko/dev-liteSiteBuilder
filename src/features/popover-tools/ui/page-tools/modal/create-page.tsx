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
import { toast } from 'sonner'
import { createPage } from '../../../../../shared/actions/page/set/create-page'

const formSchema = z.object({
	title: z.string().min(2).max(50),
	url: z.string().min(2).max(50),
})

export function CreatePage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			url: '',
		},
	})

	const { setIsOpenPopoverTools } = usePopoverToolsStore()

	const onSubmit = async ({ title, url }: z.infer<typeof formSchema>) => {
		const { success, data } = await createPage(title, url)

		success ? toast.success('Page created') : toast.error('Error creating page')

		form.reset()
	}

	return (
		<div className='w-[100%]'>
			<div className='text-center'>Create new page</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 flex flex-col justify-center items-center p-[25px] '
				>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem className='flex flex-col justify-center items-center w-full'>
								<FormControl>
									<Input placeholder='name of the new page' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='url'
						render={({ field }) => (
							<FormItem className='flex flex-col justify-center items-center w-full'>
								<FormControl>
									<Input placeholder='path in the address bar' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						onClick={() => {
							setIsOpenPopoverTools(false)
						}}
					>
						add new page
					</Button>
				</form>
			</Form>
		</div>
	)
}
