import {
	Form,
	redirect,
	useLoaderData,
	useNavigation,
	type LoaderFunctionArgs,
} from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/EditJob'
import { FormRow, FormRowSelect } from '../components'
import type { JobType } from './AllJobs'
import { JOB_STATUS, JOB_TYPE } from '../../../src/utils/constants'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { data } = await customFetch.get(`/jobs/${params.id}`)
		return data
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return redirect('/dashboard/all-jobs')
	}
}

export const action = async () => {
	return null
}

type JobResponse = { job: JobType }

const EditJob = () => {
	const { job } = useLoaderData<JobResponse>()

	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<h4 className='form-title'>edit job</h4>
				<div className='form-center'>
					<FormRow type='text' name='position' defaultValue={job.position} />
					<FormRow type='text' name='company' defaultValue={job.company} />
					<FormRow
						type='text'
						name='jobLocation'
						labelText='job location'
						defaultValue={job.jobLocation}
					/>
					<FormRowSelect
						name={'jobStatus'}
						labelText='job status'
						defaultValue={job.jobStatus}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						name={'jobType'}
						labelText='job type'
						defaultValue={job.jobType}
						list={Object.values(JOB_TYPE)}
					/>
					<button
						className='btn btn-submit btn-block form-btn'
						disabled={isSubmitting}
						type='submit'>
						{isSubmitting ? 'editting...' : 'edit'}
					</button>
				</div>
			</Form>
		</Wrapper>
	)
}

export default EditJob
