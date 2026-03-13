import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes.jsx'
import { AuthProvider } from './features/auth/context/AuthContext.jsx'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />

      <Toaster 
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1f2937",
            color: '#fff'
          }
        }}
      />
    </AuthProvider>
  )
}

export default App
