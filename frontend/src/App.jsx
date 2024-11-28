import React from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
// NuLhWKKwhushRUi2
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (<>
          <HeroSection />
          <Courses/>
          {/* courses */}
        </>
        )
      }, {
        path: "/login",
        element: <Login />
      },{
        path:"my-learning",
        element:<MyLearning/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ]

  }
])
const App = () => {
  const user = useSelector((state) => state.auth)
  console.log(user)
  return (
    <main>
      <RouterProvider router={appRouter}>
        <Navbar />
      </RouterProvider>
    </main>
  )
}

export default App