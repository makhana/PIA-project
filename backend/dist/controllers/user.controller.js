"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const admin_1 = __importDefault(require("../models/admin"));
const agency_1 = __importDefault(require("../models/agency"));
const client_1 = __importDefault(require("../models/client"));
const registration_requests_1 = __importDefault(require("../models/registration_requests"));
const place_1 = __importDefault(require("../models/place"));
const comment_1 = __importDefault(require("../models/comment"));
const renovation_requests_1 = __importDefault(require("../models/renovation_requests"));
const worker_request_1 = __importDefault(require("../models/worker_request"));
const worker_1 = __importDefault(require("../models/worker"));
const cancellation_1 = __importDefault(require("../models/cancellation"));
class UserController {
    constructor() {
        this.loginClient = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            client_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.loginAgency = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            agency_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.loginAdmin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            admin_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let phone = req.body.phone;
            let email = req.body.email;
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let name = req.body.name;
            let address = req.body.address;
            let idNumber = req.body.idNumber;
            let description = req.body.description;
            let userType = req.body.userType;
            let image = req.body.image;
            registration_requests_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let max_id = 0;
                    for (let r of resp) {
                        if (r['id'] > max_id) {
                            max_id = r['id'];
                        }
                    }
                    let reg = new registration_requests_1.default({
                        id: (max_id + 1),
                        username: username,
                        password: password,
                        phone: phone,
                        email: email,
                        first_name: first_name,
                        last_name: last_name,
                        name: name,
                        address: address,
                        idNumber: idNumber,
                        description: description,
                        userType: userType,
                        image: image,
                        state: "pending",
                    });
                    reg.save((err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'registration added' });
                    });
                }
            });
        };
        this.getAllClients = (req, res) => {
            client_1.default.find({}, (err, clients) => {
                if (err)
                    console.log(err);
                else
                    res.json(clients);
            });
        };
        this.getAllAgencies = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.getAllAdmins = (req, res) => {
            admin_1.default.find({}, (err, admins) => {
                if (err)
                    console.log(err);
                else
                    res.json(admins);
            });
        };
        // getImage = (req: express.Request, res: express.Response) => {
        //     const fs = require('fs')
        //     try{
        //         fs.readFile('uploads/'+ req.params.id, function(err, data) {
        //           if (err) throw err;
        //           else {
        //             res.writeHead(200, {'Content-Type': 'image/jpeg'});
        //             res.end(data); 
        //           }
        //         });
        //       }catch{
        //         console.log("Doslo je do greske prilikom ucitavanja slike");
        //         res.status(400);
        //       }
        // }
        this.getClient = (req, res) => {
            let username = req.body.username;
            client_1.default.findOne({ 'username': username }, (err, client) => {
                if (err)
                    console.log(err);
                else
                    res.json(client);
            });
        };
        this.getAgency = (req, res) => {
            let username = req.body.username;
            agency_1.default.findOne({ 'username': username }, (err, agency) => {
                if (err)
                    console.log(err);
                else
                    res.json(agency);
            });
        };
        this.updateClientProfile = (req, res) => {
            let username = req.body.username;
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let email = req.body.email;
            let phone = req.body.phone;
            let image = req.body.image;
            if (image == "") {
                client_1.default.updateOne({ 'username': username }, { $set: {
                        'first_name': first_name,
                        'last_name': last_name,
                        'email': email,
                        'phone': phone,
                    } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'client profile updated' });
                });
            }
            else {
                client_1.default.updateOne({ 'username': username }, { $set: {
                        'first_name': first_name,
                        'last_name': last_name,
                        'email': email,
                        'phone': phone,
                        'image': image,
                    } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'client profile updated' });
                });
            }
        };
        this.updateAgencyProfile = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let email = req.body.email;
            let phone = req.body.phone;
            let image = req.body.image;
            let address = req.body.address;
            let description = req.body.description;
            if (image == "") {
                agency_1.default.updateOne({ 'username': username }, { $set: {
                        'phone': phone,
                        'email': email,
                        'name': name,
                        'address': address,
                        'description': description,
                    } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'agency profile updated' });
                });
            }
            else {
                agency_1.default.updateOne({ 'username': username }, { $set: {
                        'phone': phone,
                        'email': email,
                        'name': name,
                        'address': address,
                        'description': description,
                        'image': image,
                    } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'agency profile updated' });
                });
            }
        };
        this.getAllPlaces = (req, res) => {
            let client = req.body.client;
            place_1.default.find({ 'client': client }, (err, places) => {
                if (err)
                    console.log(err);
                else
                    res.json(places);
            });
        };
        this.addObject = (req, res) => {
            let client = req.body.client;
            let type = req.body.type;
            let address = req.body.address;
            let roomNumber = req.body.roomNumber;
            let size = req.body.size;
            let rooms = req.body.rooms;
            let doors = req.body.doors;
            place_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let max_id = 0;
                    for (let r of resp) {
                        if (r['id'] > max_id) {
                            max_id = r['id'];
                        }
                    }
                    let place = new place_1.default({
                        client: client,
                        type: type,
                        address: address,
                        roomNumber: roomNumber,
                        size: size,
                        rooms: rooms,
                        doors: doors,
                        id: (max_id + 1),
                    });
                    place.save((err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'object added' });
                    });
                }
            });
        };
        this.deleteObject = (req, res) => {
            let id = req.body.id;
            place_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'object deleted' });
            });
        };
        this.getComments = (req, res) => {
            let agency = req.body.agency;
            comment_1.default.find({ 'agency': agency }, (err, comments) => {
                if (err)
                    console.log(err);
                else
                    res.json(comments);
            });
        };
        this.getClientComment = (req, res) => {
            let client = req.body.client;
            let agency = req.body.agency;
            comment_1.default.findOne({ 'client': client, 'agency': agency }, (err, comment) => {
                if (err)
                    console.log(err);
                else
                    res.json(comment);
            });
        };
        this.updateObject = (req, res) => {
            let id = req.body.id;
            let client = req.body.client;
            let type = req.body.type;
            let address = req.body.address;
            let roomNumber = req.body.roomNumber;
            let size = req.body.size;
            let rooms = req.body.rooms;
            let doors = req.body.doors;
            place_1.default.updateOne({ 'id': id }, { $set: {
                    'client': client,
                    'type': type,
                    'address': address,
                    'roomNumber': roomNumber,
                    'size': size,
                    'rooms': rooms,
                    'doors': doors
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'object updated' });
            });
        };
        this.requestRenovation = (req, res) => {
            let agency = req.body.agency;
            let client = req.body.client;
            let idPlace = req.body.idPlace;
            let dateStart = req.body.dateStart;
            let dateEnd = req.body.dateEnd;
            renovation_requests_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let max_id = 0;
                    for (let r of resp) {
                        if (r['id'] > max_id) {
                            max_id = r['id'];
                        }
                    }
                    let ren = new renovation_requests_1.default({
                        id: (max_id + 1),
                        agency: agency,
                        client: client,
                        idPlace: idPlace,
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        status: "pending",
                        offer: 0,
                    });
                    ren.save((err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'renovation request added' });
                    });
                }
            });
        };
        this.getAllRenovationRequests = (req, res) => {
            let client = req.body.client;
            renovation_requests_1.default.find({ 'client': client }, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.getAllRenovationRequestsAgency = (req, res) => {
            let agency = req.body.agency;
            renovation_requests_1.default.find({ 'agency': agency }, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.declineJobRequest = (req, res) => {
            let id = req.body.id;
            renovation_requests_1.default.updateOne({ 'id': id }, { $set: {
                    'status': "declined",
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "job request declined" });
            });
        };
        this.acceptJobRequest = (req, res) => {
            let id = req.body.id;
            let offer = req.body.offer;
            renovation_requests_1.default.updateOne({ 'id': id }, { $set: {
                    'status': "accepted",
                    'offer': offer,
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "job request accepted" });
            });
        };
        this.acceptClientOffer = (req, res) => {
            let id = req.body.id;
            renovation_requests_1.default.updateOne({ 'id': id }, { $set: {
                    'status': "active",
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "job offer accepted by client" });
            });
        };
        this.declineClientOffer = (req, res) => {
            let id = req.body.id;
            renovation_requests_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "job offer deleted by client" });
            });
        };
        this.finishJob = (req, res) => {
            let id = req.body.id;
            renovation_requests_1.default.updateOne({ 'id': id }, { $set: {
                    'status': "finished",
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "job offer finished by client" });
            });
        };
        this.addWorkerRequest = (req, res) => {
            let agency = req.body.agency;
            let number = req.body.number;
            worker_request_1.default.findOne({ 'agency': agency }, (err, req) => {
                if (err)
                    console.log(err);
                else {
                    if (req == null) {
                        // no request in the database
                        let wr = new worker_request_1.default({
                            agency: agency,
                            number: number,
                            status: "pending",
                        });
                        wr.save((err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'worker request added' });
                        });
                    }
                    else {
                        // update existing request
                        worker_request_1.default.updateOne({ 'agency': agency }, { $set: {
                                'number': number,
                                'status': "pending"
                            } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'worker request updated' });
                        });
                    }
                }
            });
        };
        this.getWorkersNumber = (req, res) => {
            let agency = req.body.agency;
            worker_request_1.default.findOne({ 'agency': agency }, (err, wr) => {
                if (err)
                    console.log(err);
                else
                    res.json(wr);
            });
        };
        this.addWorker = (req, res) => {
            let agency = req.body.agency;
            let name = req.body.name;
            let surname = req.body.surname;
            let email = req.body.email;
            let phone = req.body.phone;
            let specialization = req.body.specialization;
            worker_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let max_id = 0;
                    for (let r of resp) {
                        if (r['id'] > max_id) {
                            max_id = r['id'];
                        }
                    }
                    let worker = new worker_1.default({
                        id: (max_id + 1),
                        agency: agency,
                        name: name,
                        surname: surname,
                        email: email,
                        phone: phone,
                        specialization: specialization,
                        status: "free",
                    });
                    worker.save((err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'worker added' });
                    });
                }
            });
        };
        this.getAllWorkers = (req, res) => {
            let agency = req.body.agency;
            worker_1.default.find({ 'agency': agency }, (err, workers) => {
                if (err)
                    console.log(err);
                else
                    res.json(workers);
            });
        };
        this.takeWorker = (req, res) => {
            let id = req.body.id;
            worker_1.default.updateOne({ 'id': id }, { $set: {
                    'status': "working",
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "worker taken" });
            });
        };
        this.freeWorker = (req, res) => {
            let id = req.body.id;
            worker_1.default.updateOne({ 'id': id }, { $set: {
                    'status': "free",
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "worker freed" });
            });
        };
        this.colorObject = (req, res) => {
            let id = req.body.id;
            let color = req.body.color;
            let width = req.body.width;
            let height = req.body.height;
            let x = req.body.x;
            let y = req.body.y;
            place_1.default.updateOne({ 'id': id }, { $set: {
                    "rooms.$[elem].color": color,
                } }, { arrayFilters: [{ "elem.width": width, "elem.height": height, "elem.x": x, "elem.y": y }] }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'object updated' });
            });
        };
        this.updateComment = (req, res) => {
            let client = req.body.client;
            let agency = req.body.agency;
            let comment = req.body.comment;
            let rating = req.body.rating;
            comment_1.default.updateOne({ 'client': client, 'agency': agency }, { $set: {
                    'comment': comment,
                    'rating': rating,
                } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'comment updated' });
            });
        };
        this.addComment = (req, res) => {
            let client = req.body.client;
            let agency = req.body.agency;
            let comment = req.body.comment;
            let rating = req.body.rating;
            let com = new comment_1.default({
                agency: agency,
                client: client,
                comment: comment,
                rating: rating,
            });
            com.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'comment added' });
            });
        };
        this.submitCancelRequest = (req, res) => {
            let client = req.body.client;
            let agency = req.body.agency;
            let reason = req.body.reason;
            let idReq = req.body.idReq;
            let canc = new cancellation_1.default({
                client: client,
                agency: agency,
                reason: reason,
                idReq: idReq,
            });
            canc.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'cancellation request added' });
            });
        };
        this.getCancelRequest = (req, res) => {
            let idReq = req.body.idReq;
            cancellation_1.default.findOne({ 'idReq': idReq }, (err, cancelReq) => {
                if (err)
                    console.log(err);
                else
                    res.json(cancelReq);
            });
        };
        this.getDeclinedRegistrations = (req, res) => {
            registration_requests_1.default.find({ 'state': 'declined' }, (err, registrations) => {
                if (err)
                    console.log(err);
                else
                    res.json(registrations);
            });
        };
        this.deleteComment = (req, res) => {
            let agency = req.body.agency;
            let client = req.body.client;
            comment_1.default.deleteOne({ 'agency': agency, 'client': client }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'comment deleted' });
            });
        };
        this.changeUserPassword = (req, res) => {
            let email = req.body.email;
            let password = req.body.password;
            client_1.default.findOne({ 'email': email }, (err, client) => {
                if (err)
                    console.log(err);
                else {
                    if (client) {
                        client_1.default.updateOne({ 'email': email }, { $set: {
                                'password': password,
                            } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'client password updated' });
                        });
                    }
                    else {
                        agency_1.default.updateOne({ 'email': email }, { $set: {
                                'password': password,
                            } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'agency password updated' });
                        });
                    }
                }
            });
        };
        this.changeUserPasswordUsername = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            client_1.default.findOne({ 'username': username }, (err, client) => {
                if (err)
                    console.log(err);
                else {
                    if (client) {
                        client_1.default.updateOne({ 'username': username }, { $set: {
                                'password': password,
                            } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'client password updated' });
                        });
                    }
                    else {
                        agency_1.default.updateOne({ 'username': username }, { $set: {
                                'password': password,
                            } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'agency password updated' });
                        });
                    }
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map