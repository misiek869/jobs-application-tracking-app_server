import { FormRow, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { JOB_STATUS, JOB_TYPE } from '../../../src/utils/constants'
import {
	Form,
	useNavigation,
	redirect,
	useOutletContext,
} from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import type { ActionFunctionArgs } from 'react-router'
import { AxiosError } from 'axios'

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

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/jobs', data)
		toast.success('Job Created')
		return redirect('all-jobs')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return error
	}
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
