const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth.routes')

const app = express()

app.use(helmet())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: 'MarketHub API running'
    })
})

app.use('/api/v1/auth', authRoutes)


module.exports = app
