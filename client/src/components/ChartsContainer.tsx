import { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import BarChart from './BarChart'
import AreaChart from './AreaChart'

type ChartsContainerProps = {
	date: string
	count: number
}

const ChartsContainer = ({ data }: { data: ChartsContainerProps }) => {
	const [barChart, setBarChart] = useState<boolean>(true)

	return (
		<Wrapper>
			<h4>Monthly Applications</h4>
			<button onClick={() => setBarChart(!barChart)}>
				{barChart ? 'Area Chart' : 'Bar Chart'}
			</button>
			{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
		</Wrapper>
	)
}

export default ChartsContainer
