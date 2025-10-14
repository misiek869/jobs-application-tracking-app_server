import { JobsContainer, SearchContainer } from '../components'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'
// import { error } from 'console'

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

export type JobsSearchValues = {
	search?: string
	jobStatus?: 'all' | 'interview' | 'declined' | 'pending'
	jobType?: 'all' | 'full-time' | 'part-time' | 'internship'
	sort?: 'newest' | 'oldest' | 'a-z' | 'z-a'
}

export type JobsResponse = {
	jobs: JobType[]
	params: JobsSearchValues
	totalJobs: number
	pages: number
	currentPage: number
}

type LoaderData = {
	data: JobsResponse
	searchValues: JobsSearchValues
}

type AllJobsContextType = LoaderData

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
