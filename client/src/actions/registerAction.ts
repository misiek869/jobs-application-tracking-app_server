import type { ActionFunctionArgs } from 'react-router'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import customFetch from '../utils/customFetch'
import { redirect } from 'react-router-dom'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/auth/register', data)
		toast.success('Registration success')
		return redirect('/login')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return null

		return error
	}
}
