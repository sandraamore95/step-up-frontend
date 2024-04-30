import { useState } from "react"
import '../styles/Login.css'
//conectamos el frontend con el backend -> axios
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })



  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email, password
      })   //le pasamos el user (email,password) al endpoint de login
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-image-container">
          {/* Imagen de fondo de unas zapatillas */}
          <img src="https://www.mumka.es/cdn/shop/files/estiloverticalweb_12.png?v=1694191013&width=600" className="img-fluid" alt="Shoes" />
        </div>
        <div className="col-md-6 login-form-container">
          {/* Formulario de inicio de sesión */}
          <h2 className="text-center mb-4">LOGIN</h2>
          <form onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input type="email" className="form-control" placeholder='enter email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" placeholder='enter password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}


