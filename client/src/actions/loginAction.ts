import type { ActionFunctionArgs } from 'react-router'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
import { AxiosError } from 'axios'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/auth/login', data)
		toast.success('Login successful')
		return redirect('/dashboard')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return error
	}
}
