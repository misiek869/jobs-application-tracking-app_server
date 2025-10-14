import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
	AddJob,
	Admin,
	AllJobs,
	DashboardLayout,
	EditJob,
	Error,
	HomeLayout,
	Landing,
	Login,
	Profile,
	Register,
	Stats,
} from './pages'

import { action as registerAction } from './actions/registerAction'
import { action as loginAction } from './pages/Login'
import { action as addJobAction } from './actions/addJobAction'
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as allJobsLoader } from './pages/AllJobs'
import { loader as editJobLoader } from './pages/EditJob'
import { loader as statsLoader } from './pages/Stats'
import { loader as adminPageLoader } from './pages/Admin'
import { action as editJobAction } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { action as profileAction } from './pages/Profile'

export const checkTheme = (): boolean => {
	const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
	document.body.classList.toggle('dark-theme', isDarkTheme)

	return isDarkTheme
}

checkTheme()

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,

		children: [
			{ index: true, element: <Landing /> },
			{
				path: 'register',
				element: <Register />,
				action: registerAction,
			},
			{
				path: 'login',
				element: <Login />,
				action: loginAction,
			},
			{
				path: 'dashboard',
				element: <DashboardLayout />,
				loader: dashboardLoader,
				children: [
					{
						index: true,
						element: <AddJob />,
						action: addJobAction,
					},
					{ path: 'stats', element: <Stats />, loader: statsLoader },
					{ path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader },
					{ path: 'profile', element: <Profile />, action: profileAction },
					{ path: 'admin', element: <Admin />, loader: adminPageLoader },
					{
						path: 'edit-job/:id',
						element: <EditJob />,
						loader: editJobLoader,
						action: editJobAction,
					},
					{ path: 'delete-job/:id', action: deleteJobAction },
				],
			},
		],
	},
])

const App = () => {
	return <RouterProvider router={router} />
}

export default App
