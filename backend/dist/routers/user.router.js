"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/loginClient').post((req, res) => new user_controller_1.UserController().loginClient(req, res));
userRouter.route('/loginAgency').post((req, res) => new user_controller_1.UserController().loginAgency(req, res));
userRouter.route('/loginAdmin').post((req, res) => new user_controller_1.UserController().loginAdmin(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/getAllClients').get((req, res) => new user_controller_1.UserController().getAllClients(req, res));
userRouter.route('/getAllAgencies').get((req, res) => new user_controller_1.UserController().getAllAgencies(req, res));
userRouter.route('/getAllAdmins').get((req, res) => new user_controller_1.UserController().getAllAdmins(req, res));
userRouter.route('/getImage/:id').get((req, res) => {
    const fs = require('fs');
    try {
        fs.readFile('uploads/' + req.params.id, function (err, data) {
            if (err)
                throw err;
            else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    }
    catch (_a) {
        console.log("ERROR while loading image");
        res.status(400);
    }
});
userRouter.route('/getClient').post((req, res) => new user_controller_1.UserController().getClient(req, res));
userRouter.route('/getAgency').post((req, res) => new user_controller_1.UserController().getAgency(req, res));
userRouter.route('/updateClientProfile').post((req, res) => new user_controller_1.UserController().updateClientProfile(req, res));
userRouter.route('/updateAgencyProfile').post((req, res) => new user_controller_1.UserController().updateAgencyProfile(req, res));
userRouter.route('/getAllPlaces').post((req, res) => new user_controller_1.UserController().getAllPlaces(req, res));
userRouter.route('/getComments').post((req, res) => new user_controller_1.UserController().getComments(req, res));
userRouter.route('/getAllRenovationRequests').post((req, res) => new user_controller_1.UserController().getAllRenovationRequests(req, res));
userRouter.route('/getAllRenovationRequestsAgency').post((req, res) => new user_controller_1.UserController().getAllRenovationRequestsAgency(req, res));
userRouter.route('/finishJob').post((req, res) => new user_controller_1.UserController().finishJob(req, res));
userRouter.route('/takeWorker').post((req, res) => new user_controller_1.UserController().takeWorker(req, res));
userRouter.route('/freeWorker').post((req, res) => new user_controller_1.UserController().freeWorker(req, res));
userRouter.route('/colorObject').post((req, res) => new user_controller_1.UserController().colorObject(req, res));
userRouter.route('/getClientComment').post((req, res) => new user_controller_1.UserController().getClientComment(req, res));
userRouter.route('/updateComment').post((req, res) => new user_controller_1.UserController().updateComment(req, res));
userRouter.route('/addComment').post((req, res) => new user_controller_1.UserController().addComment(req, res));
// userRouter.route('/submitCancelRequest').post(
//     (req, res) => new UserController().submitCancelRequest(req, res)
// )
// userRouter.route('/getCancelRequest').post(
//     (req, res) => new UserController().getCancelRequest(req, res)
// )
userRouter.route('/addWorkerRequest').post((req, res) => new user_controller_1.UserController().addWorkerRequest(req, res));
userRouter.route('/getWorkersNumber').post((req, res) => new user_controller_1.UserController().getWorkersNumber(req, res));
userRouter.route('/addWorker').post((req, res) => new user_controller_1.UserController().addWorker(req, res));
userRouter.route('/getAllWorkers').post((req, res) => new user_controller_1.UserController().getAllWorkers(req, res));
userRouter.route('/getDeclinedRegistrations').get((req, res) => new user_controller_1.UserController().getDeclinedRegistrations(req, res));
userRouter.route('/deleteComment').post((req, res) => new user_controller_1.UserController().deleteComment(req, res));
userRouter.route('/changeUserPassword').post((req, res) => new user_controller_1.UserController().changeUserPassword(req, res));
userRouter.route('/addTemporaryPassword').post((req, res) => new user_controller_1.UserController().addTemporaryPassword(req, res));
userRouter.route('/checkTime').post((req, res) => new user_controller_1.UserController().checkTime(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map