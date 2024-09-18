import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar'
import Home from '@pages/home'
import Login from '@pages/auth/login'
import Profile from '@pages/profile'
import MisRecetas from '@pages/MisRecetas'
import Recetas from '@pages/otrasrecetas'
import { fetchValidateToken } from './lib/slice/authSlice';
import './assets/app.css'

function App() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {  
      const response = await dispatch(fetchValidateToken());
      console.log(response);
    }
    fetchData();
  }, [])

  return (
    <Router>
      {user &&
        <ResponsiveAppBar />      
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mis recetas' element={<MisRecetas />} />
        <Route path='/recetas' element={<Recetas />} />
        <Route path='/perfil' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
