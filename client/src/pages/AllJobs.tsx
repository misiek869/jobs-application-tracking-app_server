import { toast } from 'react-toastify'
// import { JobsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
	const { data } = await customFetch.get('/jobs')
	console.log(data)
}

const AllJobs = () => {
	return <div>AllJobs</div>
}

export default AllJobs
