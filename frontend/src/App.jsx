import React from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// NuLhWKKwhushRUi2
const App = () => {
  const user= useSelector((state)=>state.auth)
  console.log(user)
  return (
    <BrowserRouter>
    <main>
      <Navbar/>
      <Login/>
    </main>
    </BrowserRouter>
  )
}

export default App