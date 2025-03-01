import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios';
import Spinner from './../Spinner/Spinner';
import { Link } from 'react-router-dom';
export default function Brands() {
  const [brands, setbrands] = useState(null)
  async function getAllBrands(){
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    // console.log(data.data);
    setbrands(data.data)
   }
 useEffect(()=>{
  getAllBrands()
 },[])

  return (
  <>
 
  {brands? 
  <div className="container px-10 mx-auto py-10">
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
    {brands.map((prod)=> 
    <div key={prod._id} className="products group p-3 overflow-hidden hover:shadow shadow-green-500/80 hover:shadow-green-500/80">
    <Link to={`/branddetails/${prod._id}`}>
    <img src={prod.image} className='w-full' alt='' />
    <p className='text-center'>{prod.name}</p>
    </Link>
    </div>)}
    </div>
    </div> :<Spinner/>}
  

  </>
  )
}
