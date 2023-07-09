import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let TempPassword = new Schema({
    user: {
        type: String
    },
    oldPassword: {
        type: String
    },
    tempPassword: {
        type: String
    },
    timestamp: {
        type: Number
    },
    deadline: {
        type: Number
    },
    
})

export default mongoose.model('TempPassModel', TempPassword, 'temporary_password');