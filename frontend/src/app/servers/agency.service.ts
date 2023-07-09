import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  declineRequest(id) {
    const data = {
      id: id,
    }

    return this.http.post(`${this.uri}/agency/declineJobRequest`, data);
  }

  acceptRequest(id, offer) {
    const data = {
      id: id,
      offer: offer
    }

    return this.http.post(`${this.uri}/agency/acceptJobRequest`, data);
  }

}
