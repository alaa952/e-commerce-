import React, { useContext,useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Slider from 'react-slick';

 export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
  const[productDetails, setproductDetails] = useState(null)
  let {id} = useParams();
  console.log(id);
  
  async function GetProductDetails(id) {
     let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
     console.log(data.date);
     setproductDetails(data?.data)
     
   }
  
 useEffect(()=>{
   GetProductDetails(id)
 },[])
  return (
   <>
   <div className="container">
    <div className="flex mb-5 mt-5">
      <div className="w-1/4">
      <Slider {...settings}>
     {productDetails?.images.map((src)=>{ return   <div>
       <img src={src} className='w-full' alt="" />
       </div>})}
      </Slider>
      </div>
      <div className="w-3/4 mt-14">
      <div className=' p-10'>
      <h4 className='text-2xl font-bold my-4'>{productDetails?.title.split(' ').slice(0,2).join(' ')}</h4>
     <h5 className='text-green-600 text-lg mb-2'>{productDetails?.description}</h5>
       <div className='flex justify-between'>
            <span>{productDetails?.price} EGP</span>
            <span><i className='fas fa-star text-yellow-400'></i>{productDetails?.ratingsAverage}</span>
      </div> 
      <button onClick={()=>{addProductToCart(productDetails._id)}} className='btn mt-3 '>Add To Cart</button>
      </div>
      </div>
    </div>
   </div>
   </>
  )
}
