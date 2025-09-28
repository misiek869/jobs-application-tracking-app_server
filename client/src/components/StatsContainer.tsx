import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa6'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from './StatItem'

type DefaultData = {
	declined: number
	interview: number
	pending: number
}

const StatsContainer = ({ defaultData }: { defaultData: DefaultData }) => {
	const stats = [
		{
			title: 'pending applications',
			count: defaultData?.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#f59e0b',
			bcg: '#fef3c7',
		},
		{
			title: 'scheduled interviews',
			count: defaultData?.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bcg: '#e0e8f9',
		},
		{
			title: 'declined jobs',
			count: defaultData?.pending || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bcg: '#ffeeee',
		},
	]

	return (
		<Wrapper>
			{stats.map(item => {
				const { title, icon, bcg, color, count } = item

				return (
					<StatItem
						key={title}
						title={title}
						icon={icon}
						bcg={bcg}
						color={color}
						count={count}
					/>
				)
			})}
		</Wrapper>
	)
}

export default StatsContainer
