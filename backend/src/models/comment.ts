import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Comment = new Schema({
    agency: {
        type: String
    },
    client: {
        type: String
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    },
})

export default mongoose.model('CommentModel', Comment, 'user_comments');