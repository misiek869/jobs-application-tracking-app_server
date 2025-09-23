import { Form, useOutletContext, type ActionFunctionArgs } from 'react-router'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { toast } from 'react-toastify'
import { FormRow, SubmitBtn } from '../components'
import customFetch from '../utils/customFetch'
import { AxiosError } from 'axios'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const file = formData.get('avatar')

	if (file instanceof File) {
		if (file.size > 500000) {
			toast.warning('image size too large')
			return null
		}
	}

	try {
		await customFetch.patch('/users/update-user', formData)
		toast.success('profile updated')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
	}

	return null
}

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
					<SubmitBtn formBtn />
				</div>
			</Form>
		</Wrapper>
	)
}

export default Profile
