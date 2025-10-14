import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'
import { type ActionFunctionArgs } from 'react-router'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const file = formData.get('avatar')

	if (file instanceof File) {
		if (file.size > 500000) {
			toast.warning('image size too large')
			return null
		}
	}

	try {
		await customFetch.patch('/users/update-user', formData)
		toast.success('profile updated')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
	}

	return null
}
