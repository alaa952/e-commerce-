import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Register from './component/Register/Register';
import Products from './component/Products/Products';
import Login from './component/Login/Login';
import Brands from './component/Brands/Brands';
import Categries from './component/Categries/Categries';
import Notfound from './component/Notfound/Notfound';
import Logout from './component/Logout/Logout';
import { UserContextProvider } from "./Context/UserContext";
import UpdatePassword from './component/UpdatePassword/UpdatePassword';
import ForgetPassword from './component/ForgetPassword/ForgetPassword';
import ProductDetails from './component/ProductDetails/ProductDetails';
import ProtectRoutes from './component/ProtectRoutes/ProtecrRoutes';
import AuthView from './component/AuthView/AuthView';
import BrandsDetails from './component/BrandsDetails/BrandsDetails';
import Cart from './component/Cart/Cart';
import CartContextProvider from './Context/CartContext'
import Payment from './component/Payment/Payment';
import AllOrders from './component/allOrders/allOrders';


let routes = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element:<ProtectRoutes><Home/></ProtectRoutes>},
      { path: 'products', element:<ProtectRoutes><Products/></ProtectRoutes>},
      { path: 'brands', element:<ProtectRoutes><Brands/></ProtectRoutes>},
      { path: 'categries', element:<ProtectRoutes><Categries/></ProtectRoutes>},
      {path:'cart' , element:<ProtectRoutes><Cart/></ProtectRoutes>},
      { path: 'productdetails/:id/', element:<ProtectRoutes><ProductDetails/></ProtectRoutes>},
      {path:'payment' , element:<ProtectRoutes><Payment/></ProtectRoutes>},
      {path:'allorders' , element:<ProtectRoutes><AllOrders/></ProtectRoutes>},
      { path: 'updatepassword', element:<AuthView><UpdatePassword/></AuthView>},
      { path: 'forgetPassword', element: <AuthView><ForgetPassword/></AuthView>},
      { path: 'login', element:<AuthView><Login/></AuthView>},
      { path: 'register', element:<AuthView><Register/></AuthView>},
      {path: 'branddetails/:id' , element:<BrandsDetails/>},
      { path: '*', element: <Notfound/>},
    ]
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CartContextProvider>
      <UserContextProvider>

        <RouterProvider router={routes} />

      </UserContextProvider>
      </CartContextProvider>
    </>
  )
}

export default App
