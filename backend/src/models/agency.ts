import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Agency = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    idNumber: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    numberOfWorkers: {
        type: Number
    }
})

export default mongoose.model('AgencyModel', Agency, 'agencies');