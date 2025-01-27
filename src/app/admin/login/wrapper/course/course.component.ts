import { Component , OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'course-wrapper',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {

  landData:any;
  sendData:any;
  token:any;
  user: any;
  deleteId:any;
  deleteEncString:any;
  editCourseData:any;
  courseImageBase64Data: any;
  courseImageFileSize: any;
  courseImageFileType: any;
  invalidCourseImage : number = 0;
  courseSearchBar:any;
  page:any = 1;
  sideBarToggleVar:boolean = true;
  booleanValue: boolean = false;
  constructor(private CourseService:CourseService,private toastr: ToastrService){}
    ngOnInit(): void {
      this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token};
    this.CourseService.allCourseData(this.sendData).subscribe((res: any) => {
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

    onSearchKeyUp(event: KeyboardEvent) {
      this.token = localStorage.getItem('token');
      this.sendData = {"token":this.token,"searchVal":this.courseSearchBar};
      this.CourseService.courseSearch(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.landData = response.data;
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
        this.courseImageBase64Data = reader.result as string;
        this.courseImageFileSize = file.size,
        this.courseImageFileType = file.type.split("/")
        if((this.courseImageFileType[0] != 'image') || (this.courseImageFileSize > 204800))
        {
          this.invalidCourseImage = 1;
        }else{
          this.invalidCourseImage = 0;
        }

      };
      reader.readAsDataURL(file);
    }
    editCourseForm = new FormGroup({
      courseId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
      courseName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      courseImage: new FormControl( ''),
      courseDescription: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][A-Za-z0-9 _.,!"'-]*$/)]),
      courseDuration: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
      courseLevel: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      courseInstructor: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)] ),
      coursePrice: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      courseCategory: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      courseStartDate: new FormControl('',[Validators.required]),
      courseEndDate: new FormControl('',[Validators.required]),
    });
    addCourseForm = new FormGroup({
      courseName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      courseImage: new FormControl( '',[Validators.required]),
      courseDescription: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][A-Za-z0-9 _.,!"'-]*$/)]),
      courseDuration: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
      courseLevel: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      courseInstructor: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)] ),
      coursePrice: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      courseCategory: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
      courseStartDate: new FormControl('',[Validators.required]),
      courseEndDate: new FormControl('',[Validators.required]),
    });

  onSubmitAddCourse()
  {
    if(localStorage.getItem('token')){
      this.user = {token:localStorage.getItem('token'),courseImage: this.courseImageBase64Data,addForm:this.addCourseForm.value};
      this.CourseService.saveAddCourseData(this.user).subscribe((res: any) => {
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
  getEditData(id: any,encString: any)
  {
    this.token = localStorage.getItem('token');
    if(id != null && encString != null && this.token != null)
    {
      this.sendData = {"token":this.token,"editId":id,"editEncString":encString};
      this.CourseService.getEditCourseData(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.editCourseData = response.data;
          this.editCourseForm.setValue({
            courseId:this.editCourseData.id,
            courseName:this.editCourseData.courseName,
            courseImage:null,
            courseDescription:this.editCourseData.courseDescription,
            courseDuration:this.editCourseData.courseDuration,
            courseLevel:this.editCourseData.courseLevel,
            courseInstructor:this.editCourseData.courseInstructor,
            coursePrice:this.editCourseData.coursePrice,
            courseCategory:this.editCourseData.courseCategory,
            courseStartDate:this.editCourseData.courseStartDate,
            courseEndDate:this.editCourseData.courseEndDate,
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


  onSubmitEditCourse()
  {
    if(localStorage.getItem('token')){
      this.user = {token:localStorage.getItem('token'),courseImage: this.courseImageBase64Data,editForm:this.editCourseForm.value};
      this.CourseService.saveEditCourseData(this.user).subscribe((res: any) => {
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

  deleteCourse(isValid:any)
  {
    if(isValid && this.deleteEncString != localStorage.getItem('token'))
    {
      this.sendData = {"token":this.token,"deleteId":this.deleteId,"deleteEncString":this.deleteEncString};
      this.CourseService.deleteCourseData(this.sendData).subscribe((res: any) => {
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
