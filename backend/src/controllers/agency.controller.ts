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



export class AgencyController {

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
    






}