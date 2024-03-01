'use client'

import { ProductCardProps } from '@/shared/types/types'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/shared/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export function ProductCard({
	name,
	country,
	price,
	type,
	image
}: ProductCardProps) {
	return (
		<Link href={'/'} className='cursor-pointer'>
			<Card className='rounded-8 bg-slate-50/90 w-[220px] min-h-[240px] overflow-hidden hover:scale-105 transition'>

				<CardHeader className='relative overflow-hidden p-0 w-full h-[150px]'>
					<Image
						fill={true}
						sizes='(max-width: 768px) 100%, (max-width: 1200px) 100%' // Просто влепил что попало
						style={{ objectFit: 'cover' }}
						quality={100}
						src={`/products/${image}`}
						alt={image}
					/>
				</CardHeader>

				<CardContent className='px-[10px] pb-0 pt-2 shadow-top'>
					<CardDescription className='text-black text-center text-[14px] font-normal'>
						{name}
					</CardDescription>
					{type === 'normal' && (
						<CardDescription className='mt-[14px] text-black text-center text-[14px] font-normal'>
							{country}
						</CardDescription>
					)}
				</CardContent>

				<CardFooter className='flex justify-end text-black self-end pt-[10px] pb-0'>
					{price}$
				</CardFooter>

			</Card>
		</Link>
	)
}
