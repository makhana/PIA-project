import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  addObject(client, type, address, roomNumber, size, roomsArray, doorsArray) {
    const data = {
      client: client,
      type: type,
      address: address,
      roomNumber: roomNumber,
      size: size,
      rooms: roomsArray,
      doors: doorsArray,
    }

    return this.http.post(`${this.uri}/client/addObject`, data);
  }

  updateObject(id, username, type, address, roomNumber, size, rooms, doors) {

    const data = {
      id: id,
      client: username,
      type: type,
      address: address,
      roomNumber: roomNumber,
      size: size,
      rooms: rooms,
      doors: doors,
    }

    return this.http.post(`${this.uri}/client/updateObject`, data);
  }

  deleteObject(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/client/deleteObject`, data);
  }

  changeUserPasswordUsername(username, password) {
    const data = {
      username: username,
      password: password,
    }

    return this.http.post(`${this.uri}/client/changeUserPasswordUsername`, data);
  }

  requestRenovation(agency, client, idPlace, dateStart, dateEnd) {

    const data = {
      agency: agency,
      client: client,
      idPlace: idPlace,
      dateStart: dateStart,
      dateEnd: dateEnd,
    }

    return this.http.post(`${this.uri}/client/requestRenovation`, data);
  }

  acceptClientOffer(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/client/acceptClientOffer`, data);
  }

  declineClientOffer(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/client/declineClientOffer`, data);
  }

  submitCancelRequest(client, agency, reason, id) {
    const data = {
      client: client,
      agency: agency,
      reason: reason,
      idReq: id,
    }

    return this.http.post(`${this.uri}/client/submitCancelRequest`, data);
  }

  getCancelRequest(idReq) {
    const data = {
      idReq: idReq,
    }

    return this.http.post(`${this.uri}/client/getCancelRequest`, data);
  }

  deleteComment(agency, client) {
    const data = {
      agency: agency,
      client: client,
    }

    return this.http.post(`${this.uri}/client/deleteComment`, data);
  }

  updateComment(client, agency, comment, rating) {
    const data = {
      client: client,
      agency: agency,
      comment: comment,
      rating: rating,
    }

    return this.http.post(`${this.uri}/client/updateComment`, data);
  }

  addComment(client, agency, comment, rating) {
    const data = {
      client: client,
      agency: agency,
      comment: comment,
      rating: rating,
    }

    return this.http.post(`${this.uri}/client/addComment`, data);
  }
}
