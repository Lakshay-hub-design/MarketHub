const { ImageKit } = require('@imagekit/nodejs')
const { v4: uuidv4 } = require("uuid")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const result = await imageKit.files.upload({
        file,
        fileName: `${uuidv4()}.jpg`,
        folder: '/products'
    })

    return result
}

module.exports = {uploadFile}