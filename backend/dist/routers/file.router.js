"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const fileRouter = express_1.default.Router();
fileRouter.route('/getImage/:id').get((req, res) => new user_controller_1.UserController().getImage(req, res));
exports.default = fileRouter;
//# sourceMappingURL=file.router.js.map