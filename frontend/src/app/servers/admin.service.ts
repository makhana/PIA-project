import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  deleteClient(username) {
    const data = {
      username: username,
    }

    return this.http.post(`${this.uri}/admin/deleteClient`, data);
  }

  deleteAgency(username) {
    const data = {
      username: username,
    }

    return this.http.post(`${this.uri}/admin/deleteAgency`, data);
  }

  addAgency(username, password, phone, email, name, address, idNumber, description, image) {
    var data;
    if (image) {
      data = {
        username: username,
        password: password,
        phone: phone,
        email: email,
        name: name,
        address: address,
        idNumber: idNumber,
        description: description,
        image: username + ".jpg",
      }
    } else {
      data = {
        username: username,
        password: password,
        phone: phone,
        email: email,
        name: name,
        address: address,
        idNumber: idNumber,
        description: description,
        image: "default.jpg",
      }
    }

    return this.http.post(`${this.uri}/admin/addAgency`, data);
  }

  addClient(username, password, phone, email, first_name, last_name, image) {
    var data;
    if (image) {
      data = {
        username: username,
        password: password,
        phone: phone,
        email: email,
        first_name: first_name,
        last_name: last_name,
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
        image: "default.jpg",
      }
    }

    return this.http.post(`${this.uri}/admin/addClient`, data);
  }

  getAllRegistrationRequests() {

    return this.http.get(`${this.uri}/admin/getRegistrationRequests`);
  }

  declineRegistration(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/admin/declineRegistration`, data);
  }

  deleteRegistration(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/admin/deleteRegistration`, data);
  }

  deleteWorker(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/admin/deleteWorker`, data);
  }

  updateWorker(id, name, surname, email, phone, specialization) {
    const data = {
      id: id,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      specialization: specialization,
    }

    return this.http.post(`${this.uri}/admin/updateWorker`, data);
  }

  getWorkerRequest(agency) {
    const data = {
      agency: agency,
    }

    return this.http.post(`${this.uri}/admin/getWorkerRequest`, data);
  }

  declineWorkerRequest(agency) {
    const data = {
      agency: agency,
    }

    return this.http.post(`${this.uri}/admin/declineWorkerRequest`, data);
  }

  acceptWorkerRequest(agency) {
    const data = {
      agency: agency,
    }

    return this.http.post(`${this.uri}/admin/acceptWorkerRequest`, data);
  }

  getAllRenovationRequests() {

    return this.http.get(`${this.uri}/admin/getAllRenovationRequests`);
  }

  getAllCancellations() {

    return this.http.get(`${this.uri}/admin/getAllCancellations`);
  }


  declineCancellation(idReq) {
    const data = {
      idReq: idReq,
    }

    return this.http.post(`${this.uri}/admin/declineCancellation`, data);
  }

  acceptCancellation(idReq) {
    const data = {
      idReq: idReq,
    }

    return this.http.post(`${this.uri}/admin/acceptCancellation`, data);
  }



}
