"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('CommentModel', Comment, 'user_comments');
//# sourceMappingURL=comment.js.map