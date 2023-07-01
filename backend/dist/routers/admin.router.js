"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/deleteClient').post((req, res) => new admin_controller_1.AdminController().deleteClient(req, res));
adminRouter.route('/deleteAgency').post((req, res) => new admin_controller_1.AdminController().deleteAgency(req, res));
adminRouter.route('/addAgency').post((req, res) => new admin_controller_1.AdminController().addAgency(req, res));
adminRouter.route('/addClient').post((req, res) => new admin_controller_1.AdminController().addClient(req, res));
adminRouter.route('/getRegistrationRequests').get((req, res) => new admin_controller_1.AdminController().getRegistrationRequests(req, res));
adminRouter.route('/declineRegistration').post((req, res) => new admin_controller_1.AdminController().declineRegistration(req, res));
adminRouter.route('/deleteRegistration').post((req, res) => new admin_controller_1.AdminController().deleteRegistration(req, res));
adminRouter.route('/deleteWorker').post((req, res) => new admin_controller_1.AdminController().deleteWorker(req, res));
adminRouter.route('/updateWorker').post((req, res) => new admin_controller_1.AdminController().updateWorker(req, res));
adminRouter.route('/getWorkerRequest').post((req, res) => new admin_controller_1.AdminController().getWorkerRequest(req, res));
adminRouter.route('/declineWorkerRequest').post((req, res) => new admin_controller_1.AdminController().declineWorkerRequest(req, res));
adminRouter.route('/acceptWorkerRequest').post((req, res) => new admin_controller_1.AdminController().acceptWorkerRequest(req, res));
adminRouter.route('/getAllRenovationRequests').get((req, res) => new admin_controller_1.AdminController().getAllRenovationRequests(req, res));
adminRouter.route('/getAllCancellations').get((req, res) => new admin_controller_1.AdminController().getAllCancellations(req, res));
adminRouter.route('/declineCancellation').post((req, res) => new admin_controller_1.AdminController().declineCancellation(req, res));
adminRouter.route('/acceptCancellation').post((req, res) => new admin_controller_1.AdminController().acceptCancellation(req, res));
exports.default = adminRouter;
//# sourceMappingURL=admin.router.js.map