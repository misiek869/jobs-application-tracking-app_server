import { FormRow, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/Dashboard'
import { JOB_STATUS, JOB_TYPE } from '../../../src/utils/constants'
import {
	Form,
	useNavigation,
	redirect,
	useOutletContext,
} from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

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
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

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

					<button
						type='submit'
						className='btn btn-block form-btn'
						disabled={isSubmitting}>
						{isSubmitting ? 'creating...' : 'create'}
					</button>
				</div>
			</Form>
		</Wrapper>
	)
}

export default AddJob
