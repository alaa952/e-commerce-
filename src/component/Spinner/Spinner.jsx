import React, { useEffect, useState } from 'react'
import style from './Spinner.module.css'
import { Bars } from 'react-loader-spinner';
export default function Spinner() {
  const [count, setcount] = useState(0)
 useEffect(()=>{

 })
  return (
    <>
    <div className='py-10 h-screen flex justify-center items-center'>
    <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
    </>
  )
}
