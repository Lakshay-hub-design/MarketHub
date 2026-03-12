import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes.jsx'
import { AuthProvider } from './features/auth/context/AuthContext.jsx'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
