import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'
import { redirect } from 'react-router'

export const loader = async () => {
	try {
		const response = await customFetch.get('/users/admin/stats')

		return response.data
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message =
			error.response?.data?.message || 'You must be an admin to visit this page'
		toast.error(message)

		return redirect('/dashboard')
	}
}
