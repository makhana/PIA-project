import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/loginClient').post(
    (req, res) => new UserController().loginClient(req, res)
)
userRouter.route('/loginAgency').post(
    (req, res) => new UserController().loginAgency(req, res)
)
userRouter.route('/loginAdmin').post(
    (req, res) => new UserController().loginAdmin(req, res)
)


userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/getAllClients').get(
    (req, res) => new UserController().getAllClients(req, res)
)
userRouter.route('/getAllAgencies').get(
    (req, res) => new UserController().getAllAgencies(req, res)
)
userRouter.route('/getAllAdmins').get(
    (req, res) => new UserController().getAllAdmins(req, res)
)

userRouter.route('/getImage/:id').get((req, res)=>{
    const fs = require('fs')
    
    try{
        fs.readFile('uploads/'+req.params.id, function(err, data) {
          if (err) throw err;
          else {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
          }
        });
      }catch{
        console.log("ERROR while loading image");
        res.status(400);
      }
})

userRouter.route('/getClient').post(
    (req, res) => new UserController().getClient(req, res)
)

userRouter.route('/getAgency').post(
    (req, res) => new UserController().getAgency(req, res)
)

userRouter.route('/updateClientProfile').post(
    (req, res) => new UserController().updateClientProfile(req, res)
)

userRouter.route('/updateAgencyProfile').post(
    (req, res) => new UserController().updateAgencyProfile(req, res)
)


userRouter.route('/getAllPlaces').post(
    (req, res) => new UserController().getAllPlaces(req, res)
)

userRouter.route('/addObject').post(
    (req, res) => new UserController().addObject(req, res)
)

userRouter.route('/deleteObject').post(
    (req, res) => new UserController().deleteObject(req, res)
)

userRouter.route('/getComments').post(
    (req, res) => new UserController().getComments(req, res)
)

userRouter.route('/updateObject').post(
    (req, res) => new UserController().updateObject(req, res)
)

userRouter.route('/requestRenovation').post(
    (req, res) => new UserController().requestRenovation(req, res)
)

userRouter.route('/getAllRenovationRequests').post(
    (req, res) => new UserController().getAllRenovationRequests(req, res)
)

userRouter.route('/getAllRenovationRequestsAgency').post(
    (req, res) => new UserController().getAllRenovationRequestsAgency(req, res)
)

userRouter.route('/declineJobRequest').post(
    (req, res) => new UserController().declineJobRequest(req, res)
)

userRouter.route('/acceptJobRequest').post(
    (req, res) => new UserController().acceptJobRequest(req, res)
)

userRouter.route('/acceptClientOffer').post(
    (req, res) => new UserController().acceptClientOffer(req, res)
)

userRouter.route('/declineClientOffer').post(
    (req, res) => new UserController().declineClientOffer(req, res)
)

userRouter.route('/finishJob').post(
    (req, res) => new UserController().finishJob(req, res)
)

userRouter.route('/takeWorker').post(
    (req, res) => new UserController().takeWorker(req, res)
)

userRouter.route('/freeWorker').post(
    (req, res) => new UserController().freeWorker(req, res)
)

userRouter.route('/colorObject').post(
    (req, res) => new UserController().colorObject(req, res)
)

userRouter.route('/getClientComment').post(
    (req, res) => new UserController().getClientComment(req, res)
)

userRouter.route('/updateComment').post(
    (req, res) => new UserController().updateComment(req, res)
)

userRouter.route('/addComment').post(
    (req, res) => new UserController().addComment(req, res)
)

userRouter.route('/submitCancelRequest').post(
    (req, res) => new UserController().submitCancelRequest(req, res)
)

userRouter.route('/getCancelRequest').post(
    (req, res) => new UserController().getCancelRequest(req, res)
)

userRouter.route('/addWorkerRequest').post(
    (req, res) => new UserController().addWorkerRequest(req, res)
)

userRouter.route('/getWorkersNumber').post(
    (req, res) => new UserController().getWorkersNumber(req, res)
)

userRouter.route('/addWorker').post(
    (req, res) => new UserController().addWorker(req, res)
)

userRouter.route('/getAllWorkers').post(
    (req, res) => new UserController().getAllWorkers(req, res)
)

userRouter.route('/getDeclinedRegistrations').get(
    (req, res) => new UserController().getDeclinedRegistrations(req, res)
)

userRouter.route('/deleteComment').post(
    (req, res) => new UserController().deleteComment(req, res)
)

userRouter.route('/changeUserPassword').post(
    (req, res) => new UserController().changeUserPassword(req, res)
)

userRouter.route('/changeUserPasswordUsername').post(
    (req, res) => new UserController().changeUserPasswordUsername(req, res)
)






export default userRouter;