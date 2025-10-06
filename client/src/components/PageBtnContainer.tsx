import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAllJobsContext, type JobType } from '../pages/AllJobs'

const PageBtnContainer = () => {
	const data = useAllJobsContext()

	if (!data) {
		return (
			<Wrapper>
				<h2>Loading jobs...</h2>
			</Wrapper>
		)
	}

	const { pages, currentPage } = data.data

	console.log(pages, currentPage)

	return <div>PageBtnContainer</div>
}

export default PageBtnContainer
