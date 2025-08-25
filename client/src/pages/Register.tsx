import Wrapper from '../assets/wrappers/LoginPage'
import { Link } from 'react-router'
import { FormRow, Logo } from '../components'

const Register = () => {
	return (
		<Wrapper>
			<form className='form'>
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
				<button type='submit' className='btn btn-block'>
					submit
				</button>
				<p>
					Already have an account?
					<Link to={'/login'} className='member-btn'>
						Login
					</Link>
				</p>
			</form>
		</Wrapper>
	)
}

export default Register
