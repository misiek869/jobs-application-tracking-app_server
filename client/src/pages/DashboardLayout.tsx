import { Outlet, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { createContext, useContext, useState } from 'react'
import { checkTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

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

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/users/current-user')
		return data
	} catch (error) {
		return redirect('/')
	}
}

const DashboardLayout = () => {
	const { user } = useLoaderData()
	const navigate = useNavigate()
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
		navigate('/')

		await customFetch.get('/auth/logout')
		toast.success('Logged Out')
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
							<Outlet context={{ user }} />
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
