import { toast } from 'react-toastify'
import { JobsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'
// import { error } from 'console'
import { AxiosError } from 'axios'

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
type JobsResponse = {
	jobs: JobType[]
	// totalJobs: number
}

type AllJobsContextType = JobsResponse

export const loader = async () => {
	try {
		const { data } = await customFetch.get<JobsResponse>('/jobs')

		return { data }
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		throw error
	}
}

const AllJobsContext = createContext<AllJobsContextType | null>(null)

const AllJobs = () => {
	const { data } = useLoaderData() as { data: JobsResponse }

	return (
		<AllJobsContext.Provider value={data}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
