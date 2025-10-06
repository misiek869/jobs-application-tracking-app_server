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

	const pagesArray = Array.from({ length: pages }, (_, index: number) => {
		return index + 1
	})
	console.log(pagesArray)

	return (
		<Wrapper>
			<button className='btn prev-btn'>
				<FaChevronLeft />
				prev
			</button>
			<div className='btn-container'>
				{pagesArray.map(pageNumber => {
					return (
						<button
							key={pageNumber}
							className={`btn page-btn ${
								pageNumber === currentPage && 'active'
							}`}>
							{pageNumber}
						</button>
					)
				})}
			</div>
			<button className='btn next-btn'>
				next
				<FaChevronRight />
			</button>
		</Wrapper>
	)
}

export default PageBtnContainer
