import { Component , OnInit } from '@angular/core';
// import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'fee-wrapper',
  templateUrl: './fee.component.html'
})
export class FeeComponent {

  sideBarToggleVar:boolean = true;
  sideBarToggleEvent(event:any)
  {
    this.sideBarToggleVar = !this.sideBarToggleVar;
  }
}
