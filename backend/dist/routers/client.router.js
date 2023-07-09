"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../controllers/client.controller");
const clientRouter = express_1.default.Router();
clientRouter.route('/addObject').post((req, res) => new client_controller_1.ClientController().addObject(req, res));
clientRouter.route('/updateObject').post((req, res) => new client_controller_1.ClientController().updateObject(req, res));
clientRouter.route('/deleteObject').post((req, res) => new client_controller_1.ClientController().deleteObject(req, res));
clientRouter.route('/changeUserPasswordUsername').post((req, res) => new client_controller_1.ClientController().changeUserPasswordUsername(req, res));
clientRouter.route('/requestRenovation').post((req, res) => new client_controller_1.ClientController().requestRenovation(req, res));
clientRouter.route('/acceptClientOffer').post((req, res) => new client_controller_1.ClientController().acceptClientOffer(req, res));
clientRouter.route('/declineClientOffer').post((req, res) => new client_controller_1.ClientController().declineClientOffer(req, res));
clientRouter.route('/submitCancelRequest').post((req, res) => new client_controller_1.ClientController().submitCancelRequest(req, res));
clientRouter.route('/getCancelRequest').post((req, res) => new client_controller_1.ClientController().getCancelRequest(req, res));
clientRouter.route('/deleteComment').post((req, res) => new client_controller_1.ClientController().deleteComment(req, res));
clientRouter.route('/updateComment').post((req, res) => new client_controller_1.ClientController().updateComment(req, res));
clientRouter.route('/addComment').post((req, res) => new client_controller_1.ClientController().addComment(req, res));
exports.default = clientRouter;
//# sourceMappingURL=client.router.js.map