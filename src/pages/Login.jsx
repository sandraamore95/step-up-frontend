import { useContext, useState } from "react"
import '../styles/Login.css'
//conectamos el frontend con el backend -> axios
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from "../context/userContext"

export default function Login() {
 
  const navigate = useNavigate();
  const location = useLocation();


  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const { loginUser } = useContext(UserContext);


  const login = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { data: userData } = response;
     

      if (userData.error) {
        toast.error(userData.error);
      } else {
        // Actualizar el contexto del usuario con los datos del usuario autenticado
        console.log(userData); //devuelve todo el objeto USER entero
        loginUser(userData)
        
        setData({}); // Limpiar los datos del formulario

        // Navegar a la página de dashboard o a cualquier otra página
        if (location.state && location.state.from) {
          navigate(location.state.from); // Redirigir al usuario a la ubicación almacenada
        } else {
          navigate('/dashboard'); // Si no hay una ubicación almacenada, redirigir al usuario a la página de inicio
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


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
          <form onSubmit={login}>
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


