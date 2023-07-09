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
const temp_password_1 = __importDefault(require("../models/temp_password"));
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
        this.addTemporaryPassword = (req, res) => {
            let email = req.body.email;
            let password = req.body.password;
            let date = new Date();
            client_1.default.findOne({ 'email': email }, (err, client) => {
                if (err)
                    console.log(err);
                else {
                    if (client) {
                        let temp = new temp_password_1.default({
                            user: client['username'],
                            oldPassword: client['password'],
                            tempPassword: password,
                            timestamp: date.getTime(),
                            deadline: date.getTime() + 10 * 60 * 1000
                        });
                        temp.save((err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'temp password added' });
                        });
                    }
                    else {
                        agency_1.default.findOne({ 'email': email }, (err, agency) => {
                            if (err)
                                console.log(err);
                            else {
                                if (agency) {
                                    let temp = new temp_password_1.default({
                                        user: agency['username'],
                                        oldPassword: agency['password'],
                                        tempPassword: password,
                                        timestamp: date.getTime(),
                                        deadline: date.getTime() + 10 * 60 * 1000
                                    });
                                    temp.save((err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json({ 'message': 'temp password added' });
                                    });
                                }
                                else {
                                    res.json({ 'message': 'wrong email' });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.checkTime = (req, res) => {
            let user = req.body.user;
            let date = new Date();
            temp_password_1.default.findOne({ 'user': user }, (err, pass) => {
                if (err)
                    console.log(err);
                else {
                    if (pass) {
                        if (date.getTime() > pass['deadline']) {
                            client_1.default.findOne({ 'username': user }, (err, client) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (client) {
                                        client_1.default.updateOne({ 'username': user }, {
                                            $set: {
                                                'password': pass['oldPassword']
                                            }
                                        }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                            else {
                                                temp_password_1.default.deleteOne({ 'user': user }, (err, resp) => {
                                                    if (err)
                                                        console.log(err);
                                                    else
                                                        res.json({ 'message': 'password was set to OLD' });
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        agency_1.default.updateOne({ 'username': user }, {
                                            $set: {
                                                'password': pass['oldPassword']
                                            }
                                        }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                            else {
                                                temp_password_1.default.deleteOne({ 'user': user }, (err, resp) => {
                                                    if (err)
                                                        console.log(err);
                                                    else
                                                        res.json({ 'message': 'password was set to OLD' });
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            res.json({ 'message': 'deadline didn\'t pass' });
                        }
                    }
                    else {
                        res.json({ 'message': 'password is okay' });
                    }
                }
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
                client_1.default.updateOne({ 'username': username }, {
                    $set: {
                        'first_name': first_name,
                        'last_name': last_name,
                        'email': email,
                        'phone': phone,
                    }
                }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'client profile updated' });
                });
            }
            else {
                client_1.default.updateOne({ 'username': username }, {
                    $set: {
                        'first_name': first_name,
                        'last_name': last_name,
                        'email': email,
                        'phone': phone,
                        'image': image,
                    }
                }, (err, resp) => {
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
                agency_1.default.updateOne({ 'username': username }, {
                    $set: {
                        'phone': phone,
                        'email': email,
                        'name': name,
                        'address': address,
                        'description': description,
                    }
                }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'agency profile updated' });
                });
            }
            else {
                agency_1.default.updateOne({ 'username': username }, {
                    $set: {
                        'phone': phone,
                        'email': email,
                        'name': name,
                        'address': address,
                        'description': description,
                        'image': image,
                    }
                }, (err, resp) => {
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
        this.finishJob = (req, res) => {
            let id = req.body.id;
            renovation_requests_1.default.updateOne({ 'id': id }, {
                $set: {
                    'status': "finished",
                }
            }, (err, resp) => {
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
                        worker_request_1.default.updateOne({ 'agency': agency }, {
                            $set: {
                                'number': number,
                                'status': "pending"
                            }
                        }, (err, resp) => {
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
            worker_1.default.updateOne({ 'id': id }, {
                $set: {
                    'status': "working",
                }
            }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "worker taken" });
            });
        };
        this.freeWorker = (req, res) => {
            let id = req.body.id;
            worker_1.default.updateOne({ 'id': id }, {
                $set: {
                    'status': "free",
                }
            }, (err, resp) => {
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
            place_1.default.updateOne({ 'id': id }, {
                $set: {
                    "rooms.$[elem].color": color,
                }
            }, { arrayFilters: [{ "elem.width": width, "elem.height": height, "elem.x": x, "elem.y": y }] }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'object updated' });
            });
        };
        // updateComment = (req: express.Request, res: express.Response) => {
        //     let client = req.body.client;
        //     let agency = req.body.agency;
        //     let comment = req.body.comment;
        //     let rating = req.body.rating;
        //     CommentModel.updateOne({ 'client': client, 'agency': agency }, {
        //         $set: {
        //             'comment': comment,
        //             'rating': rating,
        //         }
        //     }, (err, resp) => {
        //         if (err) console.log(err);
        //         else res.json({ 'message': 'comment updated' });
        //     })
        // }
        // addComment = (req: express.Request, res: express.Response) => {
        //     let client = req.body.client;
        //     let agency = req.body.agency;
        //     let comment = req.body.comment;
        //     let rating = req.body.rating;
        //     let com = new CommentModel({
        //         agency: agency,
        //         client: client,
        //         comment: comment,
        //         rating: rating,
        //     })
        //     com.save((err, resp) => {
        //         if (err) console.log(err);
        //         else res.json({ 'message': 'comment added' })
        //     });
        // }
        this.getDeclinedRegistrations = (req, res) => {
            registration_requests_1.default.find({ 'state': 'declined' }, (err, registrations) => {
                if (err)
                    console.log(err);
                else
                    res.json(registrations);
            });
        };
        // deleteComment = (req: express.Request, res: express.Response) => {
        //     let agency = req.body.agency;
        //     let client = req.body.client;
        //     CommentModel.deleteOne({ 'agency': agency, 'client': client }, (err, resp) => {
        //         if (err) console.log(err);
        //         else res.json({ 'message': 'comment deleted' });
        //     })
        // }
        this.changeUserPassword = (req, res) => {
            let email = req.body.email;
            let password = req.body.password;
            client_1.default.findOne({ 'email': email }, (err, client) => {
                if (err)
                    console.log(err);
                else {
                    if (client) {
                        client_1.default.updateOne({ 'email': email }, {
                            $set: {
                                'password': password,
                            }
                        }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ 'message': 'client password updated' });
                        });
                    }
                    else {
                        agency_1.default.updateOne({ 'email': email }, {
                            $set: {
                                'password': password,
                            }
                        }, (err, resp) => {
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