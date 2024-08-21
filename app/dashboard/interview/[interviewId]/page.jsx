"use client"
import { mockInterview } from '@/utils/schema'
import React, {useEffect} from 'react'
import { db } from '@/utils/db'
import {eq} from 'drizzle-orm'
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Interview({params}) {

	const [interviewData, setInterviewData] = React.useState()
	const [webcamEnabled, setWebcamEnabled] = React.useState(false)

	useEffect(() => {
		// console.log(params.interviewId)
		getInterviewDetails()
	  	}, [])

	const getInterviewDetails = async() => {
		const result = await db.select().from(mockInterview)
		.where(eq(mockInterview.mockId, params.interviewId))
		// console.log(result[0])
		setInterviewData(result[0])
	}
	
  return (
	<div className='my-10 '>
		<h2 className='font-bold text-2xl'>Let's get started</h2>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
		<div className='flex flex-col my-5  '>
			<div className='flex flex-col p-5 gap-5 rounded-lg border'>

			<h2 className='text-lg font-medium'>Job Role/Position: <strong>{interviewData.jobPosition}</strong></h2>
			<h2 className='text-lg font-medium'>Job Description: <strong>{interviewData.jobDesc}</strong></h2>
			<h2 className='text-lg font-medium'>Experience: <strong>{interviewData.jobExperience}</strong></h2>
			</div>
			<div className='p-5 border rounded-lg bg-yellow-100 border-yellow-300 mt-2'>
				<h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb className=''/><strong></strong>Information</h2>
				<h2 className='mt-3 text-yellow-500 text-sm'>{`Enable webcam and microphone to start your AI Interview. This session will have 5 questions 
				which you can answer and in the end you will get a report based on your answer. NOTE: the webcam feed is
				not being recorded from our end. you can disable the camera any time`} </h2>
				
			</div>
		</div>
		<div>
		{ webcamEnabled ? <Webcam 
		onUserMedia={() => setWebcamEnabled(true)}
		onUserMediaError={() => setWebcamEnabled(false)}
		mirrored={true}
		style={{width:300,
			height:300,
		}}
		/> : 
		<div className='flex flex-col items-center '>
		<WebcamIcon className=' my-7 h-72 w-full p-10 bg-secondary rounded-lg border'/>
		<Button 
		variant='outline'
		className='border-primary text-primary'
		onClick={() => setWebcamEnabled(true)}>Enable webcam and mic</Button>
		</div>
			}
		</div>	
		</div>
		<div className='flex justify-end items-end'>

			<Button>Start Interview</Button>
		</div>
		
	</div>
  )
}

export default Interview