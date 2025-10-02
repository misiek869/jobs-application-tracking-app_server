import { Form, Link, useSubmit } from 'react-router'
import { FormRow, FormRowSelect, SubmitBtn } from '.'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../src/utils/constants'

const SearchContainer = () => {
	const submit = useSubmit()

	return (
		<Wrapper>
			<Form className='form'>
				<h5 className='form-title'>search form</h5>
				<div className='form-center'>
					<FormRow
						type='search'
						name='search'
						defaultValue='a'
						onChange={e => {
							submit(e.currentTarget.form)
						}}
					/>
					<FormRowSelect
						labelText='job status'
						name='jobStatus'
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue='all'
						onChange={e => {
							submit(e.currentTarget.form)
						}}
					/>
					<FormRowSelect
						labelText='job type'
						name='jobType'
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue='all'
						onChange={e => {
							submit(e.currentTarget.form)
						}}
					/>
					<FormRowSelect
						labelText='sort by'
						name='sort'
						list={[...Object.values(JOB_SORT_BY)]}
						defaultValue='newest'
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
