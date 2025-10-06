import { useAllJobsContext, type JobType } from '../pages/AllJobs'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
	const data = useAllJobsContext()

	if (!data) {
		return (
			<Wrapper>
				<h2>Loading jobs...</h2>
			</Wrapper>
		)
	}

	const { jobs, totalJobs, pages } = data.data

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>The are no jobs...</h2>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job: JobType) => {
					return <Job key={job._id} {...job} />
				})}
			</div>
			{pages > 1 && <PageBtnContainer />}
		</Wrapper>
	)
}

export default JobsContainer
