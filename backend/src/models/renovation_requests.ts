import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let RenovationReq = new Schema({
    id: {
        type: Number
    },
    agency: {
        type: String
    },
    client: {
        type: String
    },
    idPlace: {
        type: Number
    },
    dateStart: {
        type: String
    },
    dateEnd: {
        type: String
    },
    status: {
        type: String
    },
    offer: {
        type: Number
    },
    
})

export default mongoose.model('RenovationReqModel', RenovationReq, 'renovation_requests');