import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ formBtn }: { formBtn: string }) => {
	const navigation = useNavigation()

	const isSubmitting = navigation.state === 'submitting'
	return (
		<button
			type='submit'
			className={formBtn ? 'btn btn-block form-btn' : 'btn btn-block'}
			disabled={isSubmitting}>
			{isSubmitting ? 'creating...' : 'create'}
		</button>
	)
}

export default SubmitBtn
