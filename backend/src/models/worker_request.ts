import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let WorkerRequest = new Schema({
    agency: {
        type: String
    },
    number: {
        type: Number
    },
    status: {
        type: String
    },
    
})

export default mongoose.model('WorkerRequestModel', WorkerRequest, 'worker_request');