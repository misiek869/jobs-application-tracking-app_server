type FormRowSelectProps = {
	name: string
	labelText: string
	list: string[]
	defaultValue?: string
	onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

const FormRowSelect = ({
	name,
	labelText,
	list,
	defaultValue = '',
	onChange,
}: FormRowSelectProps) => {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<select
				name={name}
				onChange={onChange}
				id={name}
				className='form-select'
				defaultValue={defaultValue}>
				{list.map(item => {
					return (
						<option key={item} value={item}>
							{item}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default FormRowSelect
