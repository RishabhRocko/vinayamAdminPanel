import { Component , OnInit} from '@angular/core';
import { ElementRef } from '@angular/core';
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
  vinayamInfoData: any;
  whyVinayamInfo: any;
  vinayamHomeInfo: any;
  messageSent:number = 0;
  sentMessage:any;
  page:any = 1;
  isStudentLogin:boolean = false;
  menuTriggerVar:boolean = false;
  courseData: any;
  courseDetails: any;
  loginTestData: any;
  loginScoreData: any;
  testData: any;
  testDetails: any;
  viewPdfUrl: any;
  constructor(private WebService:WebService,private router: Router,private toastr: ToastrService,private elementRef: ElementRef<HTMLElement>){}
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
        this.vinayamInfoData = response?.data.vinayamInfo;
        this.whyVinayamInfo = this.vinayamInfoData[0].whyVinayamInfo;
        this.vinayamHomeInfo = this.vinayamInfoData[0].vinayamHomeInfo;
        this.branch1 = this.addressData[0].coordinate;
        this.branch2 = this.addressData[1].coordinate;

        for (let i = 0; i < response?.imageData.length; i++) {
          const element = document.getElementById(response?.imageData[i].imageTagName);
          if(response?.imageData[i].isBgImage == 1){
            element?.style.setProperty('background-image', 'url('+response?.imageData[i].imageUrl+')');
          }else{
            element?.setAttribute('src',response?.imageData[i].imageUrl);
          }
        }
        for (let i = 0; i < response?.videoData.length; i++) {
          const element = document.getElementById(response?.videoData[i].videoTagName);
          element?.setAttribute('src',response?.videoData[i].videoUrl);
        }
        this.courseData = response?.courseData;
        this.testData = response?.testData;
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
  studentLoginForm = new FormGroup({
    studentName:  new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]),
    studentDob: new FormControl( '',[Validators.required] ),
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
  onsubmitStudentLogin(){
    this.user = {loginForm:this.studentLoginForm.value};
        this.WebService.studentLogin(this.user).subscribe((res: any) => {
          let response = decryptData(res);
          if(response.status == true)
          {
            this.isStudentLogin = true;
            this.loginTestData = response.testData;
            this.loginScoreData = response.scoreData;
            for (let i = 0; i < this.loginTestData?.length; i++) {
              this.loginTestData[i].scoreData = this.loginScoreData[i];
            }
            this.studentLoginForm.reset();
            this.toastr.success(response.message ? response.message : 'Success', 'Success', {
              positionClass: 'successMessageClass'
          });
          }else{
            this.isStudentLogin = true;
            this.loginTestData = [];
            this.toastr.error(response.message ? response.message : 'Error', 'Error', {
              positionClass: 'errorMessageClass'
          });
          }
        });
  }
  viewPdf(base64:any){
    this.viewPdfUrl = base64;
  }
  getCourseDetails(item:any){
    this.courseDetails = item;
  }
  getTestDetails(item:any){
    this.testDetails = item;
  }
  onAdmin()
  {
    this.router.navigate(['/admin']);
  }
  sentMessageAgain(){
    this.messageSent = 0;
  }
  menuTrigger(event:any)
  {
    this.menuTriggerVar = !this.menuTriggerVar;
  }
}
