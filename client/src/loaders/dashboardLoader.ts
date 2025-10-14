import customFetch from '../utils/customFetch'
import { redirect } from 'react-router-dom'

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/users/current-user')
		return data
	} catch (error) {
		console.log('dasbhboard loader error', error)
		return redirect('/')
	}
}
