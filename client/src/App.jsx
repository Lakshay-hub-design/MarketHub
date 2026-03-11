import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes.jsx'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
