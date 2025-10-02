import { toast } from 'react-toastify'
import { JobsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'
// import { error } from 'console'
import { AxiosError } from 'axios'
import type { Request } from 'express'

export type JobType = {
	company: string
	position: string
	jobStatus: 'interview' | 'declined' | 'pending'
	jobType: 'full-time' | 'part-time' | 'internship'
	jobLocation: string
	createdAt: string
	updatedAt: string
	createdBy: string
	_id: string
}

type JobsSearchValues = {
	search?: string
	jobStatus?: 'all' | 'interview' | 'declined' | 'pending'
	jobType?: 'all' | 'full-time' | 'part-time' | 'internship'
	sort?: 'newest' | 'oldest' | 'a-z' | 'z-a'
}

type JobsResponse = {
	jobs: JobType[]
	params: JobsSearchValues
	// totalJobs: number
}

type LoaderData = {
	data: JobsResponse
	searchValues: JobsSearchValues
}

type AllJobsContextType = LoaderData

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

const AllJobsContext = createContext<AllJobsContextType | null>(null)

const AllJobs = () => {
	const { data, searchValues } = useLoaderData() as {
		data: JobsResponse
		searchValues: JobsSearchValues
	}

	return (
		<AllJobsContext.Provider value={{ data, searchValues }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
