"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

function Header() {

	const path=usePathname();

	useEffect(() => {
		console.log(path);
	})
  return (
	<div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
		<Image src="/logo.svg" alt="logo" width={160} height={160} />
		<ul className="hidden md:flex gap-6">
			<li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
				${path === "/dashboard"&&"text-primary font-bold"}
				`}>Dashboard</li>
			<li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
				${path === "/questions"&&"text-primary font-bold"}
				`}>Questions</li>
			<li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
				${path === "/upgrade"&&"text-primary font-bold"}
				`}>Upgrade</li>
			<li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
				${path === "/how"&&"text-primary font-bold"}
				`}>How does it work?</li>
		
		</ul>
		<UserButton />
	</div>
  )
}

export default Header