import React, { useEffect, useState } from 'react'
import style from './Notfound.module.css'
import notfoundImage  from '../../assets/images/errors.png'
export default function Notfound() {
  const [count, setcount] = useState(0)
 useEffect(()=>{

 })
  return (
   <>
   <div className='container'>
     <img src={notfoundImage} alt="the error Page" className='w-full h-[400px]' />
   </div>
   </>
  )
}
