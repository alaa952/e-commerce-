import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'
export default function Footer() {
  const [count, setcount] = useState(0)
 useEffect(()=>{

 })
  return (
   <footer className='bg-gray-300 p-4'>
    <div className="container ">
      <h2 className='text-3xl text-[#212529]'>Get The FreshCart App </h2>
      <p className='text-[#6d767e] font-light mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, qui?</p>
      <div className="flex mb-5">
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block grow me-3 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Email" required />
        <button className='bg-green-500 p-2 text-white rounded'>Share App Link</button>
      </div>
      <div className="partner flex justify-between py-6 border-y-2">
        <div className="payments">
          <p>Payment Parteners </p>
        </div>
        <div className="app">
            <p>Get with freshCart</p>
          </div>
      </div>

    </div>
   </footer>
  )
}
