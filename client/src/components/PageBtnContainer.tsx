import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAllJobsContext, type JobType } from '../pages/AllJobs'
import { useLocation, useNavigate } from 'react-router'

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

	const { search, pathname } = useLocation()
	const navigate = useNavigate()

	const handlePageChange = (pageNumber: string) => {
		const searchParams = new URLSearchParams(search)
		searchParams.set('page', pageNumber)
		navigate(`${pathname}?${searchParams.toString()}`)
	}

	const addPageButton = ({
		pageNumber,
		activeClass,
	}: {
		pageNumber: number
		activeClass: boolean
	}) => {
		return (
			<button
				key={pageNumber}
				onClick={() => handlePageChange(pageNumber)}
				className={`btn page-btn ${activeClass ? 'active' : ''}`}>
				{pageNumber}
			</button>
		)
	}

	const renderPageButtons = () => {
		const pageButtons = []

		// fist btn
		pageButtons.push(
			addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
		)

		// dots

		if (currentPage > 3) {
			pageButtons.push(
				<span className='page-btn dots' key='dots-1'>
					...
				</span>
			)
		}

		// hide one before
		if (currentPage !== 1 && currentPage !== 2) {
			pageButtons.push(
				addPageButton({ pageNumber: currentPage - 1, activeClass: false })
			)
		}

		//current page
		if (currentPage !== 1 && currentPage !== pages) {
			pageButtons.push(
				addPageButton({ pageNumber: currentPage, activeClass: true })
			)
		}

		// hide one after
		if (currentPage !== pages && currentPage !== pages - 1) {
			pageButtons.push(
				addPageButton({ pageNumber: currentPage + 1, activeClass: false })
			)
		}

		if (currentPage < pages - 2) {
			pageButtons.push(
				<span className='page-btn dots' key='dots+1'>
					...
				</span>
			)
		}

		// last btn
		pageButtons.push(
			addPageButton({ pageNumber: pages, activeClass: currentPage === pages })
		)
		return pageButtons
	}

	return (
		<Wrapper>
			<button
				className='btn prev-btn'
				onClick={() => {
					let prevPage = currentPage - 1
					if (prevPage < 1) prevPage = 1
					handlePageChange(prevPage)
				}}>
				<FaChevronLeft />
				prev
			</button>
			<div className='btn-container'>{renderPageButtons()}</div>
			<button
				className='btn next-btn'
				onClick={() => {
					let nextPage = currentPage + 1
					if (nextPage > pages) nextPage = 1
					handlePageChange(nextPage)
				}}>
				next
				<FaChevronRight />
			</button>
		</Wrapper>
	)
}

export default PageBtnContainer
