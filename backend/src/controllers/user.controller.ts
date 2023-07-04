import * as express from 'express';
import AdminModel from '../models/admin'
import AgencyModel from '../models/agency'
import ClientModel from '../models/client'
import RegistrationModel from '../models/registration_requests'
import ImageModel from '../models/image'
import PlaceModel from '../models/place'
import CommentModel from '../models/comment'
import RenovationReqModel from '../models/renovation_requests'
import WorkerRequestModel from '../models/worker_request'
import WorkerModel from '../models/worker'
import CancelModel from '../models/cancellation'


export class UserController {
    loginClient = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        ClientModel.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    loginAgency = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        AgencyModel.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    loginAdmin = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        AdminModel.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response) => {
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

        RegistrationModel.find({}, (err, resp) => {
            if (err) console.log(err);
            else {
                let max_id = 0;
                for (let r of resp) {
                    if (r['id'] > max_id) {
                        max_id = r['id'];
                    }
                }

                let reg = new RegistrationModel({
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
                })

                reg.save((err, resp) => {
                    if (err) console.log(err);
                    else res.json({ 'message': 'registration added' });
                })

            }
        })


    }

    getAllClients = (req: express.Request, res: express.Response) => {

        ClientModel.find({}, (err, clients) => {
            if (err) console.log(err);
            else res.json(clients)
        })
    }

    getAllAgencies = (req: express.Request, res: express.Response) => {

        AgencyModel.find({}, (err, agencies) => {
            if (err) console.log(err);
            else res.json(agencies)
        })
    }

    getAllAdmins = (req: express.Request, res: express.Response) => {

        AdminModel.find({}, (err, admins) => {
            if (err) console.log(err);
            else res.json(admins)
        })
    }

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

    getClient = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        ClientModel.findOne({ 'username': username }, (err, client) => {
            if (err) console.log(err);
            else res.json(client)
        })
    }

    getAgency = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        AgencyModel.findOne({ 'username': username }, (err, agency) => {
            if (err) console.log(err);
            else res.json(agency)
        })
    }

    updateClientProfile = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let phone = req.body.phone;
        let image = req.body.image;

        if (image == "") {
            ClientModel.updateOne({ 'username': username }, {
                $set: {
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'phone': phone,
                }
            }, (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'client profile updated' })
            })
        } else {
            ClientModel.updateOne({ 'username': username }, {
                $set: {
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'phone': phone,
                    'image': image,
                }
            }, (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'client profile updated' })
            })
        }


    }

    updateAgencyProfile = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let image = req.body.image;
        let address = req.body.address;
        let description = req.body.description;

        if (image == "") {
            AgencyModel.updateOne({ 'username': username }, {
                $set: {
                    'phone': phone,
                    'email': email,
                    'name': name,
                    'address': address,
                    'description': description,
                }
            }, (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'agency profile updated' })
            })
        } else {
            AgencyModel.updateOne({ 'username': username }, {
                $set: {
                    'phone': phone,
                    'email': email,
                    'name': name,
                    'address': address,
                    'description': description,
                    'image': image,
                }
            }, (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'agency profile updated' })
            })
        }



    }

    getAllPlaces = (req: express.Request, res: express.Response) => {
        let client = req.body.client;

        PlaceModel.find({ 'client': client }, (err, places) => {
            if (err) console.log(err);
            else res.json(places)
        })
    }

    addObject = (req: express.Request, res: express.Response) => {

        let client = req.body.client;
        let type = req.body.type;
        let address = req.body.address;
        let roomNumber = req.body.roomNumber;
        let size = req.body.size;
        let rooms = req.body.rooms;
        let doors = req.body.doors;

        PlaceModel.find({}, (err, resp) => {
            if (err) console.log(err);
            else {
                let max_id = 0;
                for (let r of resp) {
                    if (r['id'] > max_id) {
                        max_id = r['id'];
                    }
                }

                let place = new PlaceModel({
                    client: client,
                    type: type,
                    address: address,
                    roomNumber: roomNumber,
                    size: size,
                    rooms: rooms,
                    doors: doors,
                    id: (max_id + 1),
                })

                place.save((err, resp) => {
                    if (err) console.log(err);
                    else res.json({ 'message': 'object added' });
                })

            }
        })
    }

    deleteObject = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        PlaceModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) console.log(err);
            else {
                RenovationReqModel.deleteMany({'idPlace': id}, (err, resp)=> {
                    if(err) console.log(err);
                    else res.json({ 'message': 'object deleted' });
                })
                
            }
        })

    }

    getComments = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;

        CommentModel.find({ 'agency': agency }, (err, comments) => {
            if (err) console.log(err);
            else res.json(comments);
        })

    }

    getClientComment = (req: express.Request, res: express.Response) => {

        let client = req.body.client;
        let agency = req.body.agency;

        CommentModel.findOne({ 'client': client, 'agency': agency }, (err, comment) => {
            if (err) console.log(err);
            else res.json(comment);
        })

    }

    updateObject = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let client = req.body.client;
        let type = req.body.type;
        let address = req.body.address;
        let roomNumber = req.body.roomNumber;
        let size = req.body.size;
        let rooms = req.body.rooms;
        let doors = req.body.doors;

        PlaceModel.updateOne({ 'id': id }, {
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
            if (err) console.log(err);
            else res.json({ 'message': 'object updated' });
        })

    }

    requestRenovation = (req: express.Request, res: express.Response) => {


        let agency = req.body.agency;
        let client = req.body.client;
        let idPlace = req.body.idPlace;
        let dateStart = req.body.dateStart;
        let dateEnd = req.body.dateEnd;


        RenovationReqModel.find({}, (err, resp) => {
            if (err) console.log(err);
            else {
                let max_id = 0;
                for (let r of resp) {
                    if (r['id'] > max_id) {
                        max_id = r['id'];
                    }
                }

                let ren = new RenovationReqModel({
                    id: (max_id + 1),
                    agency: agency,
                    client: client,
                    idPlace: idPlace,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    status: "pending",
                    offer: 0,
                })

                ren.save((err, resp) => {
                    if (err) console.log(err);
                    else res.json({ 'message': 'renovation request added' });
                })

            }
        })
    }

    getAllRenovationRequests = (req: express.Request, res: express.Response) => {

        let client = req.body.client;

        RenovationReqModel.find({ 'client': client }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })

    }

    getAllRenovationRequestsAgency = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;

        RenovationReqModel.find({ 'agency': agency }, (err, requests) => {
            if (err) console.log(err);
            else res.json(requests);
        })

    }

    declineJobRequest = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        RenovationReqModel.updateOne({ 'id': id }, {
            $set: {
                'status': "declined",
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': "job request declined" });
        })

    }

    acceptJobRequest = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let offer = req.body.offer;

        RenovationReqModel.updateOne({ 'id': id }, {
            $set: {
                'status': "accepted",
                'offer': offer,
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': "job request accepted" });
        })

    }

    acceptClientOffer = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        RenovationReqModel.updateOne({ 'id': id }, {
            $set: {
                'status': "active",
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': "job offer accepted by client" });
        })

    }

    declineClientOffer = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        RenovationReqModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': "job offer deleted by client" });
        })

    }

    finishJob = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        RenovationReqModel.updateOne({ 'id': id }, {
            $set: {
                'status': "finished",
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': "job offer finished by client" });
        })

    }

    addWorkerRequest = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;
        let number = req.body.number;

        WorkerRequestModel.findOne({ 'agency': agency }, (err, req) => {
            if (err) console.log(err);
            else {
                if (req == null) {
                    // no request in the database
                    let wr = new WorkerRequestModel({
                        agency: agency,
                        number: number,
                        status: "pending",
                    })

                    wr.save((err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'worker request added' });
                    })
                } else {
                    // update existing request
                    WorkerRequestModel.updateOne({ 'agency': agency }, {
                        $set: {
                            'number': number,
                            'status': "pending"
                        }
                    }, (err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'worker request updated' })
                    })
                }
            }
        })
    }

    getWorkersNumber = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;

        WorkerRequestModel.findOne({ 'agency': agency }, (err, wr) => {
            if (err) console.log(err);
            else res.json(wr);
        })
    }

    addWorker = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;
        let name = req.body.name;
        let surname = req.body.surname;
        let email = req.body.email;
        let phone = req.body.phone;
        let specialization = req.body.specialization;

        WorkerModel.find({}, (err, resp) => {
            if (err) console.log(err);
            else {
                let max_id = 0;
                for (let r of resp) {
                    if (r['id'] > max_id) {
                        max_id = r['id'];
                    }
                }

                let worker = new WorkerModel({
                    id: (max_id + 1),
                    agency: agency,
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone,
                    specialization: specialization,
                    status: "free",
                })

                worker.save((err, resp) => {
                    if (err) console.log(err);
                    else res.json({ 'message': 'worker added' });
                })

            }
        })
    }

    getAllWorkers = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;

        WorkerModel.find({ 'agency': agency }, (err, workers) => {
            if (err) console.log(err);
            else res.json(workers);
        })
    }

    takeWorker = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        WorkerModel.updateOne({ 'id': id }, {
            $set: {
                'status': "working",
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': "worker taken" });
        })
    }

    freeWorker = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        WorkerModel.updateOne({ 'id': id }, {
            $set: {
                'status': "free",
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': "worker freed" });
        })
    }

    colorObject = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let color = req.body.color;

        let width = req.body.width;
        let height = req.body.height;
        let x = req.body.x;
        let y = req.body.y;


        PlaceModel.updateOne({ 'id': id }, {
            $set: {
                "rooms.$[elem].color": color,
            }
        }, { arrayFilters: [{ "elem.width": width, "elem.height": height, "elem.x": x, "elem.y": y }] }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'object updated' });
        })
    }

    updateComment = (req: express.Request, res: express.Response) => {

        let client = req.body.client;
        let agency = req.body.agency;
        let comment = req.body.comment;
        let rating = req.body.rating;

        CommentModel.updateOne({ 'client': client, 'agency': agency }, {
            $set: {
                'comment': comment,
                'rating': rating,
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'comment updated' });
        })
    }

    addComment = (req: express.Request, res: express.Response) => {

        let client = req.body.client;
        let agency = req.body.agency;
        let comment = req.body.comment;
        let rating = req.body.rating;

        let com = new CommentModel({
            agency: agency,
            client: client,
            comment: comment,
            rating: rating,
        })

        com.save((err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'comment added' })
        });

    }

    submitCancelRequest = (req: express.Request, res: express.Response) => {

        let client = req.body.client;
        let agency = req.body.agency;
        let reason = req.body.reason;
        let idReq = req.body.idReq;

        let canc = new CancelModel({
            client: client,
            agency: agency,
            reason: reason,
            idReq: idReq,
        })

        canc.save((err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'cancellation request added' });
        })
    }

    getCancelRequest = (req: express.Request, res: express.Response) => {

        let idReq = req.body.idReq;

        CancelModel.findOne({ 'idReq': idReq }, (err, cancelReq) => {
            if (err) console.log(err);
            else res.json(cancelReq);
        })
    }

    getDeclinedRegistrations = (req: express.Request, res: express.Response) => {

        RegistrationModel.find({ 'state': 'declined' }, (err, registrations) => {
            if (err) console.log(err);
            else res.json(registrations)
        })
    }

    deleteComment = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;
        let client = req.body.client;

        CommentModel.deleteOne({ 'agency': agency, 'client': client }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'comment deleted' });
        })

    }

    changeUserPassword = (req: express.Request, res: express.Response) => {

        let email = req.body.email;
        let password = req.body.password;

        ClientModel.findOne({ 'email': email }, (err, client) => {
            if (err) console.log(err);
            else {
                if (client) {
                    ClientModel.updateOne({ 'email': email }, {
                        $set: {
                            'password': password,
                        }
                    }, (err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'client password updated' })
                    })
                } else {
                    AgencyModel.updateOne({ 'email': email }, {
                        $set: {
                            'password': password,
                        }
                    }, (err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'agency password updated' })
                    })
                }
            }
        })

    }

    changeUserPasswordUsername = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;

        ClientModel.findOne({ 'username': username }, (err, client) => {
            if (err) console.log(err);
            else {
                if (client) {
                    ClientModel.updateOne({ 'username': username }, {
                        $set: {
                            'password': password,
                        }
                    }, (err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'client password updated' })
                    })
                } else {
                    AgencyModel.updateOne({ 'username': username }, {
                        $set: {
                            'password': password,
                        }
                    }, (err, resp) => {
                        if (err) console.log(err);
                        else res.json({ 'message': 'agency password updated' })
                    })
                }
            }
        })

    }






}