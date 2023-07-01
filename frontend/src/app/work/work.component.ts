import { Component, OnInit } from '@angular/core';
import { RenovationRequest } from '../models/renRequest';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';
import { Rectangle } from '../models/rectangle';
import { WorkerAgency } from '../models/worker';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }


  private ctx: CanvasRenderingContext2D;
  rectangles: Rectangle[] = [];
  doors: Rectangle[] = [];

  object: RenovationRequest;

  //allWorkers: WorkerAgency[] = [];
  freeWorkers: WorkerAgency[] = [];
  workersWorking: any[][] = [[]];

  workersNum: number[] = [];

  freeWorkersNum: number;

  message: string;

  sum: number;



  ngOnInit(): void {
    this.object = JSON.parse(localStorage.getItem('workObject'));
    console.log(this.object)

    this.freeWorkersNum = 0;
    this.message = "";

    this.rectangles = this.object.place.rooms;
    this.doors = this.object.place.doors;


    this.workersWorking = JSON.parse(localStorage.getItem(JSON.stringify(this.object.idPlace) + "workersWorking"));
    this.workersNum = JSON.parse(localStorage.getItem(JSON.stringify(this.object.idPlace) + "workersNum"));


    this.sum = 0;


    if (this.workersNum == null || this.workersWorking == null) {
      console.log('usla')
      this.workersNum = [];
      this.workersWorking = [];

      for (let i = 0; i < this.rectangles.length; i++) {
        this.workersNum[i] = 0;
        this.workersWorking[i] = [];
      }
    } else {
      for (let i = 0; i < this.workersNum.length; i++) {
        this.sum += this.workersNum[i];
      }
    }

    this.userService.getAllWorkers(this.object.agency).subscribe((workersDB: WorkerAgency[]) => {

      for (let w of workersDB) {
        if (w.status == 'free') {
          this.freeWorkersNum += 1;
          this.freeWorkers.push(w);
        }
      }


      console.log(this.sum)
      if (this.freeWorkers.length + this.sum < this.rectangles.length) {
        for (let rec of this.rectangles) {
          rec.color = "gold";
          this.userService.colorGold(this.object.idPlace, rec.width, rec.height, rec.x, rec.y).subscribe(resp => {
            console.log(resp['message']);
          })
        }
        this.message = "Insufficient number of workers";
        this.drawCanvas();
      }
    })



    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.drawCanvas();

  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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

  drawCanvas() {
    for (let rect of this.rectangles) {

      this.drawRectangle(rect);
    }
    for (let door of this.doors) {
      this.drawRectangle(door);
    }
  }

  finishRoom(i) {
    this.rectangles[i].color = 'green';
    this.userService.colorGreen(this.object.idPlace, this.rectangles[i].width, this.rectangles[i].height, this.rectangles[i].x, this.rectangles[i].y).subscribe(resp => {
      console.log(resp['message']);
    })
    //this.roomProgress[i] = 'red';
    //object.id
    this.drawCanvas();
  }

  equipRoom(i) {
    for (let j = 0; j < this.workersNum.length; j++) {
      if (this.workersNum[j] == 0) {
        this.message = "Add workers to rooms that have 0 then start working on the rooms";
        return;
      }
    }
    this.rectangles[i].color = 'red';
    this.userService.colorRed(this.object.idPlace, this.rectangles[i].width, this.rectangles[i].height, this.rectangles[i].x, this.rectangles[i].y).subscribe(resp => {
      console.log(resp['message']);
    })
    //this.roomProgress[i] = 'green';
    this.drawCanvas();
  }

  addWorker(i) {
    if (this.workersNum[i] != 0) {
      for (let j = 0; j < this.workersNum.length; j++) {
        if (this.workersNum[j] == 0) {
          this.message = "Add workers to rooms that have 0 then add additional";
          return;
        }
      }
    }
    if (this.freeWorkers.length != 0) {
      this.workersNum[i]++;
      let wor = this.freeWorkers.pop();

      this.workersWorking[i].push(wor)

      this.userService.takeWorker(wor.id).subscribe(resp => {
        console.log(resp['message']);
      })
    } else {
      this.message = "No more free workers";
      return;
    }

  }

  checkSubmit() {
    for (let r of this.rectangles) {
      if (r.color != 'green') {
        return false;
      }
    }
    return true;
  }

  submit() {
    localStorage.removeItem('workersWorking');
    localStorage.removeItem('workersNum');


    for (let i = 0; i < this.workersWorking.length; i++) {
      for (let j = 0; j < this.workersWorking[i].length; j++) {
        this.userService.freeWorker(this.workersWorking[i][j].id).subscribe(resp => {
          console.log(resp['message'])

        })
      }
    }
    this.router.navigate(["agency"]);

  }


  back() {
    localStorage.setItem(JSON.stringify(this.object.idPlace) + "workersNum", JSON.stringify(this.workersNum));
    localStorage.setItem(JSON.stringify(this.object.idPlace) + "workersWorking", JSON.stringify(this.workersWorking));

    this.router.navigate(["agency"]);
  }

  closeMessage() {
    this.message = "";
  }

}
