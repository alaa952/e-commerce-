import React, { useContext, useEffect, useState } from 'react'
import style from './Register.module.css'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  let {setuserLogin} = useContext(UserContext)

  const [errorApi, seterrorApi] = useState(null)
  let navigate = useNavigate();
  function handleSubmit(values) {
    // console.log(values)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values) 
      .then((response) => {
        //  console.log(response);
        if (response.data.message = 'success') {
          console.log(response.data.token)
          localStorage.setItem('usetoken', response?.data?.token)
          setuserLogin(response?.data?.token)
          navigate('/login')
        }
      })
      .catch((error) => {
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
    name: Yup.string().required('Name Is Required').min(4, 'Minimum 3 letters').max(7, 'Maximum 7 Letters'),
    email: Yup.string().required('Email Is Required').email('invalid Email'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,5}$/, 'Invalid Password').required('Password is Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Invalid Repassword').required('Repassword Is Required'),
    phone: Yup.string().required('The Number Of Phone Is Required').matches(/^01[0125][0-9]{8}$/, 'Invalid Phone Number'),
  })
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
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

      <div className="container">
        <h2 className='text-green-600 text-2xl text-center'>Register Now</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md mb-2 mt-5 mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name</label>
          </div>
          {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}
          </div> : null}
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
          </div>
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> : null}
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the password</label>
          </div>
          {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div> : null}
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the repassword</label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.rePassword}
          </div> : null}
          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
          </div>
          {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
          </div> : null}
          {errorApi ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errorApi}
          </div> : null}
          <button type="submit" className="text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </form>
      </div>
    </>
  )
}
