import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
 export default function ProductDetails() {
  const[brandtDetails, setbrandDetails] = useState(null)
  let {id} = useParams();
  console.log(id);
   
  async function GetBrandDetails(id) {
     let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
     console.log(data.date);
     setbrandDetails(data?.data) 
   }
  
 useEffect(()=>{
    GetBrandDetails(id)
 },[])
  return (
   <>
   <div className="container">
    <div className="flex">
      <div className="w-1/4">
      <img src={brandtDetails?.image} className='w-full' alt="" />
      </div>
      <div className="w-3/4 mt-14">
      <div className=' p-10 '>
      <p className='text-center'>{brandtDetails?.name}</p>
      </div>
      </div>
    </div>
   </div>
   </>
  )
}
