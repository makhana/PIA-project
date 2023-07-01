"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('RegistrationModel', Registration, 'registration_requests');
//# sourceMappingURL=registration_requests.js.map