import { Component, OnInit } from '@angular/core';
import { UserService } from '../servers/user.service';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { WorkerAgency } from '../models/worker';
import { WorkersRequest } from '../models/workerRequest';
import { RenovationRequest } from '../models/renRequest';
import { Place } from '../models/place';
import { Client } from '../models/client';
import { Rectangle } from '../models/rectangle';

@Component({
  selector: 'app-agencija',
  templateUrl: './agencija.component.html',
  styleUrls: ['./agencija.component.css']
})
export class AgencijaComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  agency: Agency;
  edit: boolean;

  selectedImage: any;
  invalidImage: number = 0;

  phone: string;
  email: string;
  name: string;
  address: string;
  description: string;

  message: string;

  allWorkers: WorkerAgency[];
  numberOfWorkersAllowed: number;
  numberOfWorkers: number;

  num: number;

  allJobRequests: RenovationRequest[];

  offer: number;

  showRenovation: string;

  private ctx: CanvasRenderingContext2D;
  rectangles: Rectangle[] = [];
  doors: Rectangle[] = [];

  ngOnInit(): void {
    this.edit = false;
    this.message = "";

    this.phone = "";
    this.email = "";
    this.name = "";
    this.address = "";
    this.description = "";

    this.allWorkers = [];
    this.numberOfWorkersAllowed = 0;
    this.numberOfWorkers = 0;

    this.allJobRequests = [];

    this.showRenovation = "all";

    this.offer = 0;

    this.username = localStorage.getItem('username');
    this.userService.getAgency(this.username).subscribe((agency: Agency) => {
      this.agency = agency;
    })

    this.userService.getWorkersNumber(this.username).subscribe((wr: WorkersRequest) => {
      if (wr.status == 'approved') {
        this.numberOfWorkersAllowed = wr.number;

      }
    })

    this.userService.getAllWorkers(this.username).subscribe((workers: WorkerAgency[]) => {
      this.allWorkers = workers;
      this.numberOfWorkers = workers.length;
    })



    this.userService.getAllRenovationRequestsAgency(this.username).subscribe((requestsDB: RenovationRequest[]) => {
      
      for (let req of requestsDB) {
        this.userService.getAllPlaces(req.client).subscribe((placesDB: Place[]) => {
          for (let p of placesDB) {
            if (req.idPlace == p.id) {
              req.place = p;
              break;
            }
          }
          this.userService.getClient(req.client).subscribe((client: Client) => {
            req.clientName = client.first_name;
            req.clientSurname = client.last_name;
            this.userService.getAgency(this.username).subscribe((agency: Agency) => {
              req.agencyName = agency.name;
            })
          })
        })
      }
      this.allJobRequests = requestsDB;
    })


    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    // this.canvas = new fabric.Canvas('canvas');
    // this.canvas.setBackgroundColor('#ffffff', this.canvas.renderAll.bind(this.canvas))
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }



  logout() {
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  editProfile() {
    this.edit = true;
  }

  applyChanges() {
    const regexPattern = new RegExp("[+]{0,1}[0-9]+");
    if (!regexPattern.test(this.phone) && this.phone != "") {
      this.message = "Phone number in the wrong format";
      return;
    }
    // PROVERI DA LI JE NEKI PODATAK NULL
    if (this.name == "") {
      this.name = this.agency.name;
    }
    if (this.email == "") {
      this.email = this.agency.email;
    }
    if (this.phone == "") {
      this.phone = this.agency.phone;
    }
    if (this.address == "") {
      this.address = this.agency.address;
    }
    if (this.description == "") {
      this.description = this.agency.description;
    }

    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage, this.username + '.jpg');

      this.userService.fileUpload(formData).subscribe(response => {
        console.log(response['message']);
        this.userService.updateAgencyProfile(this.username, this.name, this.email, this.phone, this.address, this.description, this.username + ".jpg").subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })
    } else {
      this.userService.updateAgencyProfile(this.username, this.name, this.email, this.phone, this.address, this.description, "").subscribe(resp => {
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

  requestWorker() {
    this.router.navigate(["requestWorker"]);
  }

  addWorker() {
    this.router.navigate(["addWorker"]);
  }

  searchPending() {
    for (let job of this.allJobRequests) {
      if (job.status == "pending") {
        return true;
      }
    }
    return false;
  }

  decline(id) {
    this.userService.declineRequest(id).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  accept(id) {
    if (!this.offer) {
      this.message = "Input offer to proceed";
      return;
    }
    console.log(id)
    this.userService.acceptRequest(id, this.offer).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

  searchJobs(str) {
    this.showRenovation = str;
  }

  searchActive() {
    for (let ren of this.allJobRequests) {
      if (ren.status == 'active') {
        return true;
      }
    }
    return false;
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

  drawRectangle(rect: Rectangle) {
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = rect.color;
    this.ctx.lineWidth = 2;
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.rectangles = [];
    this.doors = [];
  }


  work(job) {
    localStorage.setItem('workObject', JSON.stringify(job));
    this.router.navigate(["work"]);
  }

  allGreen(job){
    
    for(let r of job.place.rooms){
      if(r.color != 'green'){
        return false;
      }
    }
    return true;
  }

  closeMessage(){
    this.message = "";
  }

  changePassword(){
    localStorage.setItem('changePassword', "agency");
    this.router.navigate(["changePassword"]);
  }
}
