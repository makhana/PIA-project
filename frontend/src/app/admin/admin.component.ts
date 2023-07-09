import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { Agency } from '../models/agency';
import { Registration } from '../models/registrationReq';
import { WorkerAgency } from '../models/worker';
import { WorkersRequest } from '../models/workerRequest';
import { RenovationRequest } from '../models/renRequest';
import { UserService } from '../servers/user.service';
import { AdminService } from '../servers/admin.service';
import { CancelReq } from '../models/cancelReq';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private adminService: AdminService) { }

  allClients: Client[];
  allAgencies: Agency[];
  allRegistrationRequests: Registration[];
  allWorkers: WorkerAgency[];
  allWorkerRequests: WorkersRequest[];
  allJobs: RenovationRequest[];
  allCancellations: CancelReq[];

  ngOnInit(): void {
    this.allClients = [];
    this.allAgencies = [];
    this.allRegistrationRequests = [];
    this.allWorkers = [];
    this.allWorkerRequests = [];
    this.allJobs = [];
    this.allCancellations = [];


    this.userService.getAllClients().subscribe((clientsDB: Client[]) => {
      if (clientsDB) {
        this.allClients = clientsDB;
      }
    })
    this.userService.getAllAgencies().subscribe((agenciesDB: Agency[]) => {
      if (agenciesDB) {
        this.allAgencies = agenciesDB;
      }
    })

    this.adminService.getAllRegistrationRequests().subscribe((registrationsDB: Registration[]) => {
      if (registrationsDB) {
        this.allRegistrationRequests = registrationsDB;
      }
    })

    this.adminService.getAllRenovationRequests().subscribe((renovationReqDB: RenovationRequest[]) => {
      if (renovationReqDB) {
        this.allJobs = renovationReqDB;
      }
    })

    this.adminService.getAllCancellations().subscribe((cancellationsReq: CancelReq[]) => {
      if(cancellationsReq){
        this.allCancellations = cancellationsReq;
      }
    })
  }

  lookUpAgency(agency) {
    localStorage.setItem('adminAgency', JSON.stringify(agency));
    this.router.navigate(['showAdminAgency']);

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["loginAdmin"]);
  }

  deleteClient(client) {
    this.adminService.deleteClient(client.username).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  deleteAgency(agency) {
    this.adminService.deleteAgency(agency.username).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  updateClient(client) {
    localStorage.setItem('updateClientAdmin', JSON.stringify(client))
    this.router.navigate(['updateClient']);
  }

  updateAgency(agency) {
    localStorage.setItem('updateAgencyAdmin', JSON.stringify(agency))
    this.router.navigate(['updateAgency']);
  }

  addClient() {
    this.router.navigate(['addClient']);
  }

  addAgency() {
    this.router.navigate(['addAgency']);
  }

  checkClient() {
    for (let req of this.allRegistrationRequests) {
      if (req.userType == 'client') {
        return true;
      }
    }
    return false;
  }

  checkAgency() {
    for (let req of this.allRegistrationRequests) {
      if (req.userType == 'agency') {
        return true;
      }
    }
    return false;
  }

  declineClientRegister(req) {
    this.adminService.declineRegistration(req.id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  declineAgencyRegister(req) {
    this.adminService.declineRegistration(req.id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  acceptClient(req) {
    if (req.image == "default.jpg") {
      this.adminService.addClient(req.username, req.password, req.phone, req.email, req.first_name, req.last_name, 0).subscribe(resp => {
        console.log(resp['message']);
        //DELETE REQ
        this.adminService.deleteRegistration(req.id).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })

    } else {
      this.adminService.addClient(req.username, req.password, req.phone, req.email, req.first_name, req.last_name, 1).subscribe(resp => {
        console.log(resp['message']);
        //DELETE REQ
        this.adminService.deleteRegistration(req.id).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })
    }
  }

  acceptAgency(req) {
    if (req.image == "default.jpg") {
      this.adminService.addAgency(req.username, req.password, req.phone, req.email, req.name, req.address, req.idNumber, req.description, 0).subscribe(resp => {
        console.log(resp['message']);
        //DELETE REQ
        this.adminService.deleteRegistration(req.id).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })

    } else {
      this.adminService.addAgency(req.username, req.password, req.phone, req.email, req.name, req.address, req.idNumber, req.description, 1).subscribe(resp => {
        console.log(resp['message']);
        //DELETE REQ
        this.adminService.deleteRegistration(req.id).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })
    }
  }

  checkCancellation(job){
    for(let c of this.allCancellations){
      if(c.idReq == job.id){
        return true;
      }
    }
    return false;
  }

  returnReason(job){
    for(let c of this.allCancellations){
      if(c.idReq == job.id){
        return c.reason;
      }
    }

    return "none";
  }

  acceptCancellation(job){
    this.adminService.acceptCancellation(job.id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  declineCancellation(job){
    this.adminService.declineCancellation(job.id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

}
