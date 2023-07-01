import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';
import { fabric } from 'fabric';
import { Rectangle } from '../models/rectangle';
import { Place } from '../models/place';

@Component({
  selector: 'app-change-object',
  templateUrl: './change-object.component.html',
  styleUrls: ['./change-object.component.css']
})
export class ChangeObjectComponent implements OnInit {

  private ctx: CanvasRenderingContext2D;
  rectangles: Rectangle[] = [];
  doors: Rectangle[] = [];
  private selectedRectangle: Rectangle = null;
  private selectedDoor: Rectangle = null;
  private isDraggingRectangle = false;
  private isDraggingDoor = false;
  private prevMouseX = 0;
  private prevMouseY = 0;
  private intersect: boolean = false;

  jsonData: Place[] = [];

  doorError: boolean = false;

  message: string = "";
  objectType: string;
  address: string;
  rooms: number;
  size: number;

  canvas: fabric.Canvas;
  width: number = 0;
  height: number = 0;


  isDrawing: boolean = false;

  username: string;

  myPlace: Place;
  

  constructor(private router: Router, private userService: UserService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.myPlace = JSON.parse(localStorage.getItem('object'));

    this.rectangles = [];
    this.doors = [];
    this.objectType = "";
    this.address = "";
    this.rooms = 0;
    this.size = 0;
   
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    // this.canvas = new fabric.Canvas('canvas');
    // this.canvas.setBackgroundColor('#ffffff', this.canvas.renderAll.bind(this.canvas))
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.renderer.listen(canvas, 'mousedown', this.onMouseDown.bind(this));
    this.renderer.listen(canvas, 'mousemove', this.onMouseMove.bind(this));
    this.renderer.listen(canvas, 'mouseup', this.onMouseUp.bind(this));
    

  }

  closeMessage(){
    this.message = "";
  }

  checkIntersection(rect1: Rectangle, rect2: Rectangle): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  onMouseDown(event: MouseEvent) {
    if(this.jsonData.length != 0){
      return;
    }
    const rect = this.getRectangleAtPosition(event.offsetX, event.offsetY);
    const door = this.getDoorAtPosition(event.offsetX, event.offsetY);
    if(rect && !door){
      this.message = "";
      this.selectedRectangle = rect;
      this.isDraggingRectangle = true;
      this.prevMouseX = event.offsetX;
      this.prevMouseY = event.offsetY;
      if(this.doors.length != 0){
        this.selectedDoor = this.getDoorInsideRectangle(rect);
      }
      
    } else if(!rect && !door){
      if(!this.rooms || !this.size){
        this.message = "complete the form before drawing on canvas";
        return;
      }
      else if(this.width == 0 || this.height == 0){
        this.message = "type width and height of the room to draw";
        return;
      }else if(this.rectangles.length == this.rooms){
        this.message = "can't have more than specified number of rooms";
        return;
      }else{
        this.message = "";
        this.isDrawing = true;
      }
    } else {
      if (door) {
        this.selectedRectangle = rect;
        this.selectedDoor = door;
        this.isDraggingDoor = true;
        this.prevMouseX = event.offsetX - this.selectedDoor.x;
        this.prevMouseY = event.offsetY - this.selectedDoor.y;
      }
    }
   
  }

  onMouseMove(event: MouseEvent) {
    if(this.jsonData.length != 0){
      return;
    }
    if (this.isDraggingRectangle && this.selectedRectangle && !this.selectedDoor) {
      const dx = event.offsetX - this.prevMouseX;
      const dy = event.offsetY - this.prevMouseY;

      // Calculate the new position of the rectangle
      const newRectX = this.selectedRectangle.x + dx;
      const newRectY = this.selectedRectangle.y + dy;

      // Check for collisions with other rectangles
      const isCollision = this.rectangles.some(rect => {
        if (rect !== this.selectedRectangle) {
          return (
            newRectX < rect.x + rect.width &&
            newRectX + this.selectedRectangle.width > rect.x &&
            newRectY < rect.y + rect.height &&
            newRectY + this.selectedRectangle.height > rect.y
          );
        }
        return false;
      });

      if (!isCollision) {
        // Update the position of the rectangle
        this.selectedRectangle.x = newRectX;
        this.selectedRectangle.y = newRectY;
      }

      // Update the previous mouse coordinates
      this.prevMouseX = event.offsetX;
      this.prevMouseY = event.offsetY;
      this.drawCanvas();
    } else if(this.isDraggingRectangle && this.selectedRectangle && this.selectedDoor){
      // dragging door and rectangle together

      const dx = event.offsetX - this.prevMouseX;
      const dy = event.offsetY - this.prevMouseY;

      // Calculate the new position of the rectangle
      const newRectX = this.selectedRectangle.x + dx;
      const newRectY = this.selectedRectangle.y + dy;

      const newDoorX = this.selectedDoor.x + dx;
      const newDoorY = this.selectedDoor.y + dy;

      // Check for collisions with other rectangles
      const isCollision = this.rectangles.some(rect => {
        if (rect !== this.selectedRectangle) {
          return (
            newRectX < rect.x + rect.width &&
            newRectX + this.selectedRectangle.width > rect.x &&
            newRectY < rect.y + rect.height &&
            newRectY + this.selectedRectangle.height > rect.y
          );
        }
        return false;
      });

      if (!isCollision) {
        // Update the position of the rectangle
        this.selectedRectangle.x = newRectX;
        this.selectedRectangle.y = newRectY;
        this.selectedDoor.x = newDoorX;
        this.selectedDoor.y = newDoorY;
      }

      // Update the previous mouse coordinates
      this.prevMouseX = event.offsetX;
      this.prevMouseY = event.offsetY;
      this.drawCanvas();
    } else if(this.isDraggingDoor){
      // drag door just on the lower side of the rectangle

      const newX = event.offsetX - this.prevMouseX;
      const newY = event.offsetY - this.prevMouseY;

      const maxX = this.selectedRectangle.x + this.selectedRectangle.width - this.selectedDoor.width;
      const maxY = this.selectedRectangle.y + this.selectedRectangle.height - this.selectedDoor.height;

      const minX = this.selectedRectangle.x;
      const minY = this.selectedRectangle.y;

      // Check if the new position is on the edges of the big rectangle
      const isOnLeftEdge = newX === minX && newY >= minY && newY <= maxY;
      const isOnRightEdge = newX === maxX && newY >= minY && newY <= maxY;
      const isOnTopEdge = newY === minY && newX >= minX && newX <= maxX;
      const isOnBottomEdge = newY === maxY && newX >= minX && newX <= maxX;


      if(newX < this.selectedRectangle.x || newX + this.selectedDoor.width > this.selectedRectangle.x + this.selectedRectangle.width ){

      } else {
        
        this.selectedDoor.x = newX;
      }
      if(newY < this.selectedRectangle.y || newY + this.selectedDoor.height > this.selectedRectangle.y + this.selectedRectangle.height){

      } else {
        this.selectedDoor.y = newY;
      }

      if(isOnLeftEdge){
        if(this.selectedDoor.width < this.selectedDoor.height){
          let temp = this.selectedDoor.width;
          this.selectedDoor.width = this.selectedDoor.height;
          this.selectedDoor.height = temp;
          this.selectedDoor.y += (this.selectedDoor.height - this.selectedDoor.width)
        }
      } else if(isOnRightEdge){
        if(this.selectedDoor.width < this.selectedDoor.height){
          let temp = this.selectedDoor.width;
          this.selectedDoor.width = this.selectedDoor.height;
          this.selectedDoor.height = temp;
          this.selectedDoor.x += (this.selectedDoor.height - this.selectedDoor.width)
        }
      } else if(isOnBottomEdge){
        if(this.selectedDoor.height < this.selectedDoor.width){
          let temp = this.selectedDoor.width;
          this.selectedDoor.width = this.selectedDoor.height;
          this.selectedDoor.height = temp;
          this.selectedDoor.y -= (this.selectedDoor.height - this.selectedDoor.width)
        }
      } else if(isOnTopEdge){
        if(this.selectedDoor.height < this.selectedDoor.width){
          let temp = this.selectedDoor.width;
          this.selectedDoor.width = this.selectedDoor.height;
          this.selectedDoor.height = temp;
          //this.selectedDoor.x -= (this.selectedDoor.height - this.selectedDoor.width)
        }
      }

      this.drawCanvas();
    }
  }

  onMouseUp(event: MouseEvent) {
    if(this.jsonData.length != 0){
      return;
    }
    if(this.isDraggingRectangle || this.isDraggingDoor){

      if(this.isDraggingDoor){
        const maxX = this.selectedRectangle.x + this.selectedRectangle.width - this.selectedDoor.width;
        const maxY = this.selectedRectangle.y + this.selectedRectangle.height - this.selectedDoor.height;
  
        const minX = this.selectedRectangle.x;
        const minY = this.selectedRectangle.y;
  
        // Check if the new position is on the edges of the big rectangle
        const isOnLeftEdge = this.selectedDoor.x === minX && this.selectedDoor.y >= minY && this.selectedDoor.y <= maxY;
        const isOnRightEdge = this.selectedDoor.x === maxX && this.selectedDoor.y >= minY && this.selectedDoor.y <= maxY;
        const isOnTopEdge = this.selectedDoor.y === minY && this.selectedDoor.x >= minX && this.selectedDoor.x <= maxX;
        const isOnBottomEdge = this.selectedDoor.y === maxY && this.selectedDoor.x >= minX && this.selectedDoor.x <= maxX;
        if(!isOnBottomEdge && !isOnLeftEdge && !isOnRightEdge && !isOnTopEdge){
          this.message = "Door must be glued to the side of the room";
          this.doorError = true;
        } else {
          this.doorError = false;
        }
      }

      this.isDraggingRectangle = false;
      this.isDraggingDoor = false;



    } else if(this.isDrawing){
      
      this.isDrawing = false;

      let x = event.offsetX - this.width / 2;
      let y = event.offsetY - this.height / 2;
      let width = this.width;
      let height = this.height;
      let color = 'white';
      const rect: Rectangle = { x, y, width, height, color };
      this.rectangles.push(rect);
      
      for (let i = 0; i < this.rectangles.length; i++) {
        const rect = this.rectangles[i];
  

        // Check intersection with other rectangles
        for (let j = i + 1; j < this.rectangles.length; j++) {
          const otherRect = this.rectangles[j];
          if (this.checkIntersection(rect, otherRect)) {
            // Handle intersection logic
            console.log('Rectangles intersect:');
            this.rectangles.pop();
            return;
          }
        }
      }

      this.drawRectangle(rect);
      //this.ctx.strokeRect(event.offsetX - this.width / 2, event.offsetY - this.height / 2, this.width, this.height);


    }
    
  }

  getRectangleAtPosition(x: number, y: number): Rectangle | null {
    for (const rect of this.rectangles) {
      if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
        return rect;
      }
    }
    return null;
  }

  getDoorAtPosition(x: number, y: number): Rectangle | null {
    for (const door of this.doors) {
      if (x >= door.x && x <= door.x + door.width && y >= door.y && y <= door.y + door.height) {
        return door;
      }
    }
    return null;
  }

  getDoorInsideRectangle(rect): Rectangle | null {
    for (const door of this.doors) {
      if (door.x >= rect.x &&
        door.y >= rect.y &&
        door.x + door.width <= rect.x + rect.width &&
        door.y + door.height <= rect.y + rect.height) {
        return door;
      }
    }
    return null;
  }

  drawCanvas() {
    this.clearCanvas();

    for (const rect of this.rectangles) {
      this.drawRectangle(rect);
    }
    for (const door of this.doors) {
      this.drawRectangle(door);
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawRectangle(rect: Rectangle) {
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = rect.color;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  addRectangle(x: number, y: number, width: number, height: number) {
    let color = 'white';
    const rect: Rectangle = { x, y, width, height, color };
    this.rectangles.push(rect);
    this.drawRectangle(rect);
  }

  clearCanvasButton() {
    this.jsonData = [];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.rectangles = [];
    this.doors = [];
  }

  addDoors(){
    for(const rect of this.rectangles){
      // Calculate the position and size of the square

      if(this.getDoorInsideRectangle(rect)){
        continue;
      }
      const width = rect.width / 10;
      const height = rect.height / 5;
      let x = rect.x + (rect.width / 2) - (width / 2);
      let y = rect.y + rect.height - height;
      let color = 'white';

      const door: Rectangle = {x, y, width, height, color};
      this.doors.push(door);

      // Draw the square
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, width, height);
    }

  }


  back(){
    this.router.navigate(["client"]);
  }

 


  
  submit(){
    if(this.rectangles.length != this.doors.length){
      this.message = "Every rooms must have a door";
      return;
    }
    if(this.rectangles.length == 0 && this.rooms != 0){
      this.message = "You need to present a drawing of the household";
      return;
    }
    if(this.rooms != 0 && this.rectangles.length != this.rooms){
      this.message = "Drawing must have the same number of rooms as specified";
      return;
    }

    if(this.objectType == ""){
      this.objectType = this.myPlace.type;
    }
    if(this.address == ""){
      this.address = this.myPlace.address;
    }
    if(this.rooms == 0){
      this.rooms = this.myPlace.roomNumber;
    }
    if(this.size == 0){
      this.size = this.myPlace.size;
    }
    if(this.rectangles.length == 0){
      this.rectangles = this.myPlace.rooms;
      this.doors = this.myPlace.doors;
    }

    this.userService.updateObject(this.myPlace.id, this.username, this.objectType, this.address, this.rooms, this.size, this.rectangles, this.doors).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })

  }



  checkIntersections(rectangle) {
    for (let i = 0; i < this.rectangles.length; i++) {
      if (rectangle.intersectsWithObject(this.rectangles[i])) {
        return true;
      }
    }
    return false;
  }


  onFileSelected(event){
    const file: File = event.target.files[0];

    if(file){const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent: string = e.target.result;
        this.jsonData = JSON.parse(fileContent);
        // Process the JSON data as needed
        this.rectangles = this.jsonData[0].rooms;
        this.doors = this.jsonData[0].doors;
        this.objectType = this.jsonData[0].type; 
        this.address = this.jsonData[0].address;
        this.rooms = this.jsonData[0].roomNumber;
        this.size = this.jsonData[0].size;
        this.drawCanvas();
      };
      reader.readAsText(file);
    }
  }
  

}




