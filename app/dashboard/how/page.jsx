import React from 'react'
import { AtomIcon, BookDashed, BrainCircuit, BrainIcon, Edit, Share2 } from 'lucide-react'

function page() {
  return (
	<div>
		<section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
<h2 className="font-bold text-3xl">How it Works?</h2>
<h2 className="text-md text-gray-500">Give mock interview in just 3 simplar easy step</h2>

<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	<a
	  className="block rounded-xl border bg-white
	   border-gray-200 p-8 shadow-xl transition
	   hover:border-pink-500/10 hover:shadow-pink-500/10"
	  href="#"
	>
	 <AtomIcon className='h-8 w-8 text-primary'/>

	  <h2 className="mt-4 text-xl font-bold text-black">Create a new interview</h2>

	  <p className="mt-1 text-sm text-gray-600">
		Fill in the details about the interview like the job role, job description, your expeience and click generate.
	  </p>
	</a>

	<a
	  className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
	  href="#"
	>
	<BrainIcon className='h-8 w-8 text-primary'/>

	  <h2 className="mt-4 text-xl font-bold text-black">AI interview generation </h2>

	  <p className="mt-1 text-sm text-gray-600">
		based on the details you provided, AI will generate a mock interview for you. you can see the questions and answer them by voice.
		
	  </p>
	</a>

	<a
	  className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
	  href="#"
	>
	<Share2 className='h-8 w-8 text-primary' />

	  <h2 className="mt-4 text-xl font-bold text-black">Feedback </h2>

	  <p className="mt-1 text-sm text-gray-600">
		After going through the interview, you can see the feedback and suggestions to improve your interview skills.
	  </p>
	</a>

	<a
	  className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
	  href="#"
	>
	<BookDashed className='h-8 w-8 text-primary' />

	  <h2 className="mt-4 text-xl font-bold text-black">Dashboard </h2>

	  <p className="mt-1 text-sm text-gray-600">
		In the dashboard, you can see the history of the interviews you have given, the feedback and the suggestions to improve your interview skills.
	  </p>
	</a>


  
  </div>

  

  </section>
	</div>
  )
}

export default page