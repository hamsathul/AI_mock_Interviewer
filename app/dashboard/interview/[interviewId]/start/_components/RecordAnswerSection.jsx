"use client"
import { Button } from '@/components/ui/button'
import { Mic, Mic2, StopCircle } from 'lucide-react'
import Image from 'next/image'
import React, {useEffect} from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAI'
import { UserAnswers } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { db } from '@/utils/db'



function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {

	const [userAnswer, setUserAnswer] = React.useState('')
	const {user} = useUser()
	const [loading, setLoading] = React.useState(false)

	const {
		error,
		interimResult,
		isRecording,
		results,
		startSpeechToText,
		stopSpeechToText,
	  } = useSpeechToText({
		continuous: true,
		useLegacyResults: false
	  });

	  useEffect(() => {
		results.map((result) => {
			setUserAnswer(prevAns=>prevAns+result?.transcript)
		})
	  }, [results])

	  useEffect(() => {
		if(!isRecording&&userAnswer.length>10){
			updateUserAnswerInDb()
		}
	  }, [userAnswer])

	const startStopRecording = () => {
		if(isRecording){			
			stopSpeechToText()			
		}
		else{
			startSpeechToText()
		}
	}

	const updateUserAnswerInDb=async()=>{
		console.log(userAnswer)
		setLoading(true)
			const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}
			Depending on the question and users answer, provide a rating from 1-5 and feedback on areas of improvement if any.
			provide the feed back in three to five lines in JSON format. 
			example: {rating: 4, feedback: "good answer but you can improve on your communication skills"}
			`

			const result = await chatSession.sendMessage(feedbackPrompt)
			
			const mockJsonResp = result.response.text()
			console.log(mockJsonResp)
			const jsonFeedback = JSON.parse(mockJsonResp)
			const res = await db.insert(UserAnswers)
			.values({
				mockIdRef: interviewData.mockId,
				question: mockInterviewQuestion[activeQuestionIndex]?.question,
				correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
				userAns: userAnswer,
				feedback: jsonFeedback?.feedback,
				rating: jsonFeedback?.rating,
				userEmail: user.primaryEmailAddress.emailAddress,
				createdAt: moment().format('DD-MM-yyyy')
			})
			if(res){
				toast.success('Answer recorded successfully')
			}
			setUserAnswer('')
			setLoading(false)
	}

  return (
	<div className='flex flex-col items-center justify-center'>
		<div className='flex flex-col justify-center items-center bg-black border border-secondary my-10 '>
			<Image src='/webcam.png' width={200} height={200}
			className='absolute'
			/>
			<Webcam	
			mirrored={true}
			style={{
				height: 300,
				width: '100%',
				zindex: 10,
			}}
			/>
		</div>
		<div className='flex gap-4 flex-col mb-4'>

		<Button
		disabled={loading}
		onClick={startStopRecording}
		variant='outline'
		className={` text-primary transition-all ${isRecording ? 'border-red-500':'border-primary'}`}>
		{!isRecording?<h2 className=' text-primary flex gap-2'><Mic />&nbsp;Start Recording</h2 >:<h2 className='text-red-500 animate-pulse flex gap-2'><StopCircle />&nbsp;Stop Recording</h2>}
		
		</Button>
		</div>
		 
	</div>
  )
}

export default RecordAnswerSection