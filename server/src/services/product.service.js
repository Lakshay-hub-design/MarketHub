const Product = require('../models/product.model')
const Category = require('../models/category.model')
const { uploadFile } = require('../providers/cloud.provider')

const createProduct = async (data, files, sellerId) => {
    const { title, description, price, stock, category } = data

    const categoryExists = await Category.findById(category)

    if(!categoryExists){
        throw new Error('Invalid category')
    }

    const uploadedImages = []

    if(files && files.length > 0){
        for(const file of files){
            const uploadResponse = await uploadFile(file.buffer.toString('base64')) 

            uploadedImages.push({
                url: uploadResponse.url,
                fileId: uploadResponse.fileId
            })
        }
    }

    const product = await Product.create({
        title,
        description,
        price,
        stock,
        category,
        seller: sellerId,
        images: uploadedImages
    })

    return product
}

module.exports = {
    createProduct
}