"use client"
import { Button } from '@/components/ui/button'
import { Mic, Mic2 } from 'lucide-react'
import Image from 'next/image'
import React, {useEffect} from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';


function RecordAnswerSection() {

	const [userAnswer, setUserAnswer] = React.useState()

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
		<Button
		onClick={isRecording?stopSpeechToText:startSpeechToText}
		variant='outline'
		className={` text-primary transition-all ${isRecording ? 'border-red-500':'border-primary'}`}>
		{isRecording?<h2 className=' text-red-600 flex gap-2'><Mic className='animate-pulse' />&nbsp;Recording...</h2>:<h2>Record Answer</h2>}
		
		</Button>
		<Button
		onClick={() => alert(userAnswer)}
		>Show user answer</Button>
		 
	</div>
  )
}

export default RecordAnswerSection