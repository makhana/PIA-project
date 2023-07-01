"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('RenovationReqModel', RenovationReq, 'renovation_requests');
//# sourceMappingURL=renovation_requests.js.map