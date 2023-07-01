import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Worker = new Schema({
    id: {
        type: Number
    },
    agency: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    specialization: {
        type: String
    },
    status: {
        type: String
    },
    
})

export default mongoose.model('WorkerModel', Worker, 'workers');