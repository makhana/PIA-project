import express from 'express';
import { AgencyController } from '../controllers/agency.controller';
const agencyRouter = express.Router();


agencyRouter.route('/declineJobRequest').post(
    (req, res) => new AgencyController().declineJobRequest(req, res)
)

agencyRouter.route('/acceptJobRequest').post(
    (req, res) => new AgencyController().acceptJobRequest(req, res)
)








export default agencyRouter;