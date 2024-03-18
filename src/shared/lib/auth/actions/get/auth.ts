import { auth } from '../../model/auth'

export const currentUser = async () => {
	const session = await auth()
	return session?.user
}
