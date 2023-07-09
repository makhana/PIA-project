import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  loginClient(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/user/loginClient`, data);
  }

  loginAgency(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/user/loginAgency`, data);
  }

  loginAdmin(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/user/loginAdmin`, data);
  }

  fileUpload(file) {

    return this.http.post(`${this.uri}/upload`, file);
  }

  register(username, password, phone, email, first_name, last_name, name, address, idNumber, description, userType, hasImage) {
    var data;
    if (hasImage) {
      data = {
        username: username,
        password: password,
        phone: phone,
        email: email,
        first_name: first_name,
        last_name: last_name,
        name: name,
        address: address,
        idNumber: idNumber,
        description: description,
        userType: userType,
        image: username + ".jpg",
      }
    } else {
      data = {
        username: username,
        password: password,
        phone: phone,
        email: email,
        first_name: first_name,
        last_name: last_name,
        name: name,
        address: address,
        idNumber: idNumber,
        description: description,
        userType: userType,
        image: "default.jpg",
      }
    }

    return this.http.post(`${this.uri}/user/register`, data);
  }

  getAllClients() {
    return this.http.get(`${this.uri}/user/getAllClients`);
  }
  getAllAgencies() {
    return this.http.get(`${this.uri}/user/getAllAgencies`);
  }
  getAllAdmins() {
    return this.http.get(`${this.uri}/user/getAllAdmins`);
  }

  sendEmail(to, subject, text) {
    const emailData = { to, subject, text };
    return this.http.post(`${this.uri}/sendEmail`, emailData);
  }


  getClient(username) {
    const data = {
      username: username,
    }
    return this.http.post(`${this.uri}/user/getClient`, data);
  }

  getAgency(username) {
    const data = {
      username: username,
    }
    return this.http.post(`${this.uri}/user/getAgency`, data);
  }

  updateClientProfile(username, name, surname, email, phone, image) {
    const data = {
      username: username,
      first_name: name,
      last_name: surname,
      email: email,
      phone: phone,
      image: image,
    }
    return this.http.post(`${this.uri}/user/updateClientProfile`, data);
  }

  updateAgencyProfile(username, name, email, phone, address, description, image) {
    const data = {
      username: username,
      name: name,
      email: email,
      phone: phone,
      image: image,
      address: address,
      description: description
    }
    return this.http.post(`${this.uri}/user/updateAgencyProfile`, data);
  }

  addWorkerRequest(agency, number) {
    const data = {
      agency: agency,
      number: number,
    }
    return this.http.post(`${this.uri}/user/addWorkerRequest`, data);
  }

  getAllPlaces(username) {
    const data = {
      client: username,
    }
    return this.http.post(`${this.uri}/user/getAllPlaces`, data);
  }


  getComments(agency) {
    const data = {
      agency: agency,
    }

    return this.http.post(`${this.uri}/user/getComments`, data);
  }

  getClientComment(client, agency) {
    const data = {
      client: client,
      agency: agency,
    }

    return this.http.post(`${this.uri}/user/getClientComment`, data);
  }


  getAllRenovationRequests(username) {
    const data = {
      client: username,
    }
    return this.http.post(`${this.uri}/user/getAllRenovationRequests`, data);
  }

  getWorkersNumber(agency) {
    const data = {
      agency: agency,
    }

    return this.http.post(`${this.uri}/user/getWorkersNumber`, data);
  }

  addWorker(agency, name, surname, email, phone, specialization) {
    const data = {
      agency: agency,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      specialization: specialization,
    }

    return this.http.post(`${this.uri}/user/addWorker`, data);
  }

  getAllWorkers(agency) {
    const data = {
      agency: agency,
    }

    return this.http.post(`${this.uri}/user/getAllWorkers`, data);
  }

  getAllRenovationRequestsAgency(username) {
    const data = {
      agency: username,
    }
    return this.http.post(`${this.uri}/user/getAllRenovationRequestsAgency`, data);
  }



  finishJob(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/user/finishJob`, data);
  }

  takeWorker(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/user/takeWorker`, data);
  }

  freeWorker(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/user/freeWorker`, data);
  }

  colorGreen(id, width, height, x, y) {
    const data = {
      id: id,
      color: "green",
      width: width,
      height: height,
      x: x,
      y: y,
    }

    return this.http.post(`${this.uri}/user/colorObject`, data);
  }


  colorRed(id, width, height, x, y) {
    const data = {
      id: id,
      color: "red",
      width: width,
      height: height,
      x: x,
      y: y,
    }

    return this.http.post(`${this.uri}/user/colorObject`, data);
  }

  colorGold(id, width, height, x, y) {
    const data = {
      id: id,
      color: "gold",
      width: width,
      height: height,
      x: x,
      y: y,
    }

    return this.http.post(`${this.uri}/user/colorObject`, data);
  }

  updateComment(client, agency, comment, rating) {
    const data = {
      client: client,
      agency: agency,
      comment: comment,
      rating: rating,
    }

    return this.http.post(`${this.uri}/user/updateComment`, data);
  }

  addComment(client, agency, comment, rating) {
    const data = {
      client: client,
      agency: agency,
      comment: comment,
      rating: rating,
    }

    return this.http.post(`${this.uri}/user/addComment`, data);
  }

  // submitCancelRequest(client, agency, reason, id) {
  //   const data = {
  //     client: client,
  //     agency: agency,
  //     reason: reason,
  //     idReq: id,
  //   }

  //   return this.http.post(`${this.uri}/user/submitCancelRequest`, data);
  // }

  // getCancelRequest(idReq) {
  //   const data = {
  //     idReq: idReq,
  //   }

  //   return this.http.post(`${this.uri}/user/getCancelRequest`, data);
  // }

  getDeclinedRegistrations() {

    return this.http.get(`${this.uri}/user/getDeclinedRegistrations`);
  }

  deleteComment(agency, client) {
    const data = {
      agency: agency,
      client: client,
    }

    return this.http.post(`${this.uri}/user/deleteComment`, data);
  }

  changeUserPassword(email, password) {
    const data = {
      email: email,
      password: password,
    }

    return this.http.post(`${this.uri}/user/changeUserPassword`, data);
  }


  addTemporaryPassword(password, email) {
    const data = {
      email: email,
      password: password,
    }

    return this.http.post(`${this.uri}/user/addTemporaryPassword`, data);
  }

  checkTime(user) {
    const data = {
      user: user,
    }

    return this.http.post(`${this.uri}/user/checkTime`, data);
  }




}
