import { Form, useNavigation, useOutletContext } from 'react-router'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { toast } from 'react-toastify'
import { FormRow } from '../components'

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

const Profile = () => {
	const { user } = useOutletContext<OutletContext>()
	const { name, lastName, email, location } = user

	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'

	return (
		<Wrapper>
			<Form method='post' className='form' encType='multipart/form-data'>
				<h4 className='form-title'>profile</h4>
				<div className='form-center'>
					<div className='form-row'>
						<label htmlFor='avatar' className='form-label'>
							Select an image file (max 0.5 MB)
						</label>
						<input
							type='file'
							name='avatar'
							id='avatar'
							className='form-input'
							accept='image/*'
						/>
					</div>
					<FormRow type='text' name='name' defaultValue={name}></FormRow>
					<FormRow
						type='text'
						name='lastName'
						defaultValue={lastName}
						labelText='last name'></FormRow>
					<FormRow type='email' name='email' defaultValue={email}></FormRow>
					<FormRow
						type='text'
						name='location'
						defaultValue={location}></FormRow>
					<button
						type='submit'
						className='btn btn-block form-btn'
						disabled={isSubmitting}>
						{isSubmitting ? 'submitting...' : 'submit'}
					</button>
				</div>
			</Form>
		</Wrapper>
	)
}

export default Profile
