import { Form, useLoaderData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/EditJob'
import { FormRow, FormRowSelect, SubmitBtn } from '../components'
import type { JobType } from './AllJobs'
import { JOB_STATUS, JOB_TYPE } from '../../../src/utils/constants'

type JobResponse = { job: JobType }

const EditJob = () => {
	const { job } = useLoaderData<JobResponse>()

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
					<SubmitBtn formBtn />
				</div>
			</Form>
		</Wrapper>
	)
}

export default EditJob
