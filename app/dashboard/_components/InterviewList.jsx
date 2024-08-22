"use client"
import { useUser } from '@clerk/nextjs'
import React, {useEffect} from 'react'
import { db } from '@/utils/db'
import { mockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {

	const {user} = useUser()
	const [interviewList, setInterviewList] = React.useState([])

	useEffect(() => {
		fetchInterviews()
	}, [user])

	const fetchInterviews = async () => {

		const res = await db.select()
		.from(mockInterview)
		.where(eq(mockInterview.createdBy, user?.primaryEmailAddress.emailAddress))
		.orderBy(mockInterview.createdAt, 'desc')

		// console.log(res)
		setInterviewList(res)
	}
  return (
	<div>
		<h2 className='font-medium text-xl'>
			Previous Interviews
		</h2>

		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
			{interviewList.map((interview, index) => (
				<InterviewItemCard key={index} interview={interview}/>
			))}
		</div>
	</div>
  )
}

export default InterviewList