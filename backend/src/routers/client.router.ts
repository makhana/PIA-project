import express from 'express';
import { ClientController } from '../controllers/client.controller';
const clientRouter = express.Router();

clientRouter.route('/addObject').post(
    (req, res) => new ClientController().addObject(req, res)
)

clientRouter.route('/updateObject').post(
    (req, res) => new ClientController().updateObject(req, res)
)

clientRouter.route('/deleteObject').post(
    (req, res) => new ClientController().deleteObject(req, res)
)

clientRouter.route('/changeUserPasswordUsername').post(
    (req, res) => new ClientController().changeUserPasswordUsername(req, res)
)

clientRouter.route('/requestRenovation').post(
    (req, res) => new ClientController().requestRenovation(req, res)
)

clientRouter.route('/acceptClientOffer').post(
    (req, res) => new ClientController().acceptClientOffer(req, res)
)

clientRouter.route('/declineClientOffer').post(
    (req, res) => new ClientController().declineClientOffer(req, res)
)

clientRouter.route('/submitCancelRequest').post(
    (req, res) => new ClientController().submitCancelRequest(req, res)
)

clientRouter.route('/getCancelRequest').post(
    (req, res) => new ClientController().getCancelRequest(req, res)
)

clientRouter.route('/deleteComment').post(
    (req, res) => new ClientController().deleteComment(req, res)
)

clientRouter.route('/updateComment').post(
    (req, res) => new ClientController().updateComment(req, res)
)

clientRouter.route('/addComment').post(
    (req, res) => new ClientController().addComment(req, res)
)











export default clientRouter;