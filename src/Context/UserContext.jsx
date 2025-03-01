import { useEffect } from "react";
import { createContext, useState } from "react";

export let UserContext = createContext(0);

export function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(null);
  useEffect(()=>{
    if(localStorage.getItem('usetoken')!==null){
        setuserLogin(localStorage.getItem('usetoken') )
    }
  },[])
  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
