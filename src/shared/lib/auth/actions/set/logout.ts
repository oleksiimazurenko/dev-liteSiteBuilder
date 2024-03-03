'use server'

import { signOut } from '../../model/auth'

export const logout = async () => {
	await signOut()


}
