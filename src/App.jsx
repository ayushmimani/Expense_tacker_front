import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Dashboard from './component/Dashboard'
import Report from './component/Report'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
 <BrowserRouter>
  <Navbar/>
  <Routes>
     <Route path="/" element={<Dashboard/>}></Route>
     <Route path="/report" element={<Report/>}/>
  </Routes>
 </BrowserRouter>


     <ToastContainer />
 
    </>
  )
}

export default App
