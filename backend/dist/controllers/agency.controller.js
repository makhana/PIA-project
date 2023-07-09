"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const renovation_requests_1 = __importDefault(require("../models/renovation_requests"));
class AgencyController {
    constructor() {
        this.declineJobRequest = (req, res) => {
            let id = req.body.id;
            renovation_requests_1.default.updateOne({ 'id': id }, {
                $set: {
                    'status': "declined",
                }
            }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "job request declined" });
            });
        };
        this.acceptJobRequest = (req, res) => {
            let id = req.body.id;
            let offer = req.body.offer;
            renovation_requests_1.default.updateOne({ 'id': id }, {
                $set: {
                    'status': "accepted",
                    'offer': offer,
                }
            }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "job request accepted" });
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map