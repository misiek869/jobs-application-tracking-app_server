import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ChartsContainer, StatsContainer } from '../components'
import BarChart from '../components/BarChart'

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

const Stats = () => {
	const { defaultStats, monthlyApplications } = useLoaderData()

	return (
		<>
			<StatsContainer defaultStats={defaultStats} />

			{monthlyApplications?.length > 1 && (
				<ChartsContainer data={monthlyApplications} />
			)}
		</>
	)
}

export default Stats
