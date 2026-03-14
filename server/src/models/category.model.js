const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Category = mongoose.model('category', categorySchema)
module.exports = Category