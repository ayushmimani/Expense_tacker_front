import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adduser } from "../../Slice/UserSlice";
//const apiurl = import.meta.env.VITE_API_URL;
const Login = () => {

 const [login,setLogin]  = useState({
    email:'',
    password:'',
    gender:'',
    name:''
 });

 const [isnewuser,setisnewuser]=useState(false);
  const navigate = useNavigate();
  const dispatch =useDispatch();
 const handlelogin = (e)=>{

  setLogin((prev)=>({
      ...prev,
      [e.target.name]: e.target.value 
   })
  )
 }

 const handlesubmit =async (e)=>{

     e.preventDefault();
 let url;
    if(isnewuser){
      url = "http://localhost:3000/api/auth/register"
    }else{
      url="http://localhost:3000/api/auth/login/";
    }


  try {
      const result =await fetch(url,{
      method:"POST",
      credentials: "include", 
      headers:{
       "Content-Type":"application/json"
      },
     body: JSON.stringify(login),
     })
    
     const data = await result.json();   

     if(data.status){
      
      toast(data.message);
      // settoken in cookies
      dispatch(adduser(data.data))
      navigate("/dashboard")
      // redirect

      // set user info in redu ers
     }else{
      toast(data.message)
     }
     
  } catch (error) {
    console.log(error);
    
  }
   
 }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{isnewuser ? `Hi`: "Welcome back"}</h1>
          <p className="text-sm text-gray-500 mt-1">{isnewuser ? "Sign up for the new account" : "Sign in to your account"}</p>
        </div>

   {isnewuser &&  <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            
            onChange={handlelogin}
            placeholder="ayush"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
}
         
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            name="email"
            
            id="email"
            onChange={handlelogin}
            placeholder="example@gmail.com"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            
             onChange={handlelogin}
            placeholder="••••••••"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {isnewuser && <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            id="gender"
             onChange={handlelogin}
            placeholder="Gender"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>}



        <div>
          <input
            type="submit"
            onClick={handlesubmit}
            value={isnewuser ? "Sign up" :"Sign in"}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg py-2.5 text-sm transition cursor-pointer"
          />
        </div>
        <p className="cursor-pointer" onClick={()=>setisnewuser((prev)=>!prev)}>{isnewuser ? " Already have account " :"New User"}</p>
      </form>
    </div>
  )
}

export default Login