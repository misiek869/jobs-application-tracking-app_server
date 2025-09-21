import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { redirect, useLoaderData } from 'react-router'
import Wrapper from '../assets/wrappers/StatsContainer'
import { AxiosError } from 'axios'
import { FaSuitcaseRolling, FaCalendarDays } from 'react-icons/fa6'
import { StatItem } from '../components'

export const loader = async () => {
	try {
		const response = await customFetch.get('/users/admin/stats')

		return response.data
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message =
			error.response?.data?.message || 'You must be an admin to visit this page'
		toast.error(message)

		return redirect('/dashboard')
	}
}

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
