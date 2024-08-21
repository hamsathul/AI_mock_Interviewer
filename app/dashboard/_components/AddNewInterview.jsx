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

  

function AddNewInterview() {

	const [openDialogue, setOpenDialogue] = useState(false)
	const [jobPosition, setJobPosition] = useState()
	const [jobDescription, setJobDescription] = useState()
	const [jobExperience, setJobExperience] = useState()

	const onSubmit = (e) => {
		e.preventDefault()
		console.log(jobPosition, jobDescription, jobExperience)
		setOpenDialogue(false)
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
					<form onSubmit={onSubmit}>

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
						<Button type="submit">Start Interview</Button>
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