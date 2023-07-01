"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Place = new Schema({
    type: {
        type: String
    },
    address: {
        type: String
    },
    roomNumber: {
        type: Number
    },
    size: {
        type: Number
    },
    client: {
        type: String
    },
    rooms: {
        type: [{
                x: Number,
                y: Number,
                width: Number,
                height: Number,
                color: String,
            }]
    },
    doors: {
        type: [{
                x: Number,
                y: Number,
                width: Number,
                height: Number,
                color: String,
            }]
    },
    id: {
        type: Number
    },
});
exports.default = mongoose_1.default.model('PlaceModel', Place, 'objects');
//# sourceMappingURL=place.js.map