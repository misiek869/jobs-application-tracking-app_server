import { Outlet } from 'react-router'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { createContext, useContext, useState } from 'react'
import { checkTheme } from '../App'

type DashboardContextType = {
	user: { name: string }
	showSidebar: boolean
	isDarkTheme: boolean
	toggleDarkTheme: () => void
	toggleSidebar: () => void
	logoutUser: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(
	undefined
)

const DashboardLayout = () => {
	// temporary
	const user = { name: 'john' }
	const [showSidebar, setShowSidebar] = useState<boolean>(false)
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(checkTheme())

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme
		setIsDarkTheme(newDarkTheme)
		document.body.classList.toggle('dark-theme', newDarkTheme)
		localStorage.setItem('darkTheme', String(newDarkTheme))
	}

	const toggleSidebar = (): void => {
		setShowSidebar(prev => !prev)
	}

	const logoutUser = async () => {
		console.log('logout')
	}

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				logoutUser,
			}}>
			<Wrapper>
				<main className='dashboard'>
					<SmallSidebar />
					<BigSidebar />
					<div>
						<Navbar />
						<div className='dashboard-page'>
							<Outlet />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	)
}

export const useDashboardContext = (): DashboardContextType => {
	const context = useContext(DashboardContext)
	if (!context) {
		throw new Error(
			'useDashboardContext must be used within DashboardContext.Provider'
		)
	}
	return context
}

export default DashboardLayout
