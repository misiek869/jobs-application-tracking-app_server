import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)

	try {
		await customFetch.patch(`/jobs/${params.id}`, data)
		toast.success('job edited')
		return redirect('/dashboard/all-jobs')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return redirect('/dashboard/all-jobs')
	}
}
