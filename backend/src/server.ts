//import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import ImageModel from './models/image';
import adminRouter from './routers/admin.router';



const express = require('express')


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projekat');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connected');
})

const router = express.Router();
router.use('/user', userRouter);
router.use('/admin', adminRouter);


//////////////// FILE UPLOAD /////////////////
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

var upload = multer({storage: storage});

app.post('/upload', upload.single('file'), async (req, res) => {
    try{
        const imagePath = req.file.path;

        const username = imagePath.slice(8);

        const image = new ImageModel({
            username: username,
            src: imagePath
        });
        await image.save();
        res.json({message: 'Image uploaded and saved successfully'});
    } catch (error){
        res.json({message: 'Failed to upload and save the image'});
    }
   
})
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
    const {to, subject, text} = req.body;


    // create email options
    const mailOptions = {
        from: 'anamako3383@gmail.com',
        to,
        subject,
        text
    };

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.json({message: 'email sent successfully'});
        }
    })
})






app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));