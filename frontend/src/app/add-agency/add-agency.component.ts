import { Component, OnInit } from '@angular/core';
import { UserService } from '../servers/user.service';
import { Router } from '@angular/router';
import { AdminService } from '../servers/admin.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.message = "";
    this.username = "";
    this.password = "";
    this.phone = "";
    this.email = "";


    this.agencyName = "";
    this.country = "";
    this.town = "";
    this.street = "";
    this.streetNumber = "";
    this.number = 0;
    this.description = "";

    this.userService.getAllClients().subscribe((clients: string[]) => {
      clients.forEach(name => {
        this.allUserNames.push(name['username']);
      })
    })
    this.userService.getAllAgencies().subscribe((agencies: string[]) => {
      agencies.forEach(name => {
        this.allUserNames.push(name['username']);
        this.allIdNumbers.push(name['idNumber']);
      })
    })
    this.userService.getAllAdmins().subscribe((admins: string[]) => {
      admins.forEach(name => {
        this.allUserNames.push(name['username']);
      })
    })
  }


  message: string = "";

  username: string = "";
  password: string = "";
  phone: string = "";
  email: string = "";


  agencyName: string = "";
  country: string = "";
  town: string = "";
  street: string = "";
  streetNumber: string = "";
  number: number = 0;
  description: string = "";

  selectedImage: any;

  allUserNames: string[] = [];
  allIdNumbers: number[] = [];

  invalidImage: number = 0;

  submit() {
    if (this.allUserNames.includes(this.username)) {
      this.message = "Username is not unique";
      return;
    }
    if (this.allIdNumbers.includes(this.number)) {
      this.message = "ID number is not unique";
      return;
    }

    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage, this.username + '.jpg');

      this.userService.fileUpload(formData).subscribe(response => {
        console.log(response['message']);
        let address = this.country + ", " + this.town + " " + this.street + " " + this.streetNumber;
        this.adminService.addAgency(this.username, this.password, this.phone, this.email, this.agencyName, address, this.number, this.description, 1).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })
    } else {
      let address = this.country + ", " + this.town + " " + this.street + " " + this.streetNumber;
      this.adminService.addAgency(this.username, this.password, this.phone, this.email, this.agencyName, address, this.number, this.description, 0).subscribe(resp => {
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

  back() {
    this.router.navigate(["admin"]);
  }

  closeMessage() {
    this.message = "";
  }

}
