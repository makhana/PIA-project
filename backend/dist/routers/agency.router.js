"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const agencyRouter = express_1.default.Router();
agencyRouter.route('/declineJobRequest').post((req, res) => new agency_controller_1.AgencyController().declineJobRequest(req, res));
agencyRouter.route('/acceptJobRequest').post((req, res) => new agency_controller_1.AgencyController().acceptJobRequest(req, res));
exports.default = agencyRouter;
//# sourceMappingURL=agency.router.js.map