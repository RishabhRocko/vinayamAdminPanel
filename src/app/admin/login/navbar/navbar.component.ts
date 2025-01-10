import { Component , OnInit } from '@angular/core';
import { NavServiceService } from './nav-service.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  adminRole = localStorage.getItem('role');
  token: any;
  sendData:any;
  landData:any;
  currentNotiData:any;
  notiSearchBar:any;
  currentNotiCount:any;
  allNotiData:any;
  page:any;
  seperateNotification: any;
  booleanValue: boolean = false;
  constructor(private NavServiceService:NavServiceService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token};
    this.NavServiceService.navAdminData(this.sendData).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.landData = response.data;
      }else{
        this.toastr.error(response.message ? response.message : 'Error', 'Error', {
          positionClass: 'errorMessageClass'
       });
      }
    });
    this.NavServiceService.getNotification(this.sendData).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.currentNotiData = response.data.getCurrentNotification;
        this.allNotiData = response.data.getAllNotification;
        this.currentNotiCount = this.currentNotiData.length;
      }else{
        this.toastr.error(response.message ? response.message : 'Error', 'Error', {
          positionClass: 'errorMessageClass'
       });
      }
    });
  }
  sort(colName: string | number,boolean: boolean) {
    if (boolean == true){
      this.allNotiData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0);
      this.booleanValue = !this.booleanValue;
    }else{
      this.allNotiData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0);
      this.booleanValue = !this.booleanValue;
    }
}

  onSearchKeyUp(event: KeyboardEvent) {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token,"searchVal":this.notiSearchBar};
    this.NavServiceService.notiSearch(this.sendData).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.allNotiData = response.data;
      }
    });
  }

  viewNotification(data:any)
  {
    this.seperateNotification = data;
  }
}
