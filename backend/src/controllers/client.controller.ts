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
import TempPassModel from '../models/temp_password'



export class ClientController {

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

    deleteObject = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        PlaceModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) console.log(err);
            else {
                RenovationReqModel.deleteMany({ 'idPlace': id }, (err, resp) => {
                    if (err) console.log(err);
                    else res.json({ 'message': 'object deleted' });
                })

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
                        else {
                            TempPassModel.deleteOne({ 'user': client['username'] }, (err, resp) => {
                                if (err) console.log(err)
                                else res.json({ 'message': 'temp password deleted and client password updated' })
                            })
                        }
                    })
                } else {
                    AgencyModel.updateOne({ 'username': username }, {
                        $set: {
                            'password': password,
                        }
                    }, (err, resp) => {
                        if (err) console.log(err);
                        else {
                            TempPassModel.deleteOne({ 'user': username }, (err, resp) => {
                                if (err) console.log(err)
                                else res.json({ 'message': 'temp password deleted and agency password updated' })
                            })
                        }
                    })
                }
            }
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




}