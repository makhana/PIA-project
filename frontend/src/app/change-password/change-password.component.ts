import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';
import { Client } from '../models/client';
import { Agency } from '../models/agency';
import { ClientService } from '../servers/client.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private clientService: ClientService) { }

  username: string;
  userType: string;
  message: string;

  passwordOld: string;
  passwordNew: string;
  passwordConfirm: string;

  client: Client;
  agency: Agency

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.userType = localStorage.getItem('changePassword');

    this.passwordOld = "";
    this.passwordNew = "";
    this.passwordConfirm = "";
    this.message = "";

    this.client = null;
    this.agency = null

    this.userService.getClient(this.username).subscribe((clientDB: Client) => {
      if (clientDB) {
        this.client = clientDB
      } else {
        this.userService.getAgency(this.username).subscribe((agencyDB: Agency) => {
          this.agency = agencyDB
        })
      }
    })
  }

  back() {
    this.router.navigate([this.userType]);
  }

  closeMessage() {
    this.message = "";
  }

  submit() {
    if (this.userType == 'client') {
      if (this.passwordOld != this.client.password) {
        this.message = "Old password is incorrect";
        return;
      }
      if (this.passwordNew != this.passwordConfirm) {
        this.message = "New password and confirmed password are not the same";
        return;
      }
      this.clientService.changeUserPasswordUsername(this.username, this.passwordNew).subscribe(resp => {
        console.log(resp['message']);
        sessionStorage.clear();
        this.router.navigate([""]);
      })

    } else {
      if (this.passwordOld != this.agency.password) {
        this.message = "Old password is incorrect";
        return;
      }
      if (this.passwordNew != this.passwordConfirm) {
        this.message = "New password and confirmed password are not the same";
        return;
      }
      this.clientService.changeUserPasswordUsername(this.username, this.passwordNew).subscribe(resp => {
        console.log(resp['message']);
        sessionStorage.clear();
        this.router.navigate([""]);
      })
    }

  }

}
