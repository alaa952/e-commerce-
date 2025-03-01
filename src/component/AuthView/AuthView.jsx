
import { Navigate } from "react-router-dom";

 
export default function AuthView(props){
    if(localStorage.getItem("usetoken")){
       return <Navigate to={'/'}/>
    }
    else{
        return props.children 
    
    }
}


 