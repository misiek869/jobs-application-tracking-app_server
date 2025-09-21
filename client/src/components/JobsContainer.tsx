import { useAllJobsContext, type JobType } from '../pages/AllJobs'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
	const data = useAllJobsContext()

	if (!data) {
		return (
			<Wrapper>
				<h2>Loading jobs...</h2>
			</Wrapper>
		)
	}
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
			<div className='jobs'>
				{jobs.map((job: JobType) => {
					return <Job key={job._id} {...job} />
				})}
			</div>
		</Wrapper>
	)
}

export default JobsContainer
