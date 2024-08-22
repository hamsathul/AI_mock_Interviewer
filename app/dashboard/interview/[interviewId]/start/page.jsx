"use client"
import { mockInterview } from '@/utils/schema'
import React, {useEffect} from 'react'
import { db } from '@/utils/db'
import {eq} from 'drizzle-orm'
import QuestionSection from './_components/QuestionSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


function StartInterview({params}) {

	const [interviewData, setInterviewData] = React.useState()
	const [mockInterviewQuestion, setMockInterviewQuestion] = React.useState()
	const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0)
	

	useEffect(() => {
		// console.log(params.interviewId)
		getInterviewDetails()
	  	}, [])

	const getInterviewDetails = async() => {
		const result = await db.select().from(mockInterview)
		.where(eq(mockInterview.mockId, params.interviewId))
		const jsonMockResp = JSON.parse(result[0].jsonMockResp)
		setMockInterviewQuestion(jsonMockResp)
		setInterviewData(result[0])
		console.log(jsonMockResp)
	}

  return (

	
	<div>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

			{/* questions */}
			<QuestionSection mockInterviewQuestion={mockInterviewQuestion}
			activeQuestionIndex={activeQuestionIndex}
			/>

			{/* Video/audio Recording */}
			<RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion}
			activeQuestionIndex={activeQuestionIndex}
			interviewData={interviewData}
			/>
		</div>

		<div className='flex justify-end gap-6 my-1'>
			{activeQuestionIndex > 0 && <Button
			onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}
			>Previous Question</Button>}
			{activeQuestionIndex != mockInterviewQuestion?.length-1 && <Button
			onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}
			>Next Question</Button>}
			{activeQuestionIndex === mockInterviewQuestion?.length-1 && 
			<Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
			<Button>End Interview</Button>
			</Link>
			}
			
		</div>

	</div>
  )
}

export default StartInterview