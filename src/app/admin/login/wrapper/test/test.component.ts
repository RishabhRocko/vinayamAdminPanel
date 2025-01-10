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
  booleanValue: boolean = false;

//   sort(colName: string | number,boolean: boolean) {
//     if (boolean == true){
//       this.landData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0);
//       this.booleanValue = !this.booleanValue;
//     }else{
//       this.landData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0);
//       this.booleanValue = !this.booleanValue;
//     }
// }

  sideBarToggleEvent(event:any)
  {
    this.sideBarToggleVar = !this.sideBarToggleVar;
  }
}
