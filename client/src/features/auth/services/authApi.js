import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

export async function register({ name, email, password }) {
    try {
        const response = await api.post('/api/v1/auth/register', {
            name, email, password
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function verifyEmail({email, otp}) {
    try {
        const response = await api.post('/api/v1/auth/verify-email', {
            email, otp 
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('/api/v1/auth/login', {
            email, password
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}