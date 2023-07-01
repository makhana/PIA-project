"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('WorkerModel', Worker, 'workers');
//# sourceMappingURL=worker.js.map