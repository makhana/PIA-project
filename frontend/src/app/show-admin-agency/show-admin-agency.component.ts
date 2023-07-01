import { Component, OnInit } from '@angular/core';
import { UserService } from '../servers/user.service';
import { Router } from '@angular/router';
import { AdminService } from '../servers/admin.service';
import { Agency } from '../models/agency';
import { WorkerAgency } from '../models/worker';
import { WorkersRequest } from '../models/workerRequest';

@Component({
  selector: 'app-show-admin-agency',
  templateUrl: './show-admin-agency.component.html',
  styleUrls: ['./show-admin-agency.component.css']
})
export class ShowAdminAgencyComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private adminService: AdminService) { }

  agency: Agency;
  allWorkers: WorkerAgency[];
  workerRequest: WorkersRequest;

  ngOnInit(): void {
    this.allWorkers = [];
    this.workerRequest = null;

    this.agency = JSON.parse(localStorage.getItem('adminAgency'));


    this.userService.getAllWorkers(this.agency.username).subscribe((workersDB: WorkerAgency[]) => {
      if (workersDB) {
        this.allWorkers = workersDB;
      }
    })

    this.adminService.getWorkerRequest(this.agency.username).subscribe((req: WorkersRequest) => {
      if (req) {
        this.workerRequest = req;
        console.log(req)
      }
    })
  }

  back() {
    localStorage.removeItem('adminAddWorker');
    localStorage.removeItem('updateWorker');
    this.router.navigate(["admin"]);
  }

  addWorker() {
    localStorage.setItem('adminAddWorker', this.agency.username);
    this.router.navigate(['addWorker']);
  }

  updateWorker(worker) {
    localStorage.setItem('updateWorker', JSON.stringify(worker));
    this.router.navigate(['updateWorker']);
  }

  deleteWorker(worker) {
    this.adminService.deleteWorker(worker.id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  accept(){
    this.adminService.acceptWorkerRequest(this.agency.username).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  decline(){
    this.adminService.declineWorkerRequest(this.agency.username).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

}
