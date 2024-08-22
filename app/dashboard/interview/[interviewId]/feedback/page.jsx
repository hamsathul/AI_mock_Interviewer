"use client"
import React, {useEffect} from 'react'
import { db } from '@/utils/db'
import { UserAnswers } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  


function Feedback({params}) {

	const [feedbackList, setFeedbackList] = React.useState([])
	const router = useRouter()
	useEffect(() => {
		getFeedback()
	}, [])

	const getFeedback = async()=>{

		const res =await db.select()
		.from(UserAnswers)
		.where(eq(UserAnswers.mockIdRef, params.interviewId))
		.orderBy(UserAnswers.id)

		console.log(res)
		setFeedbackList(res)
	}
  return (
	<div className='p-10'>

		{ feedbackList?.length === 0 ? <h2 className='text-red-500'>No feedback available</h2>
		:
		<>
		
		<h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
		<h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
		
		<h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

		<h2 className='text-sm text-gray-500'>Find below interview questions with correct answer, your answer and feedback</h2>

		{feedbackList.map((feedback, index) => (
			
				<Collapsible key={index} className='mt-7'>
					<CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
					{feedback.question} <ChevronsUpDown className='h-5 w-5'/>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className='flex flex-col gap-2'>
							<h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{feedback.rating}</h2>
							<h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{feedback.userAns}</h2>
							<h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>AI Answer: </strong>{feedback.correctAns}</h2>
							<h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{feedback.feedback}</h2>
						</div>
					</CollapsibleContent>
				</Collapsible>

			
		))}
		
		</>
		}
		<Button 
		className='mt-5'
		onClick={()=>router.replace('/dashboard')}
		>Go Home</Button>
	</div>
  )
}

export default Feedback