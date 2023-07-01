import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Image = new Schema({
    username: {
        type: String
    },
    src: {
        type: String
    },
    
})

export default mongoose.model('ImageModel', Image, 'images');