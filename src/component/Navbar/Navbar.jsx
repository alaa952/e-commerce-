import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './../../Context/UserContext';

export default function Navbar() {
  let { userLogin , setuserLogin} = useContext(UserContext)
  let navigate =useNavigate()
  function Logout(){
    localStorage.removeItem('usetoken')
    setuserLogin(null)
    navigate('/login')
  }
  const [count, setcount] = useState(0)
  useEffect(() => {

  },[])
  return (
    <>
      <div className="Navbar flex flex-col bg-gray-300 justify-between items-center lg:flex-row">
        <div className="elemnts flex flex-col bg-gray-300 justify-between items-center lg:flex-row">
          <Link className="mx-2 py-6 text-2xl font-bold" to='home'> <i className="fa-solid fa-cart-shopping text-green-600"></i> FreshCart</Link>
          {userLogin != null ? <ul className="flex flex-col lg:flex-row items-center">
            <li className="py-4">
              <Link className="mx-2 py-6 text-lg" to='/'>Home</Link>
            </li>
            <li className="py-4">
              <Link className="mx-2 py-6 text-lg" to='products'>Products</Link>
            </li>
            <li className="py-4">
              <Link className="mx-2 py-6 text-lg" to='brands'>Brands</Link>
            </li>
            <li className="py-4">
              <Link className="mx-2 py-6 text-lg" to='categries'>Categries</Link>
            </li>
            <li className="py-4">
              <Link className="mx-2 py-6 text-lg" to='cart'>Cart</Link>
            </li>
          </ul> : ''}
        </div>
        <div className="Icons">
          <ul className='flex flex-col lg:flex-row items-center'>

            {userLogin == null ? <> <li className="py-4">
              <Link className="mx-2 py-6 text-lg" to='login'>Login</Link>
            </li>
              <li className="py-4">
                <Link className=" py-6 text-lg" to='register'>Register</Link>
              </li></> : <li className="py-4">
              <span onClick={Logout} className="mx-2 cursor-pointer py-6 text-lg" to='logout'>Logout</span>
            </li>}

            <i className="fa-brands fa-facebook px-0 mx-2 py-4 text-lg"></i>
            <i className="fa-brands fa-youtube px-0 mx-2 py-4 text-lg"></i>
            <i className="fa-brands fa-tiktok px-0 mx-2 py-4 text-lg"></i>
            <i className="fa-brands fa-spotify px-0 mx-2 py-4 text-lg"></i>
          </ul>

        </div>
      </div>

    </>
  )
}
