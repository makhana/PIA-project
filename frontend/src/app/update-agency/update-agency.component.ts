import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-update-agency',
  templateUrl: './update-agency.component.html',
  styleUrls: ['./update-agency.component.css']
})
export class UpdateAgencyComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  agency: Agency;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;


  message: string;

  selectedImage: any;
  invalidImage: number = 0;



  ngOnInit(): void {
    this.message = "";
    this.name = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.description = "";


    this.agency = JSON.parse(localStorage.getItem('updateAgencyAdmin'));

  }

  back() {
    this.router.navigate(["admin"]);
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
      formData.append('file', this.selectedImage, this.agency.username + '.jpg');

      this.userService.fileUpload(formData).subscribe(response => {
        console.log(response['message']);
        this.userService.updateAgencyProfile(this.agency.username, this.name, this.email, this.phone, this.address, this.description, this.agency.username + ".jpg").subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })
    } else {
      this.userService.updateAgencyProfile(this.agency.username, this.name, this.email, this.phone, this.address, this.description, "").subscribe(resp => {
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

  closeMessage(){
    this.message = "";
  }
}
