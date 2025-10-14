import { AxiosError } from 'axios'
import type { Request } from 'express'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { type JobsResponse } from '../pages/AllJobs'

export const loader = async ({ request }: { request: Request }) => {
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries(),
	])

	try {
		const { data } = await customFetch.get<JobsResponse>('/jobs', { params })
		return { data, searchValues: { ...params } }
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		throw error
	}
}
