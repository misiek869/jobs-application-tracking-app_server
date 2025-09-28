import styled from 'styled-components'

const Wrapper = styled.section`
	margin-top: 4rem;
	text-align: center;

	button {
		background: var(--primary-500);
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);

		color: white;
		font-size: 1.25rem;
		cursor: pointer;
	}

	h4 {
		text-align: center;
		margin-bottom: 1rem;
	}
`

export default Wrapper
