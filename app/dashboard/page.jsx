import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

function Dashboard() {
  return (
	<div className="p-10">
		<h2 className="font-bold text-2xl">Dashborad</h2>
		<h2 className="text-gray-500">Create and start your AI Interview</h2>
		<div className="grid grid-cols-1 md:grid-cols-3 my-5">
			<AddNewInterview/>
		</div>
	</div>
  )
}

export default Dashboard