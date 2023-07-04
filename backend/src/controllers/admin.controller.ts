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

export class AdminController {

    deleteClient = (req: express.Request, res: express.Response) => {

        let username = req.body.username;

        ClientModel.deleteOne({ 'username': username }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'client deleted' });
        })
    }

    deleteAgency = (req: express.Request, res: express.Response) => {

        let username = req.body.username;

        AgencyModel.deleteOne({ 'username': username }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'agency deleted' });
        })
    }

    addClient = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;
        let phone = req.body.phone;
        let email = req.body.email;

        let first_name = req.body.first_name;
        let last_name = req.body.last_name;

        let image = req.body.image;

        let client = new ClientModel({
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            image: image,
        })

        client.save((err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'client added' });
        })
    }

    addAgency = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;
        let phone = req.body.phone;
        let email = req.body.email;

        let name = req.body.name;
        let address = req.body.address;
        let idNumber = req.body.idNumber;
        let description = req.body.description;

        let image = req.body.image;

        let agency = new AgencyModel({
            username: username,
            password: password,
            phone: phone,
            email: email,
            name: name,
            address: address,
            idNumber: idNumber,
            description: description,
            image: image,
            numberOfWorkers: 0,
        })

        agency.save((err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'agency added' });
        })
    }

    getRegistrationRequests = (req: express.Request, res: express.Response) => {


        RegistrationModel.find({
            'state': {
                $ne: 'declined'
            }
        }, (err, registrations) => {
            if (err) console.log(err);
            else res.json(registrations);
        })
    }

    declineRegistration = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        RegistrationModel.updateOne({ 'id': id }, {
            $set: {
                'state': 'declined'
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'registration declined' });
        })
    }


    deleteRegistration = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        RegistrationModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'registration deleted' });
        })
    }

    deleteWorker = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        WorkerModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'worker deleted' });
        })
    }

    updateWorker = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let name = req.body.name;
        let surname = req.body.surname;
        let email = req.body.email;
        let phone = req.body.phone;
        let specialization = req.body.specialization;

        WorkerModel.updateOne({ 'id': id }, {
            $set: {
                'name': name,
                'surname': surname,
                'email': email,
                'phone': phone,
                'specialization': specialization,
            }
        }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'worker updated' });
        })
    }

    getWorkerRequest = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;

        WorkerRequestModel.findOne({ 'agency': agency, 'status': 'pending' }, (err, req) => {
            if (err) console.log(err);
            else res.json(req);
        })
    }

    declineWorkerRequest = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;

        WorkerRequestModel.deleteOne({ 'agency': agency }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'worker request deleted' });
        })
    }

    acceptWorkerRequest = (req: express.Request, res: express.Response) => {

        let agency = req.body.agency;

        WorkerRequestModel.findOne({ 'agency': agency }, (err, wr) => {
            if (err) console.log(err);
            else {
                AgencyModel.updateOne({ 'username': agency }, {
                    $inc: {
                        'numberOfWorkers': wr['number'],
                    }
                }, (err, resp) => {
                    if (err) console.log(err);
                    else {
                        WorkerRequestModel.deleteOne({ 'agency': agency }, (err, resp) => {
                            if (err) console.log(err);
                            else res.json({ 'message': 'worker request accepted' });
                        })
                    }
                })
            }
        })




    }

    getAllRenovationRequests = (req: express.Request, res: express.Response) => {


        RenovationReqModel.find({}, (err, renReq) => {
            if (err) console.log(err);
            else res.json(renReq);
        })
    }

    getAllCancellations = (req: express.Request, res: express.Response) => {


        CancelModel.find({}, (err, cancelReq) => {
            if (err) console.log(err);
            else res.json(cancelReq);
        })
    }

    declineCancellation = (req: express.Request, res: express.Response) => {

        let idReq = req.body.idReq;

        CancelModel.deleteOne({ 'idReq': idReq }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'cancellation deleted' });
        })
    }

    acceptCancellation = (req: express.Request, res: express.Response) => {

        let idReq = req.body.idReq;

        RenovationReqModel.deleteOne({ 'id': idReq }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'renovation request deleted' });
        })
    }








}