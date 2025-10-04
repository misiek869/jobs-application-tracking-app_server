import { Form, Link, useSubmit } from 'react-router'
import { FormRow, FormRowSelect, SubmitBtn } from '.'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../src/utils/constants'
import { useAllJobsContext } from '../pages/AllJobs'

const SearchContainer = () => {
	const searchValues = useAllJobsContext()

	const { search, jobStatus, jobType, sort } = searchValues.searchValues

	const submit = useSubmit()

	const debounce = (
		onChange: (form: HTMLFormElement) => void
	): React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> => {
		let timeout: ReturnType<typeof setTimeout>
		return e => {
			const form = e.currentTarget.form
			if (!form) return
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				onChange(form)
			}, 2000)
		}
	}

	return (
		<Wrapper>
			<Form className='form'>
				<h5 className='form-title'>search form</h5>
				<div className='form-center'>
					<FormRow
						type='search'
						name='search'
						defaultValue={search}
						onChange={e => {
							submit(e.currentTarget.form)
						}}
					/>
					<FormRowSelect
						labelText='job status'
						name='jobStatus'
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue={jobStatus}
						onChange={debounce(form => {
							submit(form)
						})}
					/>
					<FormRowSelect
						labelText='job type'
						name='jobType'
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue={jobType}
						onChange={e => {
							submit(e.currentTarget.form)
						}}
					/>
					<FormRowSelect
						labelText='sort by'
						name='sort'
						list={[...Object.values(JOB_SORT_BY)]}
						defaultValue={sort}
						onChange={e => {
							submit(e.currentTarget.form)
						}}
					/>
					<Link to={'/dashboard/all-jobs'} className='btn form-btn delete-btn'>
						Reset Search Values
					</Link>
				</div>
			</Form>
		</Wrapper>
	)
}

export default SearchContainer
