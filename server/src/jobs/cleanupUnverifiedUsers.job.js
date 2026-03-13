const cron = require('node-cron')
const userModel = require('../models/user.model')

const cleanupUnverifiedUsers = () => {

 cron.schedule("0 * * * *", async () => {
    try {
        const result = await userModel.deleteMany({
            isVerified: false,
            createdAt: {
                $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        })
        console.log(`Deleted ${result.deletedCount} unverified users`)
    } catch (error) {
        console.error("Cron job error:", error)
    }
 })   

}

module.exports = cleanupUnverifiedUsers