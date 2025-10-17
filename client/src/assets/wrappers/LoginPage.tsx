import styled from 'styled-components'

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	align-items: center;

	.logo {
		display: block;
		margin: 0 auto;
		margin-bottom: 1.5rem;
	}

	.form {
		max-width: 400px;
		border-top: 3px solid var(--primary-500);
		padding: 2rem 2.5rem 0 2.5rem;
	}

	h4 {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	p {
		margin-top: 1rem;
		text-align: center;
		line-height: 1.5;
	}

	.btn {
		margin-top: 1rem;
		font-size: 1.15rem;
		width: 100%;
	}

	.member-btn {
		color: var(--primary-500);
		letter-spacing: var(--letter-spacing);
		margin-left: 0.25rem;
	}

	.back-btn {
		display: block;
		width: calc(100% + 5rem);
		margin-left: -2.5rem;
		padding: 0.5rem 0;
		box-sizing: border-box;
		margin-top: 1rem;
		border-top-right-radius: 0;
		border-top-left-radius: 0;
	}
`

export default Wrapper
