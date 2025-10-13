import main from '../assets/images/main.svg'
import { Link } from 'react-router'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job application <span>tracking app</span>
					</h1>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Reprehenderit qui porro quibusdam voluptatem officiis rem vitae
						placeat exercitationem libero nemo. Ab maxime illo doloremque
						officiis, vel perferendis rerum quasi necessitatibus.
					</p>
					<Link to={'/register'} className='btn register-link'>
						Register
					</Link>
					<Link to={'/login'} className='btn register-link'>
						Login | Demo User
					</Link>
				</div>
				<img src={main} className='img main-img' alt='' />
			</div>
		</Wrapper>
	)
}

export default Landing
