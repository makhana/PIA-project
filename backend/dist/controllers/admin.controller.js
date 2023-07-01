"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
const client_1 = __importDefault(require("../models/client"));
const registration_requests_1 = __importDefault(require("../models/registration_requests"));
const renovation_requests_1 = __importDefault(require("../models/renovation_requests"));
const worker_request_1 = __importDefault(require("../models/worker_request"));
const worker_1 = __importDefault(require("../models/worker"));
const cancellation_1 = __importDefault(require("../models/cancellation"));
class AdminController {
    constructor() {
        this.deleteClient = (req, res) => {
            let username = req.body.username;
            client_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'client deleted' });
            });
        };
        this.deleteAgency = (req, res) => {
            let username = req.body.username;
            agency_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'agency deleted' });
            });
        };
        this.addClient = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let phone = req.body.phone;
            let email = req.body.email;
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let image = req.body.image;
            let client = new client_1.default({
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                image: image,
            });
            client.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'client added' });
            });
        };
        this.addAgency = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let phone = req.body.phone;
            let email = req.body.email;
            let name = req.body.name;
            let address = req.body.address;
            let idNumber = req.body.idNumber;
            let description = req.body.description;
            let image = req.body.image;
            let agency = new agency_1.default({
                username: username,
                password: password,
                phone: phone,
                email: email,
                name: name,
                address: address,
                idNumber: idNumber,
                description: description,
                image: image,
            });
            agency.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'agency added' });
            });
        };
        this.getRegistrationRequests = (req, res) => {
            registration_requests_1.default.find({ 'state': {
                    $ne: 'declined'
                } }, (err, registrations) => {
                if (err)
                    console.log(err);
                else
                    res.json(registrations);
            });
        };
        this.declineRegistration = (req, res) => {
            let id = req.body.id;
            registration_requests_1.default.updateOne({ 'id': id }, { $set: {
                    'state': 'declined'
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'registration declined' });
            });
        };
        this.deleteRegistration = (req, res) => {
            let id = req.body.id;
            registration_requests_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'registration deleted' });
            });
        };
        this.deleteWorker = (req, res) => {
            let id = req.body.id;
            worker_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'worker deleted' });
            });
        };
        this.updateWorker = (req, res) => {
            let id = req.body.id;
            let name = req.body.name;
            let surname = req.body.surname;
            let email = req.body.email;
            let phone = req.body.phone;
            let specialization = req.body.specialization;
            worker_1.default.updateOne({ 'id': id }, { $set: {
                    'name': name,
                    'surname': surname,
                    'email': email,
                    'phone': phone,
                    'specialization': specialization,
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'worker updated' });
            });
        };
        this.getWorkerRequest = (req, res) => {
            let agency = req.body.agency;
            worker_request_1.default.findOne({ 'agency': agency, 'status': 'pending' }, (err, req) => {
                if (err)
                    console.log(err);
                else
                    res.json(req);
            });
        };
        this.declineWorkerRequest = (req, res) => {
            let agency = req.body.agency;
            worker_request_1.default.deleteOne({ 'agency': agency }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'worker request deleted' });
            });
        };
        this.acceptWorkerRequest = (req, res) => {
            let agency = req.body.agency;
            worker_request_1.default.updateOne({ 'agency': agency }, { $set: {
                    'status': 'approved'
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'worker request accepted' });
            });
        };
        this.getAllRenovationRequests = (req, res) => {
            renovation_requests_1.default.find({}, (err, renReq) => {
                if (err)
                    console.log(err);
                else
                    res.json(renReq);
            });
        };
        this.getAllCancellations = (req, res) => {
            cancellation_1.default.find({}, (err, cancelReq) => {
                if (err)
                    console.log(err);
                else
                    res.json(cancelReq);
            });
        };
        this.declineCancellation = (req, res) => {
            let idReq = req.body.idReq;
            cancellation_1.default.deleteOne({ 'idReq': idReq }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'cancellation deleted' });
            });
        };
        this.acceptCancellation = (req, res) => {
            let idReq = req.body.idReq;
            renovation_requests_1.default.deleteOne({ 'id': idReq }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'renovation request deleted' });
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map