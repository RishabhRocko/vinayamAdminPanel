import { Component , OnInit } from '@angular/core';
// import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'course-wrapper',
  templateUrl: './course.component.html'
})
export class CourseComponent {

  sideBarToggleVar:boolean = true;
  sideBarToggleEvent(event:any)
  {
    this.sideBarToggleVar = !this.sideBarToggleVar;
  }
}
