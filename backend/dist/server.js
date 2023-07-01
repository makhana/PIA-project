"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express from 'express';
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const image_1 = __importDefault(require("./models/image"));
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const express = require('express');
const app = express();
app.use((0, cors_1.default)());
app.use(express.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/projekat');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express.Router();
router.use('/user', user_router_1.default);
router.use('/admin', admin_router_1.default);
//////////////// FILE UPLOAD /////////////////
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`);
    }
});
var upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imagePath = req.file.path;
        const username = imagePath.slice(8);
        const image = new image_1.default({
            username: username,
            src: imagePath
        });
        yield image.save();
        res.json({ message: 'Image uploaded and saved successfully' });
    }
    catch (error) {
        res.json({ message: 'Failed to upload and save the image' });
    }
}));
//////////////////////////////////////////////
// router.get('/image', async (req, res) => {
//     try {
//       const imageUsername = req.params.username;
//       // Retrieve the image from the database using the provided ID
//       const image = await ImageModel.findOne({'username': imageUsername + '.jpg'});
//       if (!image) {
//         return res.status(404).json({ error: 'Image not found.' });
//       }
//       // Return the image source to the frontend
//       res.sendFile(image.src);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve the image.' });
//     }
//   });
//////////////////// MAIL ////////////////////
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8556f5955e1246",
        pass: "dfec122a316e96"
    }
});
app.post('/sendEmail', (req, res) => {
    const { to, subject, text } = req.body;
    // create email options
    const mailOptions = {
        from: 'anamako3383@gmail.com',
        to,
        subject,
        text
    };
    // send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'email sent successfully' });
        }
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map