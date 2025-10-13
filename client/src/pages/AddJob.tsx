import { FormRow, FormRowSelect, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { JOB_STATUS, JOB_TYPE } from '../../../src/utils/constants'
import { Form, useOutletContext } from 'react-router-dom'

type User = {
	name: string
	email: string
	password: string
	lastName: string
	location: string
	role: 'user' | 'admin'
}

type OutletContext = {
	user: User
}

const AddJob = () => {
	const { user } = useOutletContext<OutletContext>()

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<h4 className='form-title'>create job</h4>
				<div className='form-center'>
					<FormRow type='text' name='position' />
					<FormRow type='text' name='company' />
					<FormRow
						type='text'
						name='jobLocation'
						labelText='job location'
						defaultValue={user.location}
					/>
					<FormRowSelect
						name='jobStatus'
						labelText='job status'
						list={Object.values(JOB_STATUS)}
						defaultValue={JOB_STATUS.PENDING}
					/>
					<FormRowSelect
						name='jobType'
						labelText='job type'
						list={Object.values(JOB_TYPE)}
						defaultValue={JOB_TYPE.FULL_TIME}
					/>

					<SubmitBtn formBtn />
				</div>
			</Form>
		</Wrapper>
	)
}

export default AddJob
