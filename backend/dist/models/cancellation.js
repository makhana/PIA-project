"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('CancelModel', Cancellation, 'cancellations');
//# sourceMappingURL=cancellation.js.map