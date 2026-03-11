import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link } from 'react-router'
import { MdEmail } from "react-icons/md";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
    }

  return (
    <main className='w-full min-h-screen flex items-center justify-center bg-[#111111] text-white'>
        <div className="page-container w-full max-w-md px-6 py-8">
            <h2 className='text-center text-xl font-semibold mb-10'>MarketHub</h2>
            <div className='mb-10'>
                <h1 className='text-3xl font-bold mb-2'>Welcome back</h1>
                <p className='text-gray-500'>Login to your MarketHub account to continue shoping</p>
            </div>
                <form className='flex flex-col gap-5'>
                    <div className="input-group flex flex-col gap-1 relative">
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input className='w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 placeholder:text-blue-200' type="email" name='email' id='email' placeholder='Enter your email'/>
                        <div className='absolute right-3 top-13 -translate-y-1/2 text-blue-500'>
                            <MdEmail />
                        </div>
                    </div>
                    <div className="input-group flex flex-col gap-1 relative">
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <input className='w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 placeholder:text-blue-200' type="password" name='password' id='password' placeholder='Enter your password'/>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-13 -translate-y-1/2 text-blue-500 "
                            >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </button>
                    </div>

                    <div className="text-right text-sm">
                        <Link className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                    onClick={handleLogin}
                    className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-105 transition duration-300 ease-in-out'>Login</button>
                    <p className='text-sm -mt-4'>By clicking on Login, I accept the <span className='font-semibold'>Terms & Conditions & Privacy Policy</span></p>
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?
                        <Link to={'/register'} className="text-blue-600 ml-1 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
        </div>
    </main>
  )
}

export default Login
