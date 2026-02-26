require('dotenv').config()
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { connectRedis } = require('./src/config/redis');
const errorHandler = require('./src/middlewares/error.middleware');

const PORT = process.env.PORT || 5000;


const startServer = async () => {
    await connectDB()
    await connectRedis()

    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer()