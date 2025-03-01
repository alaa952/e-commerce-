import React, { useContext, useEffect, useState } from 'react'
import style from './Payment.module.css'
import axios from 'axios';
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Payment() {
 let Navigate = useNavigate();
 const [isOnline, setisOnline] = useState(false)
  let {cardId , allProducts , setallProducts ,setnumOfItem , setttotalprice}=useContext(CartContext)
 async function cashOrder(val){
    console.log(val);
   let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,
    {
      shippingAddress:val
    }, {
      headers:{
        token:localStorage.getItem('usetoken')
      }
    })
    if(data.status=='success'){
      toast.success('product will come soooon...')
      setnumOfItem(null)
      setttotalprice(null)
      setallProducts(null)
      Navigate('/Cart')
    }
    console.log(data);
    
  }
async function payOnline(val){
 let{data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:5173`,{
    shippingAddress:val
   } , 
   {
    headers:{        
       token:localStorage.getItem('usetoken')     
    }
   })
   console.log(data);
   if(data.status == 'success'){
    window.open(data.session.url)
   }
} 
function detectPayment(val){
if(isOnline){
  payOnline(val)
} else{
  cashOrder(val)
}
}
  let formik = useFormik({
      initialValues: {
        details: '',
        phone: '',
        city: '',
      },
      
      onSubmit: detectPayment,
    })
  const [count, setcount] = useState(0)
 useEffect(()=>{

 })
  return (
   <>
   <h2 className='text-center text-green-600 py-2'></h2>
   <form onSubmit={formik.handleSubmit} className="max-w-md mb-2 mt-5 mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Details</label>
          </div>
      
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Phone</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the City</label>
          </div>
          <button onClick={()=>{setisOnline(false)}} type="submit" className="text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Pay Cash </button>
          <button onClick={()=>{setisOnline(true)}} type="submit" className="text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto   ms-3 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Pay Online </button>

        </form>
  </>
  )
}
