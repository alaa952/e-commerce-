import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export let CartContext =createContext()
export default function CartContextProvider (props){
    const [totalprice, setttotalprice] = useState(0)
    const [cardId, setcardId] = useState(0)
    const [numOfItems, setnumOfItem] = useState(0)
    const [allProducts, setallProducts] = useState([]) 
    
let headers = {
    token:localStorage.getItem('usetoken')
}
    function AddToCart(id){
     return  axios.post('https://ecommerce.routemisr.com/api/v1/cart' , 
        {
        productId:id  
        } ,
        { 
            headers
         }) 
         .then((resp)=>{
            getCartItem()
            return resp;
         })
         .catch((errors)=>{console.log(errors)
            return errors;
         })
    }

   function getCartItem(){
     axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers
     })
     .then((resp)=>{console.log(resp);
      setttotalprice(resp.data.data.totalCartPrice)
      setnumOfItem(resp.data.numOfCartItems)
      setallProducts( resp.data.data.products)
      setcardId(resp.data.cartId)
     })
     .catch((error)=>{ console.log(error)
     })
   }

   function UpdatCartItem(id , count){
      axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id} `,
       {
         count : count
       } ,
       {
         headers
      })
      .then((resp)=>{console.log(resp);
       setttotalprice(resp.data.data.totalCartPrice)
       setnumOfItem(resp.data.numOfCartItems)
       setallProducts( resp.data.data.products)
       setcardId(resp.data.cartId)
      })
      .catch((error)=>{ console.log(error)
      })
    }

    function DeleteItem(id){
      axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
         headers
      })
      .then((resp)=>{console.log(resp);
       setttotalprice(resp.data.data.totalCartPrice)
       setnumOfItem(resp.data.numOfCartItems)
       setallProducts( resp.data.data.products)
       setcardId(resp.data.cartId)
      })
      .catch((error)=>{ console.log(error)
      })
    }
    
   useEffect(()=>{
      getCartItem();
   },[])
    return <CartContext.Provider value={{AddToCart , getCartItem , allProducts , setallProducts , setnumOfItem , setttotalprice, totalprice , numOfItems , UpdatCartItem , DeleteItem ,cardId}}>
     {props.children}
    </CartContext.Provider>
}