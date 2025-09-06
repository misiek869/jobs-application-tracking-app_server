export const JOB_STATUS = {
	PENDING: 'pending',
	INTERVIEW: 'interview',
	DECLINED: 'declined',
} as const

export const JOB_TYPE = {
	FULL_TIME: 'full-time',
	PART_TIME: 'part-time',
	INTERNSHIP: 'internship',
} as const

export const JOB_SORT_BY = {
	NEWEST: 'newest',
	OLDEST: 'oldest',
	ASCENDING: 'a-z',
	DESCENDING: 'z-a',
}
