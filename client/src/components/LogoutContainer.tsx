import { FaRegUser } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa6'
import Wrapper from '../assets/wrappers/LogoutContainer'
import { useDashboardContext } from '../pages/DashboardLayout'
import { useState } from 'react'

const LogoutContainer = () => {
	const [showLogout, setShowLogout] = useState<boolean>(false)
	const { user, logoutUser } = useDashboardContext()

	return (
		<Wrapper>
			<button
				className='btn logout-btn'
				onClick={() => {
					setShowLogout(!showLogout)
				}}>
				{user.avatar ? (
					<img src={user.avatar} alt='avatar' className='img' />
				) : (
					<FaRegUser />
				)}

				{user?.name}
				<FaCaretDown />
			</button>
			<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
				<button className='dropdown-btn' onClick={logoutUser}>
					logout
				</button>
			</div>
		</Wrapper>
	)
}

export default LogoutContainer
