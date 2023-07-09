"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
const client_1 = __importDefault(require("../models/client"));
const place_1 = __importDefault(require("../models/place"));
const comment_1 = __importDefault(require("../models/comment"));
const renovation_requests_1 = __importDefault(require("../models/renovation_requests"));
const cancellation_1 = __importDefault(require("../models/cancellation"));
const temp_password_1 = __importDefault(require("../models/temp_password"));
class ClientController {
    constructor() {
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
        this.updateObject = (req, res) => {
            let id = req.body.id;
            let client = req.body.client;
            let type = req.body.type;
            let address = req.body.address;
            let roomNumber = req.body.roomNumber;
            let size = req.body.size;
            let rooms = req.body.rooms;
            let doors = req.body.doors;
            place_1.default.updateOne({ 'id': id }, {
                $set: {
                    'client': client,
                    'type': type,
                    'address': address,
                    'roomNumber': roomNumber,
                    'size': size,
                    'rooms': rooms,
                    'doors': doors
                }
            }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'object updated' });
            });
        };
        this.deleteObject = (req, res) => {
            let id = req.body.id;
            place_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    renovation_requests_1.default.deleteMany({ 'idPlace': id }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'object deleted' });
                    });
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
                        client_1.default.updateOne({ 'username': username }, {
                            $set: {
                                'password': password,
                            }
                        }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                temp_password_1.default.deleteOne({ 'user': client['username'] }, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                    else
                                        res.json({ 'message': 'temp password deleted and client password updated' });
                                });
                            }
                        });
                    }
                    else {
                        agency_1.default.updateOne({ 'username': username }, {
                            $set: {
                                'password': password,
                            }
                        }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                temp_password_1.default.deleteOne({ 'user': username }, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                    else
                                        res.json({ 'message': 'temp password deleted and agency password updated' });
                                });
                            }
                        });
                    }
                }
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
        this.acceptClientOffer = (req, res) => {
            let id = req.body.id;
            renovation_requests_1.default.updateOne({ 'id': id }, {
                $set: {
                    'status': "active",
                }
            }, (err, resp) => {
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
        this.updateComment = (req, res) => {
            let client = req.body.client;
            let agency = req.body.agency;
            let comment = req.body.comment;
            let rating = req.body.rating;
            comment_1.default.updateOne({ 'client': client, 'agency': agency }, {
                $set: {
                    'comment': comment,
                    'rating': rating,
                }
            }, (err, resp) => {
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
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map