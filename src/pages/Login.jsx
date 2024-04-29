import { useState } from "react"
//conectamos el frontend con el backend -> axios
import axios from 'axios'
import {toast} from'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  
  const navigate=useNavigate();
  
  const [data ,setData]=useState({
    email:'',
    password:''
   })



  const loginUser = async(e)=>{
    e.preventDefault()
    const {email,password}=data
    try {
      const {data}=await axios.post('/login',{
          email, password
      })   //le pasamos el user (email,password) al endpoint de login
     if(data.error){
      toast.error(data.error)
     }else{
      setData({})
      navigate('/dashboard')
     }
    } catch (error) {
      console.log(error)
    }
    
  }
  


  return (
    <div>
    <h2>LOGIN</h2>
    <form onSubmit={loginUser}>
      <label  htmlFor="">Email</label>
      <input type="email" placeholder='enter email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />
      <label htmlFor="">Password</label>
      <input type="password" placeholder='enter password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
      <button type="submit">Login</button>
    </form>
  </div>
  )
}
