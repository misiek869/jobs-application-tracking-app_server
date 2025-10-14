import { useLoaderData } from 'react-router'
import Wrapper from '../assets/wrappers/StatsContainer'
import { FaSuitcaseRolling, FaCalendarDays } from 'react-icons/fa6'
import { StatItem } from '../components'

const Admin = () => {
	const { users, jobs } = useLoaderData()
	return (
		<Wrapper>
			<StatItem
				title='current users'
				count={users}
				color='#e9b949'
				bcg='#fcefc7'
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title='total jobs'
				count={jobs}
				color='#647acb'
				bcg='#e0e8f9'
				icon={<FaCalendarDays />}
			/>
		</Wrapper>
	)
}

export default Admin
