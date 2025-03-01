import { Navigate, useNavigate } from "react-router-dom"

export default function ProtectRoutes(props){
    // console.log(localStorage.getItem("usetoken"));
    console.log(props.children)
if(localStorage.getItem("usetoken")){
 return props.children
}
else{
    return <Navigate to={"/login"}/>
}
}