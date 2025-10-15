import Wrapper from '../assets/wrappers/LoginPage'
import { FormRow, Logo } from '../components'
import { Form, useNavigation, Link, useNavigate } from 'react-router-dom'

const Register = () => {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'
	const navigate = useNavigate()

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
				<button
					type='button'
					className='btn back-btn'
					onClick={() => navigate(-1)}>
					Back
				</button>
			</Form>
		</Wrapper>
	)
}

export default Register
