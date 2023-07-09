import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { UserService } from '../servers/user.service';
import { Place } from '../models/place';
import { Rectangle } from '../models/rectangle';
import { Agency } from '../models/agency';
import { RenovationRequest } from '../models/renRequest';
import { CancelReq } from '../models/cancelReq';
import { ClientService } from '../servers/client.service';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private clientService: ClientService) { }

  private ctx: CanvasRenderingContext2D;

  private ctxJob: CanvasRenderingContext2D;
  rectangles: Rectangle[] = [];
  doors: Rectangle[] = [];

  nav: string = "userProfile";
  username: string;
  edit: boolean = false;
  client: Client;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  phone: string = "";
  message: string = "";

  selectedImage: any;
  invalidImage: number = 0;

  allObjects: Place[];

  allAgencies: Agency[];

  searchedAgencies: Agency[] = [];

  searchParam: string;
  sortColumn: string = "";
  sortDirection: number = 1;

  renovationRequests: RenovationRequest[];

  showRenovation: string;

  cancelBool: boolean;

  reason: string;

  isLoaded: boolean;

  ngOnInit(): void {
    this.showRenovation = "all";
    this.first_name = "";
    this.edit = false;
    this.last_name = "";
    this.email = "";
    this.phone = "";
    this.message = "";
    this.renovationRequests = [];

    this.cancelBool = false;
    this.reason = "";

    this.selectedImage = null;
    this.invalidImage = 0;

    this.allObjects = [];

    this.allAgencies = [];

    this.searchedAgencies = [];

    this.sortColumn = "";
    this.sortDirection = 1;

    this.renovationRequests = [];

    this.isLoaded =  false;


    this.username = localStorage.getItem('username');


    this.userService.getClient(this.username).subscribe((client: Client) => {
      if (client) {
        this.client = client;
        this.isLoaded = true;
      }
    })

    this.userService.getAllPlaces(this.username).subscribe((placesDB: Place[]) => {
      if (placesDB) {
        this.allObjects = placesDB;

        this.userService.getAllRenovationRequests(this.username).subscribe((requestsDB: RenovationRequest[]) => {
          if (requestsDB) {
            this.renovationRequests = requestsDB;

            for (let p of this.allObjects) {
              for (let ren of this.renovationRequests) {
                if (p.id == ren.idPlace) {
                  ren.place = p;
                }
              }
            }
            this.userService.getAllAgencies().subscribe((agenciesDB: Agency[]) => {
              if (agenciesDB) {
                this.allAgencies = agenciesDB;
                for (let a of this.allAgencies) {
                  for (let ren of this.renovationRequests) {
                    if (a.username == ren.agency) {
                      ren.agencyName = a.name;
                    }
                  }
                }
              }
            })
          }
        })
      }
    })

    // this.userService.getAllAgencies().subscribe((agenciesDB: Agency[]) => {
    //   this.allAgencies = agenciesDB;

    // })



    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    // this.canvas = new fabric.Canvas('canvas');
    // this.canvas.setBackgroundColor('#ffffff', this.canvas.renderAll.bind(this.canvas))
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    const canvas2 = <HTMLCanvasElement>document.getElementById('canvasJob');
    this.ctxJob = canvas2.getContext('2d');

    // this.canvas = new fabric.Canvas('canvas');
    // this.canvas.setBackgroundColor('#ffffff', this.canvas.renderAll.bind(this.canvas))
    this.ctxJob.fillStyle = 'white'
    this.ctxJob.fillRect(0, 0, canvas2.width, canvas2.height);


  }


  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  setNavigation(str) {
    this.nav = str;
    this.ngOnInit();
  }


  editProfile() {
    this.edit = true;
  }

  closeMessage() {
    this.message = "";
  }

  applyChanges() {
    const regexPattern = new RegExp("[+]{0,1}[0-9]+");
    if (!regexPattern.test(this.phone) && this.phone != "") {
      this.message = "Phone number in the wrong format";
      return;
    }
    // PROVERI DA LI JE NEKI PODATAK NULL
    if (this.first_name == "") {
      this.first_name = this.client.first_name;
    }
    if (this.last_name == "") {
      this.last_name = this.client.last_name;
    }
    if (this.email == "") {
      this.email = this.client.email;
    }
    if (this.phone == "") {
      this.phone = this.client.phone;
    }

    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage, this.username + '.jpg');

      this.userService.fileUpload(formData).subscribe(response => {
        console.log(response['message']);
        this.userService.updateClientProfile(this.username, this.first_name, this.last_name, this.email, this.phone, this.username + ".jpg").subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })
    } else {
      this.userService.updateClientProfile(this.username, this.first_name, this.last_name, this.email, this.phone, "").subscribe(resp => {
        console.log(resp['message']);
        this.ngOnInit();
      })
    }
  }

  imageUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const img = new Image();
      img.src = window.URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
          // Image dimensions are valid
          console.log('Image dimensions are valid');
          this.invalidImage = 0;
          this.selectedImage = file;
        } else {
          // Image dimensions are invalid
          this.message = 'Image dimensions are invalid. Image has to be between 100x100px and 300x300px';
          this.invalidImage = 1;
        }
      }

    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.rectangles = [];
    this.doors = [];
  }

  clearCanvasJob() {
    this.ctxJob.clearRect(0, 0, this.ctxJob.canvas.width, this.ctxJob.canvas.height);
    this.ctxJob.fillStyle = 'white';
    this.ctxJob.fillRect(0, 0, this.ctxJob.canvas.width, this.ctxJob.canvas.height);
    this.rectangles = [];
    this.doors = [];
  }

  drawRectangle(rect: Rectangle) {
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = rect.color;
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  drawRectangleJob(rect: Rectangle) {
    this.ctxJob.strokeStyle = 'black';
    this.ctxJob.fillStyle = rect.color;
    this.ctxJob.lineWidth = 2;
    this.ctxJob.fillRect(rect.x, rect.y, rect.width, rect.height);
    this.ctxJob.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  showDrawing(place) {
    this.clearCanvas();
    for (let r of place.rooms) {
      this.rectangles.push(r);
      this.drawRectangle(r);
    }
    for (let d of place.doors) {
      this.rectangles.push(d);
      this.drawRectangle(d);
    }

  }

  showDrawingJob(place) {

    this.clearCanvasJob();
    for (let r of place.rooms) {
      this.rectangles.push(r);
      this.drawRectangleJob(r);
    }
    for (let d of place.doors) {
      this.rectangles.push(d);
      this.drawRectangleJob(d);
    }
  }
  changeObject(place) {
    localStorage.setItem('object', JSON.stringify(place));
    this.router.navigate(["changeObject"]);
  }
  deleteObject(place) {

    this.clientService.deleteObject(place.id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  addObject() {
    this.router.navigate(["addObject"]);
  }



  search() {
    this.searchedAgencies = [];
    for (let agency of this.allAgencies) {
      if (agency.name.toLowerCase().includes(this.searchParam.toLowerCase()) || agency.address.toLowerCase().includes(this.searchParam.toLowerCase())) {
        this.searchedAgencies.push(agency);
      }
    }

  }

  clearSearch() {
    this.searchedAgencies = [];
    this.ngOnInit();
  }

  sortData(column: string) {
    // Toggle sort direction if the same column is clicked again
    if (this.sortColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortColumn = column;
      this.sortDirection = 1;
    }

    // Perform sorting based on the selected column and direction
    if (this.searchedAgencies.length == 0) {
      this.allAgencies.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        return valueA.localeCompare(valueB) * this.sortDirection;
      });
    } else {
      this.searchedAgencies.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        return valueA.localeCompare(valueB) * this.sortDirection;
      });
    }

  }

  lookUpAgency(agency) {
    localStorage.setItem('agency', JSON.stringify(agency));
    localStorage.setItem('loginUser', JSON.stringify(1));
    this.router.navigate(['showAgency']);

  }

  requestWork(agency) {
    localStorage.setItem('agency', JSON.stringify(agency));
    this.router.navigate(['request']);
  }

  searchJobs(str) {
    this.showRenovation = str;
    this.clearCanvasJob();
  }

  searchActive() {
    for (let ren of this.renovationRequests) {
      if (ren.status == 'active') {
        return true;
      }
    }
    return false;
  }

  searchFinished() {
    for (let ren of this.renovationRequests) {
      if (ren.status == 'finished') {
        return true;
      }
    }
    return false;
  }

  searchRequests() {
    for (let ren of this.renovationRequests) {
      if (ren.status == 'pending' || ren.status == 'declined' || ren.status == 'accepted') {
        return true;
      }
    }
    return false;
  }

  allGreen(place) {
    for (let r of place.rooms) {
      if (r.color != 'green') {
        return false;
      }
    }
    return true;
  }

  searchOffer() {
    for (let ren of this.renovationRequests) {
      if (ren.status == 'accepted') {
        return true;
      }
    }
    return false;
  }

  acceptOffer(id) {
    this.clientService.acceptClientOffer(id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  declineOffer(id) {
    this.clientService.declineClientOffer(id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  pay(id) {
    this.clientService.getCancelRequest(id).subscribe((cancelReq: CancelReq) => {
      if (cancelReq) {
        this.message = "You sent cancel request"
      } else {
        this.userService.finishJob(id).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      }
    })
  }

  leaveReview(renReq) {
    localStorage.setItem('review', JSON.stringify(renReq));
    this.router.navigate(["review"]);
  }

  cancel() {
    this.cancelBool = true;
  }


  submit(ren) {
    this.clientService.getCancelRequest(ren.id).subscribe((cancelReq: CancelReq) => {
      if (cancelReq) {
        this.message = "You already sent cancel request"
      } else {
        this.clientService.submitCancelRequest(this.username, ren.agency, this.reason, ren.id).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      }
    })
  }

  changePassword(){
    localStorage.setItem('changePassword', "client");
    this.router.navigate(["changePassword"]);
  }



}
