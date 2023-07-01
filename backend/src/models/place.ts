import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Place = new Schema({
    type: {
        type: String
    },
    address: {
        type: String
    },
    roomNumber: {
        type: Number
    },
    size: {
        type: Number
    },
    client: {
        type: String
    },
    rooms: {
        type: [{
            x: Number,
            y: Number,
            width: Number,
            height: Number,
            color: String,
        }]
    },
    doors: {
        type: [{
            x: Number,
            y: Number,
            width: Number,
            height: Number,
            color: String,
        }]
    },
    id: {
        type: Number
    },
})

export default mongoose.model('PlaceModel', Place, 'objects');