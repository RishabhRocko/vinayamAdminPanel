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
  courseSearchBar:any;
  page:any = 1;
  sideBarToggleVar:boolean = true;
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

  sideBarToggleEvent(event:any)
  {
    this.sideBarToggleVar = !this.sideBarToggleVar;
  }
}
