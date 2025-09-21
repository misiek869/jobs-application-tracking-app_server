import { Link, Form } from 'react-router-dom'
import { FaLocationDot, FaBriefcase, FaCalendarDays } from 'react-icons/fa6'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

type JobProps = {
	_id: string
	position: string
	company: string
	jobLocation: string
	jobType: string
	createdAt: string
	jobStatus: string
}

const Job = ({
	_id,
	position,
	company,
	jobLocation,
	jobType,
	createdAt,
	jobStatus,
}: JobProps) => {
	const date = day(createdAt).format('MMM Do, YYYY')

	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{company.charAt(0)}</div>
				<div className='info'>
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className='content'>
				<div className='content-center'>
					<JobInfo icon={<FaLocationDot />} text={jobLocation} />
					<JobInfo icon={<FaCalendarDays />} text={date} />
					<JobInfo icon={<FaBriefcase />} text={jobType} />
					<div className={`status ${jobStatus}`}>{jobStatus}</div>
				</div>
				<footer className='action'>
					<Link to={`../edit-job/`} className='btn edit-btn'>
						Edit
					</Link>

					<Form>
						<button type='submit' className='btn delete-btn'>
							Delete
						</button>
					</Form>
				</footer>
			</div>
		</Wrapper>
	)
}

export default Job
