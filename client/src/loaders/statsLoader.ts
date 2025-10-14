import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const loader = async () => {
	try {
		const response = await customFetch('/jobs/stats')
		return response.data
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		throw error
	}
}
