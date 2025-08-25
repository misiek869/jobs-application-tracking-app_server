import { Link, useRouteError } from 'react-router'
import Wrapper from '../assets/wrappers/ErrorPage'
import notFoundImg from '../assets/images/not-found.svg'

const Error = () => {
	const error = useRouteError()

	if (error.status === 404) {
		return (
			<Wrapper>
				<div>
					<img src={notFoundImg} alt='not found image' />
					<h3>Page not found</h3>
					<Link to={'/dashboard'}>Go Back</Link>
				</div>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<div>
				<h3>Something went wrong</h3>
			</div>
		</Wrapper>
	)
}

export default Error
