import express from 'express';
import { AdminController } from '../controllers/admin.controller';
const adminRouter = express.Router();

adminRouter.route('/deleteClient').post(
    (req, res) => new AdminController().deleteClient(req, res)
)

adminRouter.route('/deleteAgency').post(
    (req, res) => new AdminController().deleteAgency(req, res)
)

adminRouter.route('/addAgency').post(
    (req, res) => new AdminController().addAgency(req, res)
)

adminRouter.route('/addClient').post(
    (req, res) => new AdminController().addClient(req, res)
)

adminRouter.route('/getRegistrationRequests').get(
    (req, res) => new AdminController().getRegistrationRequests(req, res)
)

adminRouter.route('/declineRegistration').post(
    (req, res) => new AdminController().declineRegistration(req, res)
)

adminRouter.route('/deleteRegistration').post(
    (req, res) => new AdminController().deleteRegistration(req, res)
)

adminRouter.route('/deleteWorker').post(
    (req, res) => new AdminController().deleteWorker(req, res)
)

adminRouter.route('/updateWorker').post(
    (req, res) => new AdminController().updateWorker(req, res)
)

adminRouter.route('/getWorkerRequest').post(
    (req, res) => new AdminController().getWorkerRequest(req, res)
)

adminRouter.route('/declineWorkerRequest').post(
    (req, res) => new AdminController().declineWorkerRequest(req, res)
)

adminRouter.route('/acceptWorkerRequest').post(
    (req, res) => new AdminController().acceptWorkerRequest(req, res)
)

adminRouter.route('/getAllRenovationRequests').get(
    (req, res) => new AdminController().getAllRenovationRequests(req, res)
)

adminRouter.route('/getAllCancellations').get(
    (req, res) => new AdminController().getAllCancellations(req, res)
)

adminRouter.route('/declineCancellation').post(
    (req, res) => new AdminController().declineCancellation(req, res)
)

adminRouter.route('/acceptCancellation').post(
    (req, res) => new AdminController().acceptCancellation(req, res)
)










export default adminRouter;