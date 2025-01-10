import { Component , OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'user-wrapper',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  landData:any;
  sendData:any;
  token:any;
  deleteId:any;
  deleteEncString:any;
  editStudentData:any;
  studentImageBase64Data: any;
  studentImageFileSize: any;
  studentImageFileType: any;
  invalidStudentImage : number = 0;
  user:any;
  studentSearchBar: any;
  page:any = 1;
  sideBarToggleVar:boolean = true;
  booleanValue: boolean = false;
  constructor(private UsersService:UsersService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token};
    this.UsersService.allAdminStudents(this.sendData).subscribe((res: any) => {
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

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.encodeFileBase64(file);
    }
  }

  encodeFileBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.studentImageBase64Data = reader.result as string;
      this.studentImageFileSize = file.size,
      this.studentImageFileType = file.type.split("/")
      if((this.studentImageFileType[0] != 'image') || (this.studentImageFileSize > 204800))
      {
        this.invalidStudentImage = 1;
      }else{
        this.invalidStudentImage = 0;
      }

    };
    reader.readAsDataURL(file);
  }

  editStudentForm = new FormGroup({
    studentId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    studentFirstName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    studentImage: new FormControl( ''),
    studentLastName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    guardianFirstName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    guardianLastName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    phone: new FormControl( '',[Validators.required,Validators.pattern(/^[56789][0-9]{9,11}$/)] ),
    class: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    dob: new FormControl('',[Validators.required]),
    email: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
  });

  addStudentForm = new FormGroup({
    studentFirstName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    studentImage: new FormControl( '',[Validators.required]),
    studentLastName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    guardianFirstName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    guardianLastName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    phone: new FormControl( '',[Validators.required,Validators.pattern(/^[56789][0-9]{9,11}$/)] ),
    class: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    dob: new FormControl('',[Validators.required]),
    email: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
  });
  getEditData(id: any,encString: any)
  {
    this.token = localStorage.getItem('token');
    if(id != null && encString != null && this.token != null)
    {
      this.sendData = {"token":this.token,"editId":id,"editEncString":encString};
      this.UsersService.getEditStudentData(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.editStudentData = response.data;
          this.editStudentForm.setValue({
            studentId: this.editStudentData.id,
            studentFirstName: this.editStudentData.studentFirstName,
            studentImage:null,
            studentLastName: this.editStudentData.studentLastName,
            guardianFirstName: this.editStudentData.guardianFirstName,
            guardianLastName: this.editStudentData.guardianLastName,
            phone: this.editStudentData.phone,
            class: this.editStudentData.class,
            dob: this.editStudentData.dob,
            email: this.editStudentData.email,
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

  onSubmitEditStudent()
  {
    if(localStorage.getItem('token')){
      this.user = {token:localStorage.getItem('token'),studentImage: this.studentImageBase64Data,editForm:this.editStudentForm.value};
      this.UsersService.saveEditStudentData(this.user).subscribe((res: any) => {
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

  onSubmitAddStudent()
  {
    if(localStorage.getItem('token')){
      this.user = {token:localStorage.getItem('token'),studentImage: this.studentImageBase64Data,addForm:this.addStudentForm.value};
      this.UsersService.saveAddStudentData(this.user).subscribe((res: any) => {
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

  deleteStudent(isValid:any)
  {
    if(isValid && this.deleteEncString != localStorage.getItem('token'))
    {
      this.sendData = {"token":this.token,"deleteId":this.deleteId,"deleteEncString":this.deleteEncString};
      this.UsersService.deleteStudentData(this.sendData).subscribe((res: any) => {
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
      this.toastr.error('Can`t Delete Student!', 'Error', {
        positionClass: 'errorMessageClass'
     });
    }
  }

  onSearchKeyUp(event: KeyboardEvent) {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token,"searchVal":this.studentSearchBar};
    this.UsersService.studentSearch(this.sendData).subscribe((res: any) => {
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
