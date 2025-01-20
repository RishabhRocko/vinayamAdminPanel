import { Component , OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { FeeService } from './fee.service';
@Component({
  selector: 'fee-wrapper',
  templateUrl: './fee.component.html'
})
export class FeeComponent {

  landData:any;
  sendData:any;
  token:any;
  deleteId:any;
  deleteEncString:any;
  editFeesData:any;
  user:any;
  feesSearchBar: any;
  page:number = 1;
  sideBarToggleVar:boolean = true;
  courseData: any;
  studentData: any;
  booleanValue: boolean = false;
  constructor(private FeeService:FeeService,private toastr: ToastrService){}

    ngOnInit(): void {
      this.token = localStorage.getItem('token');
      this.sendData = {"token":this.token};
      this.FeeService.allStudentsFees(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.landData = response.data;
          this.courseData = response.courseData;
          this.studentData = response.studentData;
        }else{
          this.courseData = response.courseData;
          this.studentData = response.studentData;
          this.toastr.error(response.message ? response.message : 'Error', 'Error', {
            positionClass: 'errorMessageClass'
         });
        }
      });
    }
    editFeesForm = new FormGroup({
      feesId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
      studentName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      courseName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      feeAmount: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      lastMonthDue: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    });

    addFeesForm = new FormGroup({
      studentName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      courseName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      feeAmount: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      lastMonthDue: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    });
    getEditData(id: any,encString: any)
    {
      this.token = localStorage.getItem('token');
      if(id != null && encString != null && this.token != null)
      {
        this.sendData = {"token":this.token,"editId":id,"editEncString":encString};
        this.FeeService.getEditFeesData(this.sendData).subscribe((res: any) => {
          let response = decryptData(res);
          if(response.status == true)
          {
            this.editFeesData = response.data;
            this.editFeesForm.setValue({
              feesId: this.editFeesData.id,
              studentName: this.editFeesData.studentName,
              courseName: this.editFeesData.courseName,
              feeAmount: this.editFeesData.feeAmount,
              lastMonthDue: this.editFeesData.lastMonthDue,
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

    onSubmitEditFees()
    {
      if(localStorage.getItem('token')){
        this.user = {token:localStorage.getItem('token'),editForm:this.editFeesForm.value};
        this.FeeService.saveEditFeesData(this.user).subscribe((res: any) => {
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
        this.toastr.error('Unauthorized', 'Error', {
          positionClass: 'errorMessageClass'
      });
      }
    }

    onSubmitAddFees()
    {
      if(localStorage.getItem('token')){
        this.user = {token:localStorage.getItem('token'),addForm:this.addFeesForm.value};
        this.FeeService.saveAddFeesData(this.user).subscribe((res: any) => {
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
        this.toastr.error('Unauthorized', 'Error', {
          positionClass: 'errorMessageClass'
      });
      }
    }

    getDeleteData(id: any,encString: any)
    {
      this.deleteId = id;
      this.deleteEncString = encString;
    }

    deleteFees(isValid:any)
    {
      if(isValid && this.deleteEncString != localStorage.getItem('token'))
      {
        this.sendData = {"token":this.token,"deleteId":this.deleteId,"deleteEncString":this.deleteEncString};
        this.FeeService.deleteFeesData(this.sendData).subscribe((res: any) => {
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
        this.toastr.error('Can`t Delete Fees!', 'Error', {
          positionClass: 'errorMessageClass'
       });
      }
    }

    onSearchKeyUp(event: KeyboardEvent) {
      this.token = localStorage.getItem('token');
      this.sendData = {"token":this.token,"searchVal":this.feesSearchBar};
      this.FeeService.feesSearch(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.landData = response.data;
        }
      });
    }

    sort(colName: string | number,boolean: boolean) {
      if (boolean == true){
        this.landData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0);
        this.booleanValue = !this.booleanValue;
      }else{
        this.landData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0);
        this.booleanValue = !this.booleanValue;
      }
  }

    sideBarToggleEvent(event:any)
    {
      this.sideBarToggleVar = !this.sideBarToggleVar;
    }
}
