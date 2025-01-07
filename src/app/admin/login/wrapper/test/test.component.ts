import { Component , OnInit } from '@angular/core';
// import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'test-wrapper',
  templateUrl: './test.component.html'
})
export class TestComponent {

  sideBarToggleVar:boolean = true;
  sideBarToggleEvent(event:any)
  {
    this.sideBarToggleVar = !this.sideBarToggleVar;
  }
}
