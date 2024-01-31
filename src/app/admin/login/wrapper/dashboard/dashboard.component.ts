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
  deleteId:any;
  deleteEncString:any;

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

  getDeleteData(id: any,encString: any)
  {
    this.deleteId = id;
    this.deleteEncString = encString;
  }

  deleteAdmin(isValid:any)
  {
    if(isValid && this.deleteEncString != localStorage.getItem('token'))
    {
      this.sendData = {"token":this.token,"deleteId":this.deleteId,"deleteEncString":this.deleteEncString};
      this.DashboardService.deleteAdminData(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.toastr.success(response.message ? response.message : 'Success', 'Success', {
            positionClass: 'successMessageClass'
         });
         this.ngOnInit();
        }else{
          this.toastr.error(response.message ? response.message : 'Error', 'Error', {
            positionClass: 'errorMessageClass'
         });
        }
      });
    }else{
      this.toastr.error('Can`t Delete Admin You Are Logged In From!', 'Error', {
        positionClass: 'errorMessageClass'
     });
    }
  }

}
