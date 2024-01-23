import { Component , OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';

@Component({
  selector: 'dash-wrapper',
  templateUrl: './dashboard.component.html',
})
export class DashWrapperComponent implements OnInit {
  landData:any;
  sendData:any;
  token:any;
  constructor(private DashboardService:DashboardService,private toastr: ToastrService){}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token};
    this.DashboardService.allAdminData(this.sendData).subscribe((res: any) => {
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
  }
}
