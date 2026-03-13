import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { login, register, resendOtp, verifyEmail } from "../services/authApi"
import { useNavigate } from "react-router"

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    const { user, setUser, loading, setLoading, error, setError } = context

    const handleRegister = async ({ name, email, password }) => {
        try {
            setLoading(true)
            setError(null)

            const data = await register({ name, email, password })

            setUser(data.user)

            navigate('/verify-email', {
                state: {email: email}
            })
        } catch (err) {
            setError(err.message || "Something went wrong")
        } finally{
            setLoading(false)
        }
    }

    const handleResendOtp = async (email) => {
        try {
            setLoading(true)
            setError(null)

            await resendOtp(email)
        } catch (err) {
            setError(err.message || 'Something went wrong')
        }finally{
            setLoading(false)
        }
    }

    const handleVerifyEmail = async ({ email, otp }) => {
        try {
            setLoading(true)

            await verifyEmail({ email, otp })

            navigate('/home')
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally{
            setLoading(false)
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true)
            setError(null)

            const data = await login({ email, password })

            setUser(data.user)

            navigate('/home')
        } catch (err) {
            if(err.message === 'Email not verified. OTP sent again.'){
                navigate('/verify-email', {
                    state: {email: email}
                })
                return
            }
            setError(err.message || 'Something went wrong')
        } finally{
            setLoading(false)
        }
    }

    return { user, loading, error, handleRegister, handleResendOtp, handleVerifyEmail, handleLogin}
}