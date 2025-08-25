import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { IoClose } from 'react-icons/io5'
import Logo from './Logo'
import links from '../utils/links'
import { NavLink } from 'react-router'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useDashboardContext()

	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
				}>
				<div className='content'>
					<button className='close-btn' onClick={toggleSidebar}>
						<IoClose />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	)
}

export default SmallSidebar
