import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { redirect, type LoaderFunctionArgs } from 'react-router-dom'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { data } = await customFetch.get(`/jobs/${params.id}`)
		return data
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return redirect('/dashboard/all-jobs')
	}
}
