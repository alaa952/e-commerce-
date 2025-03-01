import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './../Spinner/Spinner';
import { Link } from 'react-router-dom';
export default function Categries() {
  const [Categries, setCategries] = useState(null)
  async function getAllCategries(){
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    // console.log(data.data);
    setCategries(data.data)
   }
 useEffect(()=>{
  getAllCategries()
 },[])

  return (
  <>
 
  {Categries? 
  <div className="container px-10 mx-auto py-10">
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
    {Categries.map((prod)=> 
    <div key={prod._id} className="products group p-3 overflow-hidden hover:shadow shadow-green-500/80 hover:shadow-green-500/80">
    <Link to={` `}>
    <img src={prod.image} className='w-full h-[400px] rounded-sm' alt='' />
    <h5 className='text-green-600 text-center text-xl'>{prod.name}</h5>
    </Link>
    </div>)}
    </div>
    </div> :<Spinner/>}
     

  </>
  )
}
