import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios';
import Spinner from './../Spinner/Spinner';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
export default function Home() {

 let {AddToCart}= useContext(CartContext) 
 async function addProductToCart(id){
     let {data} = await AddToCart(id)
     console.log(data);
     if(data.status=='success'){
      toast.success(data.message ,{
        position:'top-right' 
      })
        
     }else{
      toast.success(data.message ,{
        position:'top-right' 
      })
        
     }
     
  }
  const [products, setproducts] = useState(null)
  async function getAllProduct(){
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    // console.log(data.data);
    setproducts(data.data)
   }
 useEffect(()=>{
   getAllProduct() 
 },[])

  return (
  <>
  <MainSlider/>
  <CategorySlider/>
  {products? 
  <div className="container px-10 mx-auto py-10">
    <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-6">
    {products.map((prod)=> 
    <div key={prod._id} className="products group p-3 overflow-hidden hover:shadow-sm shadow-green-500/80 hover:shadow-green-500/80">
    <Link to={`/productdetails/${prod._id}`}>
    <img src={prod.imageCover} className='w-full' alt={prod.title} />
     <h4>{prod.title.split(' ').slice(0,2).join(' ')}</h4>
     <h5 className='text-green-600'>{prod.category.name}</h5>
       <div className='flex justify-between'>
            <span>{prod.price} EGP </span>
            <span><i className='fas fa-star text-yellow-400'></i>{prod.ratingsAverage}</span>
      </div> 
    </Link>
    <button onClick={()=>{addProductToCart(prod._id)}} className='btn mt-3 duration-500 translate-y-20 group-hover:translate-y-0 '>Add To Cart</button>
    </div>)}
    </div>
    </div> :<Spinner/>}
  

  </>
  )
}
