import Wrapper from '../assets/wrappers/LoginPage'

import { FormRow, Logo } from '../components'
import { Form, redirect, useNavigation, Link } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import type { ActionFunctionArgs } from 'react-router'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/auth/register', data)
		return redirect('/login')
	} catch (error) {
		console.log(error)
		return error
	}
}

const Register = () => {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Register</h4>
				<FormRow type='text' name='name' defaultValue='michael' />
				<FormRow
					type='text'
					name='lastName'
					labelText='last name'
					defaultValue='gawlik'
				/>
				<FormRow type='text' name='location' defaultValue='oświęcim' />
				<FormRow type='email' name='email' defaultValue='michael@michael.com' />
				<FormRow type='password' name='password' defaultValue='1234' />
				<button disabled={isSubmitting} type='submit' className='btn btn-block'>
					{isSubmitting ? 'submitting...' : 'submit'}
				</button>
				<p>
					Already have an account?
					<Link to={'/login'} className='member-btn'>
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	)
}

export default Register
