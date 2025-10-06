import styled from 'styled-components'

const Wrapper = styled.main`
	min-height: 100vh;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 90vw;
		max-width: 600px;
		display: block;
		margin-top: -3rem;
		margin-bottom: 2rem;
	}

	h3 {
		margin-bottom: 1.5rem;
	}

	a {
		color: var(--primary-500);
		text-transform: capitalize;
		font-size: 1.5rem;
	}
`

export default Wrapper
