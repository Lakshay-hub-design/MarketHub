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

const getproducts = async (query) => {

    const page = Math.max(parseInt(query.page) || 1, 1)
    const limit = Math.min(parseInt(query.limit) || 10, 50)
    const skip = (page - 1) * limit
    
    const filter = { isActive: true }

    if(query.search){
        filter.$text = { $search: search}
    }

    if(query.category){
        filter.category = query.category
    }

   const mongoQuery = await Product.find(filter)
   .populate('category', 'name slug')
   .populate('seller', 'name')

   if(query.sort){
    const sortOption = query.sort === 'price' ? {price: 1} : { createdAt: -1}
    mongoQuery = mongoQuery.sort(sortOption)
   }

   const products = await mongoQuery
    .skip(skip)
    .limit(limit)

   const total = await Product.countDocuments(query)

   return {
    products,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit)
   }
}

const updateProduct = async (productId, sellerId, data, files) => {
    const product = await Product.findOne({
        _id: productId,
        seller: sellerId,
        isActive: true
    })

    if (!product) {
        const error = new Error('Product not found')
        error.statusCode = 404
        throw error
    }

    const uploadImages = []

    if(files && files.length > 0){

        const uploadPromises = files.map(file => {
            uploadFile(file.buffer.toString("base64"))
        })

        const uploadResults = await Promise.all(uploadPromises)

        uploadImages = uploadResults.map(img => ({
            url: img.url,
            fileId: img.fileId
        }))
    }

    const updateProduct = await Product.findByIdAndUpdate(
        productId, 
        {
            ...data, 
            $push: { images: { $each: uploadedImages } } 
        },
        {
            new: true,
            runValidators: true
        }
    )
    
    return updateProduct
}

const deleteProduct = async (productId, sellerId) => {
    const product = await Product.findOne({
        _id: productId,
        seller: sellerId
    })

    if (!product) {
        throw new Error("Product not found");
    }

    product.isActive = false

    await product.save()

    return product
}

module.exports = {
    createProduct,
    getproducts,
    updateProduct,
    deleteProduct
}