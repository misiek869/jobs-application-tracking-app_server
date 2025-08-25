import React from 'react'

import { FaChartBar } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { RiAdminFill } from 'react-icons/ri'

const links = [
	{ text: 'add job', path: '.', icon: <FaWpforms /> },
	{ text: 'all jobs', path: 'all-jobs', icon: <IoStatsChart /> },
	{ text: 'stats', path: 'stats', icon: <FaChartBar /> },
	{ text: 'profile', path: 'profile', icon: <ImProfile /> },
	{ text: 'admin', path: 'admin', icon: <RiAdminFill /> },
]

export default links
