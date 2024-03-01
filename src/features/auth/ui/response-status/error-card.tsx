import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CardWrapperProps } from '../card-wrapper/card-wrapper'

type ErrorCardProps = {
	CardWrapper: (props: CardWrapperProps) => JSX.Element
}

export const ErrorCard = ({ CardWrapper }: ErrorCardProps) => {
	return (
		<CardWrapper
			headerLabel='Oops! Something went wrong!'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
		>
			<div className='w-full flex justify-center items-center'>
				<ExclamationTriangleIcon className='text-destructive' />
			</div>
		</CardWrapper>
	)
}
