import Wrapper from '../assets/wrappers/BigSidebar'
import Logo from './Logo'
import NavLinks from './NavLinks'

import { useDashboardContext } from '../pages/DashboardLayout'

const BigSidebar = () => {
	const { showSidebar } = useDashboardContext()

	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'sidebar-container' : 'show-sidebar sidebar-container'
				}>
				<div className='content'>
					<header>
						<Logo />
					</header>
					<NavLinks isBigSidebar={true} />
				</div>
			</div>
		</Wrapper>
	)
}

export default BigSidebar
