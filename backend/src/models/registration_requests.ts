import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Registration = new Schema({
    id: {
        type: Number
    }, 
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
    first_name: {
        type: String
    },
    last_name: {
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
    userType: {
        type: String
    },
    image: {
        type: String
    },
    state: {
        type: String
    }, 
})

export default mongoose.model('RegistrationModel', Registration, 'registration_requests');