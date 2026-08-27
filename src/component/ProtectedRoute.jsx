import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{

    const {data:user,loading} = useSelector((store)=>store.user);


    if(loading){
        return <div>Loading</div>
    }
    
   
    
    if(!user){
        return <Navigate to="/"/>
    }


    return children;
}

export default ProtectedRoute;