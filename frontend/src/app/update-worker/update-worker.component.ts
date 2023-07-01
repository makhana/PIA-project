import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../servers/admin.service';
import { UserService } from '../servers/user.service';
import { WorkerAgency } from '../models/worker';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrls: ['./update-worker.component.css']
})
export class UpdateWorkerComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService, private userService: UserService) { }

  message: string;

  name: string;
  surname: string;
  email: string;
  phone: string;
  specialization: string;

  worker: WorkerAgency;

  ngOnInit(): void {
    this.message = "";
    this.name = "";
    this.surname = "";
    this.email = "";
    this.phone = "";
    this.specialization = "";

    this.worker = JSON.parse(localStorage.getItem('updateWorker'));
  }

  closeMessage() {
    this.message = "";
  }

  back() {
    localStorage.removeItem('updateWorker');
    this.router.navigate(["showAdminAgency"]);
  }

  applyChanges() {
    const regexPattern = new RegExp("[+]{0,1}[0-9]+");
    if (!regexPattern.test(this.phone) && this.phone != "") {
      this.message = "Phone number in the wrong format";
      return;
    }

    if (this.name == "") {
      this.name = this.worker.name;
    }
    if (this.surname == "") {
      this.surname = this.worker.surname;
    }
    if (this.email == "") {
      this.email = this.worker.email;
    }
    if (this.phone == "") {
      this.phone = this.worker.phone;
    }

    this.adminService.updateWorker(this.worker.id, this.name, this.surname, this.email, this.phone, this.specialization).subscribe(resp => {
      console.log(resp['message']);
      localStorage.removeItem('updateWorker');
      this.router.navigate(["showAdminAgency"]);
    })

    

  }

}
