import React, { useContext, useEffect, useState } from 'react'
 import style from './Login.module.css'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Login() {
let {getCartItem}=  useContext(CartContext)
  let{setuserLogin}= useContext(UserContext)
 const [errorApi,seterrorApi] = useState(null)
 let navigate = useNavigate();
    function handleSubmit(values) { 
    // console.log(values)
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      .then((response)=>{
          //  console.log(response);
          if(response.data.message='success'){
            console.log(response.data.token)
            localStorage.setItem('usetoken' , response?.data?.token)
            setuserLogin( response?.data?.token)
            getCartItem()
            navigate('/')
          }
      })
      .catch((error)=>{
          console.log(error?.response?.data?.message);
          seterrorApi(error?.response?.data?.message);
      })
  }
  // function handleValidation(values){
  //     let errors ={}
  //     if(values.name=''){
  //       errors.name='Name Is Required'
  //     }
  //     else if(!/^ [A-z][a-z]{3,5}$/.test(values.name)){
  //       errors.name='Name Must Start With Capital Letter Min 3 Max 5 Characters '
  //     }
  //     if(values.email=''){
  //       errors.email='Email Is Required'
  //     }
  //     else if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(values.email)){
  //       errors.email='Invalid Email'
  //     }
  //     if(values.password=''){
  //       errors.password='Password Is Required'
  //     }
  //     else if(!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)){
  //      errors.password='password should contain atleast one number and one special character'
  //     }
  //     if(values.rePassword=''){
  //       errors.rePassword='Repassword Is Required'
  //     }
  //     else if(!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.rePassword)){
  //      errors.rePassword='password should contain atleast one number and one special character'
  //     }
  //     if(values.phone=''){
  //       errors.phone='The Phone Number Is Required'
  //     }
  //     else if(!/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(values.phone)){
  //         errors.phone='The Number of Phone Must Have 10 Numbers'
  //     }
  //     return errors;
  // }
  let validators = Yup.object().shape({
    email: Yup.string().required('Email Is Required').email('invalid Email'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,5}$/, 'Invalid Password').required('Password is Required'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validate: handleValidation,
    validationSchema: validators,
    onSubmit: handleSubmit,
  })
  const [count, setcount] = useState(0)
  useEffect(() => {

  })
  return (
    <>

      <div className="container py-8">
        <h2 className='text-green-600 text-2xl text-center'>Login</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md py-5 mt-20 mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
          </div>
         {formik.errors.email && formik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> :null}
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the password</label>
          </div>
          {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>: null}
          {errorApi?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errorApi}
          </div>:null}
          <Link to="/forgetpassword" className='text-black hover:text-green-600'> Forget Password ?</Link>
          <br />
           <button type="submit" className="text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </form>
      </div>
      
    </>
  )
}

