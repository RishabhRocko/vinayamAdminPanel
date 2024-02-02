import { Component , OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';

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
  editAdminData: any;
  user: any;

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
  editAdminForm = new FormGroup({
    adminId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    userName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    emailId: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
    adminRole: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)] ),
    password: new FormControl( '',[Validators.required,Validators.pattern(/^[A-Za-z0-9][a-zA-Z0-9 .&,@$()?_#-\/\+[\]*]*$/)] ),
    confirmPassword: new FormControl( '',[Validators.required,Validators.pattern(/^[A-Za-z0-9][a-zA-Z0-9 .&,@$()?_#-\/\+[\]*]*$/)] ),
  });
  getDeleteData(id: any,encString: any)
  {
    this.deleteId = id;
    this.deleteEncString = encString;
  }


  getEditData(id: any,encString: any)
  {
    this.token = localStorage.getItem('token');
    if(id != null && encString != null && this.token != null)
    {
      this.sendData = {"token":this.token,"editId":id,"editEncString":encString};
      this.DashboardService.getEditAdminData(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
         this.editAdminData = response.data;
         this.editAdminForm.setValue({
          adminId: this.editAdminData.id,
          emailId: this.editAdminData.emailId,
          userName: this.editAdminData.adminName,
          adminRole: this.editAdminData.adminRole,
          password: null,
          confirmPassword: null
         });
        }else{
          this.toastr.error(response.message ? response.message : 'Error', 'Error', {
            positionClass: 'errorMessageClass'
         });
        }
      });
    }else{
      this.toastr.error('Empty Data Error!', 'Error', {
        positionClass: 'errorMessageClass'
     });
    }
  }

  onSubmitEditAdmin()
  {
    if(localStorage.getItem('token')){
      if(this.editAdminForm.value.password == this.editAdminForm.value.confirmPassword)
      {
        this.user = {token:localStorage.getItem('token'),editForm:this.editAdminForm.value};
        this.DashboardService.saveEditAdminData(this.user).subscribe((res: any) => {
          let response = decryptData(res);
          if(response.status == true)
          {
            this.toastr.success(response.message ? response.message : 'Success', 'Success', {
              positionClass: 'successMessageClass'
          });
          window.location.reload();
          }else{
            this.toastr.error(response.message ? response.message : 'Error', 'Error', {
              positionClass: 'errorMessageClass'
          });
          }
        });
      }else{
        this.toastr.error('Password And Confirm Password Must Be Same!', 'Error', {
          positionClass: 'errorMessageClass'
      });
      }
    }else{
      this.toastr.error('Unauthorized', 'Error', {
        positionClass: 'errorMessageClass'
    });
    }
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
