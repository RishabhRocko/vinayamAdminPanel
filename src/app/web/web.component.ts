import { Component , OnInit} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
})
export class WebComponent implements OnInit{
  user: any;
  sendData: any;
  addressData: any;
  contactData: any;
  webData: any;
  emailData: any;
  socialData: any;
  branch1: any;
  branch2: any;
  constructor(private WebService:WebService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
    localStorage.removeItem("token");
    this.sendData = {"type":"webInfo"};
    this.WebService.webInfo(this.sendData).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.addressData = response?.data.address;
        this.contactData = response?.data.contact;
        this.emailData = response?.data.email;
        this.socialData = response?.data.social;
        this.webData = response?.data.website;
        this.branch1 = this.addressData[0].coordinate;
        this.branch2 = this.addressData[1].coordinate;
      }
    });
  }
  onAdmin()
  {
    this.router.navigate(['/admin']);
  }
}
