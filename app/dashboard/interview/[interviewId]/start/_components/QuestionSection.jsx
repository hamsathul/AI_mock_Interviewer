import React from 'react'
import { Lightbulb, Volume2 } from 'lucide-react'

function QuestionSection({mockInterviewQuestion, activeQuestionIndex}) {

	const textToSpeech = (text) => {
		if('speechSynthesis' in window){
			const speech = new SpeechSynthesisUtterance(text)
			speech.lang = 'en-UK'
			window.speechSynthesis.speak(speech)
		}
		else{
			alert('Your browser does not support text to speech')
		}
	}
  return mockInterviewQuestion&&(
	<div className='p-5 border rounded-lg my-10'>
		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
			{mockInterviewQuestion?.map((question, index) => (
				<div key={index}>
					<h2 className={`p-2  rounded-full
					text-xs md:text-sm text-center cursor-pointer
					${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary text-primary'}
					`}>Question #{index + 1}</h2>
				</div>
			))}
		</div>
			<h2 className='my-5 text-sm md:text-lg '>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
			<Volume2 onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} className='cursor-pointer text-red-500'/>
			<div className='p-5 border rounded-lg bg-blue-100 border-blue-300 mt-5'>
				<h2 className='flex gap-2 items-center text-blue-500'><Lightbulb className=''/><strong></strong>Information</h2>
				<h2 className='mt-3 text-blue-500 text-sm'>
				{`Click on record answer when you are ready to answer the question. 
				we will record your answer and provide you with a report based on your answer.`} 
				</h2>
				
			</div>

	</div>
  )
}

export default QuestionSection