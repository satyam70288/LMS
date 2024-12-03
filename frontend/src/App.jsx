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
import Sidebar from './pages/admin/Sidebar'
import DashBoard from './pages/admin/DashBoard'
import AddCourse from './pages/admin/course/AddCourse'
import CourseTable from './pages/admin/course/CourseTable'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
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
          <Courses />
          {/* courses */}
        </>
        )
      }, {
        path: "/login",
        element: <Login />
      }, {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "course-detail/:courseId",
        element: (
            <CourseDetail />
        ),
      },

      // admin
      {
        path: "/admin/",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <DashBoard />
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },

        ]
      },

    ]

  }
])
const App = () => {
  const user = useSelector((state) => state.auth)
  console.log(user)
  return (
    <main className='h-full'>
      <RouterProvider router={appRouter}>
        <Navbar />
      </RouterProvider>
    </main>
  )
}

export default App