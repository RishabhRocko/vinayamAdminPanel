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
  messageSent:number = 0;
  sentMessage:any;
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
  sendMessageForm = new FormGroup({
    name:  new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]),
    phone: new FormControl( '',[Validators.required,Validators.pattern(/^[98765][0-9]{9}$/)] ),
    class:  new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9 ]*$/)]),
    subject:  new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9 ]*$/)]),
    email: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
    message: new FormControl( '',[Validators.required,Validators.pattern(/^[A-Za-z0-9][a-zA-Z0-9 .&,@$()?_#-\/\+[\]*]*$/)] ),
  });

  onSubmitMessageForm(){
    this.user = {type:"add",addForm:this.sendMessageForm.value};
        this.WebService.saveNotification(this.user).subscribe((res: any) => {
          let response = decryptData(res);
          if(response.status == true)
          {
            this.messageSent = 1;
            this.sentMessage = response.message;
            this.sendMessageForm.reset();
            this.toastr.success(response.message ? response.message : 'Success', 'Success', {
              positionClass: 'successMessageClass'
          });
          }else{
            this.toastr.error(response.message ? response.message : 'Error', 'Error', {
              positionClass: 'errorMessageClass'
          });
          }
        });
  }
  onAdmin()
  {
    this.router.navigate(['/admin']);
  }
  sentMessageAgain(){
    this.messageSent = 0;
  }
}
