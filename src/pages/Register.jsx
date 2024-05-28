import { useState } from "react"
//conectamos el frontend con el backend -> axios
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const { name, email, password } = data
    try {
      const { data } = await axios.post('/auth/register', {
        name, email, password
      })   //le pasamos el user (name,email,password) al endpoint de register 

      //ahora mostramos los errores del json generados
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Registration Succeful!')
        //redirect to a page
        navigate('/login')
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
          <h2 className="text-center mb-4">REGISTER</h2>
          <form onSubmit={registerUser}>
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input type="text" className="form-control" placeholder='enter name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input type="email" className="form-control" placeholder='enter email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" placeholder='enter password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

            </div>
            <button type="submit" className="btn btn-primary btn-block">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}
