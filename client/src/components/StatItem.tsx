import type React from 'react'
import Wrapper from '../assets/wrappers/StatItem'


type StatItemProps = {
	count: number
	title: string
	icon: React.ReactNode
	bcg: string
	color: string
}

const StatItem = ({ count, title, icon, color, bcg }: StatItemProps) => {
	return (
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className='count'>{count}</span>
				<span className='icon'>{icon}</span>
			</header>
			<h5 className='title'>{title}</h5>
		</Wrapper>
	)
}

export default StatItem
