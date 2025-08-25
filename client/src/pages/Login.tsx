import { Link } from 'react-router'
import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/LoginPage'

const Login = () => {
	return (
		<Wrapper>
			<form className='form'>
				<Logo />
				<h4>Login</h4>
				<FormRow type='email' name='email' defaultValue='michael@michael.com' />
				<FormRow type='password' name='password' defaultValue='1234' />
				<button type='submit' className='btn btn-block'>
					Submit
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
			</form>
		</Wrapper>
	)
}

export default Login
