import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Cancellation = new Schema({
    client: {
        type: String
    },
    agency: {
        type: String
    },
    reason: {
        type: String
    },
    idReq: {
        type: Number
    },
})

export default mongoose.model('CancelModel', Cancellation, 'cancellations');