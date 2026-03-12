import React, { useState } from 'react'
import { Link } from 'react-router'
import { FiEye, FiEyeOff } from "react-icons/fi"
import { MdEmail } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { handleRegister, loading, error } = useAuth()

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handleRegister(formData)
    }

  return (
    <main className='w-full min-h-screen flex items-center justify-center bg-[#111111] text-white'>
        <div className="page-container w-full max-w-md px-6 py-8">
            <h2 className='text-center text-xl font-semibold mb-10'>MarketHub</h2>
            <div className='text-center mb-10'>
                <h1 className='text-3xl font-bold mb-2'>Create Account</h1>
                <p className='text-gray-500'>Join MarketHub to start shopping the best <br /> deals</p>
            </div>
                <form onSubmit={onSubmit} className='flex flex-col gap-5'>
                    <div className="input-group flex flex-col gap-1 relative">
                        <label htmlFor="name" className='font-medium'>Name</label>
                        <input
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name='name' id='name' placeholder='Choose a username'/>
                        <div className='absolute right-3 top-13 -translate-y-1/2 text-gray-500'>
                            <BsPersonFill />
                        </div>
                    </div>
                    <div className="input-group flex flex-col gap-1 relative">
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg bg-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" name='email' id='email' placeholder='name@example.com'/>
                       <div className='absolute right-3 top-13 -translate-y-1/2 text-gray-500'>
                        <MdEmail />
                       </div>
                    </div>
                    <div className="input-group flex flex-col gap-1 relative">
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <input
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' type={showPassword ? "text" : "password"} name='password' id='password' placeholder='Min. 8 characters'/>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-13 -translate-y-1/2 text-gray-500"
                            >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="text-right text-sm">
                        <Link className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                    disabled={loading}
                    type='submit'
                    className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-105 transition duration-300 ease-in-out'>
                        {loading ? "Creating...": "Register"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?
                        <Link to={'/login'} className="text-blue-600 ml-1 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
        </div>
    </main>
  )
}

export default Register
