"use client"
import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAI'
import {  LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { mockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'

  

function AddNewInterview() {

	const [openDialogue, setOpenDialogue] = useState(false)
	const [jobPosition, setJobPosition] = useState()
	const [jobDescription, setJobDescription] = useState()
	const [jobExperience, setJobExperience] = useState()
	const [loading, setLoading] = useState(false)
	const [jsonResponse, setJsonResponse] = useState([])
	const {user} = useUser()

	const onSubmit = async(e) => {
		setLoading(true)
		e.preventDefault()
		// console.log(jobPosition, jobDescription, jobExperience)
		
		const inputPrompt = `Job Position: ${jobPosition}, 
		Job Description: ${jobDescription}, 
		Years of Experience: ${jobExperience}., 
		as a professional human resources manager specialized in conducting interviews, 
		based on the information please provide me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. 
		 example: {question: "what is your name?", answer: "my name is John Doe"}. you dont have to give a label to the initial JSON object.`
		
		const res = await chatSession.sendMessage(inputPrompt)
		
		// console.log(JSON.parse(res.response.text()))
		setJsonResponse((res.response.text()))

		if(res.response.text()){

			const response = await db.insert(mockInterview)
			.values({
				mockId: uuidv4(),
				jsonMockResp: res.response.text(),
				jobPosition: jobPosition,
				jobDesc: jobDescription,
				jobExperience: jobExperience,
				createdBy: user?.primaryEmailAddress?.emailAddress,
				createdAt: moment().format('DD-MM-yyyy')
			}).returning({mockId:mockInterview.mockId})
			
			console.log("Inserted Id: ", response)
			setLoading(false)
			setOpenDialogue(false)
		}else{
			setLoading(false)
			setOpenDialogue(false)
			console.log("Error")
		}

		
	}
  return (
	<div>
		<div 
		onClick={() => setOpenDialogue(true)}
		className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all">
			<h2 className="font-bold text-lg text-center">+ Add New</h2>
		</div>

		<Dialog open={openDialogue}> 
			
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
				<DialogTitle className='text-2xl'> Tell us about your Inverviewer</DialogTitle>
				<DialogDescription>
					<form onSubmit={onSubmit}
					
					>

				<div>
				
					<h2>Add details about your Job Position/Role, Job Description and Years of Experience</h2>
					<div className='mt-7 my-2'>
						<label >Job Role/Position</label>
						<Input 
						onChange={(e) => setJobPosition(e.target.value)}
						placeholder="Enter Job Role/Position" required/>
					</div>
					<div className='mt-7 my-2'>
						<label >Job Description</label>
						<Textarea 
						onChange={(e) => setJobDescription(e.target.value)}
						placeholder="Enter Job Description" required/>
					</div>
					<div className='mt-7 my-2'>
						<label >Experience in Years</label>
						<Input 
						onChange={(e) => setJobExperience(e.target.value)}
						placeholder="Enter Job Experience in Years" type='number' min="0" max="50" required/>
					</div>
				</div>
					<div className="flex gap-5 justify-end">
						<Button
						type="button" 
						variant="ghost"
						onClick={() => setOpenDialogue(false)}>Cancel</Button>
						<Button type="submit" disabled={loading}>
							{loading ? <LoaderCircle className="animate-spin"/> : 'Start Interview'}
							</Button>
					</div>
						</form>

				</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>


	</div>
  )
}

export default AddNewInterview