import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Dashboard from './component/Dashboard'
import Report from './component/Report'
import { ToastContainer } from 'react-toastify'
import Login from "../src/component/auth/login"
import ProtectedRoute from './component/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { adduser } from './Slice/UserSlice'
const apiurl = import.meta.env.VITE_API_URL 
function App() {


  const dispatch = useDispatch();
useEffect(()=>{

  const getuserinfo= async()=>{
    const userinfo = await fetch (apiurl+"auth/me",{
      method:"POST",
      credentials:"include"
    })


    const result  =await userinfo.json();
    if(result.status){
         dispatch(adduser(result.data));
    }
  
  }

  getuserinfo()
},[])


  return (
    <>


 <BrowserRouter>
  <Navbar/>
  <Routes>
    
       <Route path="/" element={<Login/>}></Route>
       <Route path="/dashboard"  element={
          <ProtectedRoute>
                 <Dashboard/>
          </ProtectedRoute>
          }>
       </Route>
       
     <Route path="/report" element={<Report/>}/>
  </Routes>
 </BrowserRouter>


     <ToastContainer />
 
    </>
  )
}

export default App
