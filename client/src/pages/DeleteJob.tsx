import { redirect, type ActionFunctionArgs } from 'react-router'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const action = async ({ params }: ActionFunctionArgs) => {
	try {
		await customFetch.delete(`/jobs/${params.id}`)
		toast.success('job deleted')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		throw error
	}

	return redirect('/dashboard/all-jobs')
}
