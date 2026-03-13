import React, { useEffect, useRef, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { MdMarkEmailRead } from "react-icons/md";
import { useAuth } from '../hooks/useAuth';
import { useLocation, Link } from 'react-router';

const VerifyEmail = () => {
  const OTP_LENGTH = 6
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""))
  const [timer, setTimer] = useState(30)

  const { handleVerifyEmail, handleResendOtp, loading, error } = useAuth()
  const inputRef = useRef([])

  const location = useLocation()
  const email = location.state?.email


  useEffect(() => {
    if(timer === 0) return

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])
  

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    console.log(newOtp)

    if(value && index < OTP_LENGTH - 1){
      inputRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) =>{
     if (e.key === "Backspace") {

      if (!otp[index] && index > 0) {
        inputRef.current[index - 1].focus();
      }
    }

    if(e.key === 'ArrowLeft' && index > 0){
      inputRef.current[index - 1].focus()
    }

    if(e.key === 'ArrowRight' && index < OTP_LENGTH - 1){
      inputRef.current[index + 1].focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').trim()

    if(!/^\d+$/.test(pasted)) return

    const digits = pasted.slice(0, OTP_LENGTH).split('')

    const newOtp = [...otp]

    digits.forEach((digit, i) => {
      newOtp[i] = digit
    })

    setOtp(newOtp)

    inputRef.current[digits.length - 1]?.focus()
  }

  const handleSubmit = () =>{
    const otpValue = otp.join("")
    handleVerifyEmail({ email, otp: otpValue })
  }

  const handleResend = () =>{
    handleResendOtp(email)
  }


  return (
    <main className='w-full min-h-screen bg-[#060606] text-white flex flex-col px-6'>
      <div className="flex items-center gap-3 pt-6">
        <Link to={'/register'}>
          <BsArrowLeft className="cursor-pointer" />
        </Link>
        <div className="flex items-center gap-2 mx-auto">
          <div className="bg-blue-500 p-2 rounded-lg">
            🏪
          </div>
          <h2 className="text-lg font-semibold">marketHub</h2>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center text-center flex-1'>
        <div className='bg-[#0e193b] p-8 rounded-full mb-8'>
          <MdMarkEmailRead size={50} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-300 max-w-sm mb-10">
          We've sent a 6-digit code to your email.
          Please enter it below to verify your account.
        </p>
        
        <div className='flex gap-4 mb-8'>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRef.current[index] = el)}
              type="text"
              value={digit}
              maxLength="1"

              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}

              onPaste={handlePaste}

              className="w-10 text-center bg-transparent border-b-2 border-gray-500 text-2xl focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button 
        onClick={handleSubmit}
        className='w-full max-w-sm bg-blue-500 hover:bg-blue-600 py-4 rounded-xl mb-8 text-lg font-semibold shadow-lg'>
          Verify Email
        </button>

        <p className="text-gray-400">
          Didn't receive the code?{" "}
          {timer > 0 ? (
            <span className="text-gray-400">
              Resend code in <span className="text-blue-400">{timer}s</span>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-400 cursor-pointer"
            >
              Resend Code
            </button>
          )}
        </p>
        
      </div>
    </main>
  )
}

export default VerifyEmail
