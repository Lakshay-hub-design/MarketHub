const errorHandler = (err, req, res, next) => {
    console.error(err)

    res.status(err.statuscode || 500).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error'
        }
    })
}

module.exports = errorHandler