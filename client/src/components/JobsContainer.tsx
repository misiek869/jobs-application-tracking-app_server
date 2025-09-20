import { UseAllJobsContext } from '../pages/AllJobs'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
	const { data } = UseAllJobsContext()
	const { jobs } = data

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>The are no jobs...</h2>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<div className='jobs'></div>
			{jobs.map(job => {
				return <Job key={join._id} {...job} />
			})}
		</Wrapper>
	)
}

export default JobsContainer
