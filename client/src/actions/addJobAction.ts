import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import type { ActionFunctionArgs } from 'react-router'
import { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/jobs', data)
		toast.success('Job Created')
		return redirect('all-jobs')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return error
	}
}
