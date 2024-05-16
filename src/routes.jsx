import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { ShoesProvider } from './context/shoesContext';
import Catalog from './pages/Catalog';
import DetailShoe from './pages/DetailShoe';
import Collection from './pages/Collection';
import WishList from './pages/WishList';



export const routes = [

  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },

  // Utiliza el componente PrivateRoute para proteger la ruta '/dashboard' y /wishList
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/wishList', element: < WishList/> },



  //---------SHOESPROVIDER-----------
  { path: '/', element: <ShoesProvider><Home /></ShoesProvider> },
  { path: '/catalogo', element: <ShoesProvider><Catalog /></ShoesProvider> },
  //---------------------------------

  { path: '/detailShoe/:id', element: <DetailShoe /> },
  { path: '/collection', element: <Collection /> },
];
