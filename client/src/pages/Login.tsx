import { Form, redirect, useNavigation, Link } from 'react-router-dom'
import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/LoginPage'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import customFetch from '../utils/customFetch'
import type { ActionFunctionArgs } from 'react-router'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	try {
		await customFetch.post('/auth/login', data)
		toast.success('Login successfull')
		return redirect('/dashboard')
	} catch (err) {
		const error = err as AxiosError<{ message: string }>
		const message = error.response?.data?.message || 'Something went wrong'
		toast.error(message)
		return error
	}
}

const Login = () => {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Login</h4>
				<FormRow type='email' name='email' defaultValue='michael@michael.com' />
				<FormRow type='password' name='password' defaultValue='1234' />
				<button type='submit' className='btn btn-block' disabled={isSubmitting}>
					{isSubmitting ? 'submitting...' : 'submit'}
				</button>
				<button type='button' className='btn btn-block'>
					Explore without Login
				</button>
				<p>
					Not a member?
					<Link to={'/register'} className='member-btn'>
						Register
					</Link>
				</p>
			</Form>
		</Wrapper>
	)
}

export default Login
