import { useLoaderData } from 'react-router-dom'
import { ChartsContainer, StatsContainer } from '../components'
// import BarChart from '../components/BarChart'

const Stats = () => {
	const { defaultData, monthlyApplications } = useLoaderData()

	return (
		<>
			<StatsContainer defaultData={defaultData} />

			{monthlyApplications?.length > 1 && (
				<ChartsContainer data={monthlyApplications} />
			)}
		</>
	)
}

export default Stats
