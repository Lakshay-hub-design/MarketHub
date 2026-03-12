import { createBrowserRouter } from 'react-router'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import VerifyEmail from '../features/auth/pages/VerifyEmail'
import Home from '../features/auth/home/pages/Home'

export const router = createBrowserRouter([
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/verify-email',
        element: <VerifyEmail />
    },
    {
        path: '/home',
        element: <Home />
    }
])